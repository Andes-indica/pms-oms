import { prisma } from "@pms-oms/db";
import { createAuditLog } from "./audit.service";
import { mockBroker } from "../brokers/broker-registry";
import type { BrokerOrderStatus } from "@pms-oms/broker";

export async function syncOrderService(
  orderId: string,
  firmId: string,
) {
  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
      portfolio: { client: { firmId } },
    },
  });

  if (!order) {
    throw new Error("ORDER_NOT_FOUND");
  }

  if (!order.brokerOrderId) {
    throw new Error("ORDER_NOT_SUBMITTED");
  }

  if (["FILLED", "CANCELLED", "REJECTED"].includes(order.status)) {
    return order;
  }
  if(!mockBroker.hasOrder(order.brokerOrderId,)){
    mockBroker.restoreOrder(order.brokerOrderId,
      {
        clientOrderId:order.id,
        symbol:order.symbol,
        exchange:order.exchange,
        side:order.side,
        orderType:order.orderType,
        quantity:order.quantity,
        limitPrice:order.limitPrice?Number(order.limitPrice,):undefined,
      },
      order.status as BrokerOrderStatus,
    );
  }
  const brokerUpdate = await mockBroker.getOrderStatus(order.brokerOrderId);

  return prisma.$transaction(async (tx) => {
    await tx.$queryRaw`
      SELECT "id" FROM "Portfolio"
      WHERE "id" = ${order.portfolioId}
      FOR UPDATE
    `;
    await tx.$queryRaw`
      SELECT "id" FROM "Order"
      WHERE "id" = ${order.id}
      FOR UPDATE
    `;

    const freshOrder = await tx.order.findFirst({
      where: {
        id: order.id,
        portfolio: { client: { firmId } },
      },
    });

    if (!freshOrder) {
      throw new Error("ORDER_NOT_FOUND");
    }

    if (["FILLED", "CANCELLED", "REJECTED"].includes(freshOrder.status)) {
      return freshOrder;
    }

    const cumulativeFillQuantity = brokerUpdate.filledQuantity;

    if (
      !Number.isInteger(cumulativeFillQuantity) ||
      cumulativeFillQuantity < freshOrder.filledQuantity ||
      cumulativeFillQuantity > freshOrder.quantity
    ) {
      throw new Error("INVALID_FILL_QUANTITY");
    }

    const incrementalFillQuantity =
      cumulativeFillQuantity - freshOrder.filledQuantity;

    let incrementalFillPrice: number | null = null;
    let sellCostBasis: number | null = null;

    if (incrementalFillQuantity > 0) {
      if (
        brokerUpdate.averageFillPrice === null ||
        !Number.isFinite(brokerUpdate.averageFillPrice) ||
        brokerUpdate.averageFillPrice <= 0
      ) {
        throw new Error("INVALID_FILL_PRICE");
      }

      const previousFillValue =
        freshOrder.filledQuantity *
        Number(freshOrder.averageFillPrice ?? 0);
      const cumulativeFillValue =
        cumulativeFillQuantity * brokerUpdate.averageFillPrice;

      incrementalFillPrice =
        (cumulativeFillValue - previousFillValue) /
        incrementalFillQuantity;

      const holding = await tx.holding.findUnique({
        where: {
          portfolioId_symbol_exchange: {
            portfolioId: freshOrder.portfolioId,
            symbol: freshOrder.symbol,
            exchange: freshOrder.exchange,
          },
        },
      });

      if (freshOrder.side === "BUY") {
        if (!holding) {
          await tx.holding.create({
            data: {
              portfolioId: freshOrder.portfolioId,
              symbol: freshOrder.symbol,
              exchange: freshOrder.exchange,
              quantity: incrementalFillQuantity,
              averagePrice: incrementalFillPrice,
            },
          });
        } else {
          const newQuantity = holding.quantity + incrementalFillQuantity;
          const newAveragePrice =
            (holding.quantity * Number(holding.averagePrice) +
              incrementalFillQuantity * incrementalFillPrice) /
            newQuantity;

          await tx.holding.update({
            where: { id: holding.id },
            data: {
              quantity: newQuantity,
              averagePrice: newAveragePrice,
            },
          });
        }

        await tx.portfolio.update({
          where: { id: freshOrder.portfolioId },
          data: {
            cashBalance: {
              decrement: incrementalFillQuantity * incrementalFillPrice,
            },
          },
        });
      } else {
        if (!holding || holding.quantity < incrementalFillQuantity) {
          throw new Error("INSUFFICIENT_HOLDINGS");
        }

        sellCostBasis = Number(holding.averagePrice);

        const remainingQuantity =
          holding.quantity - incrementalFillQuantity;

        if (remainingQuantity === 0) {
          await tx.holding.delete({ where: { id: holding.id } });
        } else {
          await tx.holding.update({
            where: { id: holding.id },
            data: { quantity: remainingQuantity },
          });
        }

        await tx.portfolio.update({
          where: { id: freshOrder.portfolioId },
          data: {
            cashBalance: {
              increment: incrementalFillQuantity * incrementalFillPrice,
            },
          },
        });
      }
    }

    const terminal = ["FILLED", "CANCELLED", "REJECTED"].includes(
      brokerUpdate.status,
    );
    const remainingQuantity = freshOrder.quantity - cumulativeFillQuantity;
    const estimatedPrice = Number(
      freshOrder.estimatedPrice ?? brokerUpdate.averageFillPrice ?? 0,
    );

    let realizedPnl: number | null =
      freshOrder.realizedPnl === null
        ? null
        : Number(freshOrder.realizedPnl);

    if (
      freshOrder.side === "SELL" &&
      incrementalFillQuantity > 0 &&
      incrementalFillPrice !== null
    ) {
      realizedPnl =
        Number(freshOrder.realizedPnl ?? 0) +
        (incrementalFillPrice - (sellCostBasis ?? incrementalFillPrice)) *
          incrementalFillQuantity;
    }

    const updatedOrder = await tx.order.update({
      where: { id: freshOrder.id },
      data: {
        status: brokerUpdate.status,
        filledQuantity: cumulativeFillQuantity,
        averageFillPrice: brokerUpdate.averageFillPrice,
        realizedPnl,
        filledAt:
          brokerUpdate.status === "FILLED"
            ? freshOrder.filledAt ?? new Date()
            : freshOrder.filledAt,
        reservedCash:
          !terminal && freshOrder.side === "BUY"
            ? remainingQuantity * estimatedPrice
            : 0,
        reservedQuantity:
          !terminal && freshOrder.side === "SELL"
            ? remainingQuantity
            : 0,
      },
    });

    const action =
      updatedOrder.status === "FILLED"
        ? "ORDER_FILLED"
        : updatedOrder.status === "REJECTED"
          ? "ORDER_REJECTED"
          : updatedOrder.status === "CANCELLED"
            ? "ORDER_CANCELLED"
          : "ORDER_SYNCED";

    await createAuditLog({
      firmId,
      action,
      entityType: "ORDER",
      entityId: updatedOrder.id,
      message: "Order synchronized with broker",
      metadata: {
        status: updatedOrder.status,
        filledQuantity: updatedOrder.filledQuantity,
        averageFillPrice: updatedOrder.averageFillPrice?.toString(),
        realizedPnl: updatedOrder.realizedPnl?.toString(),
      },
    }, tx);

    return updatedOrder;
  });
}
