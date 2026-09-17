import { prisma } from "@pms-oms/db";
import { createAuditLog } from "./audit.service";
import { mockBroker } from "../brokers/broker-registry";
import { runPreTradeChecks } from "./pre-trade.service";
import { runRiskChecks } from "./risk.service";

export async function executeOrderService(
  orderId: string,
  firmId: string,
) {
  const existingOrder = await prisma.order.findFirst({
    where: {
      id: orderId,
      portfolio: { client: { firmId } },
    },
  });

  if (!existingOrder) {
    throw new Error("ORDER_NOT_FOUND");
  }

  if (existingOrder.brokerOrderId) {
    return existingOrder;
  }

  if (
    existingOrder.status !== "PENDING" &&
    existingOrder.status !== "SUBMITTED"
  ) {
    throw new Error("ORDER_NOT_PENDING");
  }

  const estimatedPrice =
    existingOrder.orderType === "LIMIT" &&
    existingOrder.limitPrice !== null
      ? Number(existingOrder.limitPrice)
      : await mockBroker.getEstimatedPrice(
          existingOrder.symbol,
          existingOrder.exchange,
        );

  let claimedOrder: typeof existingOrder;

  try {
    if (!Number.isFinite(estimatedPrice) || estimatedPrice <= 0) {
      throw new Error("INVALID_ESTIMATED_PRICE");
    }

    claimedOrder = await prisma.$transaction(async (tx) => {
      // Serialize reservation changes for this portfolio.
      await tx.$queryRaw`
        SELECT "id" FROM "Portfolio"
        WHERE "id" = ${existingOrder.portfolioId}
        FOR UPDATE
      `;

      const currentOrder = await tx.order.findFirst({
        where: {
          id: orderId,
          portfolio: { client: { firmId } },
        },
      });

      if (!currentOrder) {
        throw new Error("ORDER_NOT_FOUND");
      }

      if (currentOrder.brokerOrderId) {
        return currentOrder;
      }

      // Resume an interrupted submission with the same broker idempotency key.
      if (currentOrder.status === "SUBMITTED") {
        return currentOrder;
      }

      if (currentOrder.status !== "PENDING") {
        throw new Error("ORDER_NOT_PENDING");
      }

      const checkedOrder = await runPreTradeChecks(orderId, firmId, tx);

      await runRiskChecks({
        currentOrderId: checkedOrder.id,
        portfolioId: checkedOrder.portfolioId,
        symbol: checkedOrder.symbol,
        exchange: checkedOrder.exchange,
        side: checkedOrder.side,
        quantity: checkedOrder.quantity,
        estimatedPrice,
      }, tx);

      return tx.order.update({
        where: { id: checkedOrder.id },
        data: {
          status: "SUBMITTED",
          estimatedPrice,
          reservedCash:
            checkedOrder.side === "BUY"
              ? checkedOrder.quantity * estimatedPrice
              : 0,
          reservedQuantity:
            checkedOrder.side === "SELL"
              ? checkedOrder.quantity
              : 0,
        },
      });
    });
  } catch (error) {
    const rejectionReasons = new Set([
      "INVALID_QUANTITY",
      "INSUFFICIENT_HOLDINGS",
      "INSUFFICIENT_CASH",
      "RESTRICTED_SECURITY",
      "MAX_ORDER_QUANTITY_EXCEEDED",
      "MAX_ORDER_VALUE_EXCEEDED",
      "MAX_POSITION_QUANTITY_EXCEEDED",
      "MAX_POSITION_VALUE_EXCEEDED",
      "INVALID_ESTIMATED_PRICE",
    ]);

    if (error instanceof Error && rejectionReasons.has(error.message)) {
      await prisma.$transaction(async (tx) => {
        const rejected = await tx.order.updateMany({
          where: {
            id: orderId,
            status: "PENDING",
            portfolio: { client: { firmId } },
          },
          data: {
            status: "REJECTED",
            reservedCash: 0,
            reservedQuantity: 0,
          },
        });

        if (rejected.count > 0) {
          await createAuditLog({
            firmId,
            action: "ORDER_REJECTED",
            entityType: "ORDER",
            entityId: orderId,
            message: "Order rejected by pre-trade checks",
            metadata: {
              reason: error.message,
            },
          }, tx);
        }
      });
    }

    throw error;
  }

  if (claimedOrder.brokerOrderId) {
    return claimedOrder;
  }

  const brokerResult = await mockBroker.placeOrder({
    clientOrderId: claimedOrder.id,
    symbol: claimedOrder.symbol,
    exchange: claimedOrder.exchange,
    side: claimedOrder.side,
    orderType: claimedOrder.orderType,
    quantity: claimedOrder.quantity,
    limitPrice:
      claimedOrder.limitPrice !== null
        ? Number(claimedOrder.limitPrice)
        : null,
  });

  return prisma.$transaction(async (tx) => {
    await tx.$queryRaw`
      SELECT "id" FROM "Order"
      WHERE "id" = ${claimedOrder.id}
      FOR UPDATE
    `;

    const currentOrder = await tx.order.findFirst({
      where: {
        id: claimedOrder.id,
        portfolio: { client: { firmId } },
      },
    });

    if (!currentOrder) {
      throw new Error("ORDER_NOT_FOUND");
    }

    if (currentOrder.brokerOrderId) {
      return currentOrder;
    }

    const updatedOrder = await tx.order.update({
      where: { id: currentOrder.id },
      data: {
        brokerOrderId: brokerResult.brokerOrderId,
        status: brokerResult.status,
      },
    });

    await createAuditLog({
      firmId,
      action: "ORDER_SUBMITTED",
      entityType: "ORDER",
      entityId: updatedOrder.id,
      message: "Order submitted to broker",
      metadata: {
        brokerOrderId: brokerResult.brokerOrderId,
        status: brokerResult.status,
      },
    }, tx);

    return updatedOrder;
  });
}
