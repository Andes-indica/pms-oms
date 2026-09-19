import { prisma } from "@pms-oms/db";
import { createAuditLog } from "./audit.service";
import { mockBroker } from "../brokers/broker-registry";

export async function cancelOrderService(
  orderId: string,
  firmId: string,
) {
  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
      portfolio: {
        client: {
          firmId,
        },
      },
    },
  });

  if (!order) {
    throw new Error("ORDER_NOT_FOUND");
  }

  if (order.status === "FILLED") {
    throw new Error("ORDER_ALREADY_FILLED");
  }

  if (order.status === "CANCELLED") {
    throw new Error("ORDER_ALREADY_CANCELLED");
  }

  if (order.status === "REJECTED") {
    throw new Error("ORDER_ALREADY_REJECTED");
  }

  if (order.status !== "PENDING") {
    if (!order.brokerOrderId) {
      throw new Error("ORDER_SUBMISSION_IN_PROGRESS");
    }

    if (
      !mockBroker.hasOrder(
        order.brokerOrderId,
      )
    ) {
      mockBroker.restoreOrder(
        order.brokerOrderId,
        {
          clientOrderId:
            order.id,

          symbol:
            order.symbol,

          exchange:
            order.exchange,

          side:
            order.side,

          orderType:
            order.orderType,

          quantity:
            order.quantity,

          limitPrice:
            order.limitPrice
              ? Number(
                order.limitPrice,
              )
              : undefined,
        },

        order.status as Parameters<typeof mockBroker.restoreOrder>[2],
      );
    }
    try {
      await mockBroker.cancelOrder(order.brokerOrderId);
    } catch (error) {
      if (
        error instanceof Error &&
        error.message === "BROKER_ORDER_ALREADY_FILLED"
      ) {
        throw new Error("ORDER_ALREADY_FILLED");
      }

      throw error;
    }
  }

  return prisma.$transaction(async (tx) => {
    await tx.$queryRaw`
      SELECT "id" FROM "Order"
      WHERE "id" = ${order.id}
      FOR UPDATE
    `;

    const currentOrder = await tx.order.findFirst({
      where: {
        id: order.id,
        portfolio: { client: { firmId } },
      },
    });

    if (!currentOrder) {
      throw new Error("ORDER_NOT_FOUND");
    }

    if (currentOrder.status === "FILLED") {
      throw new Error("ORDER_ALREADY_FILLED");
    }

    if (currentOrder.status === "CANCELLED") {
      return currentOrder;
    }

    if (currentOrder.status === "REJECTED") {
      throw new Error("ORDER_ALREADY_REJECTED");
    }

    const updatedOrder = await tx.order.update({
      where: { id: currentOrder.id },
      data: {
        status: "CANCELLED",
        reservedCash: 0,
        reservedQuantity: 0,
      },
    });

    await createAuditLog({
      firmId,
      action: "ORDER_CANCELLED",
      entityType: "ORDER",
      entityId: order.id,
      message: "Order cancelled",
      metadata: {
        previousStatus: currentOrder.status,
      },
    }, tx);

    return updatedOrder;
  });
}
