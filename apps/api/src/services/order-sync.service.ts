import { prisma } from "@pms-oms/db";

import { mockBroker } from "../brokers/broker-registry";

export async function syncOrderService(orderId: string) {
  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
  });

  if (!order) {
    throw new Error("ORDER_NOT_FOUND");
  }

  if (!order.brokerOrderId) {
    throw new Error("ORDER_NOT_SUBMITTED");
  }

  if (order.status === "FILLED") {
    return order;
  }

  const brokerUpdate = await mockBroker.getOrderStatus(
    order.brokerOrderId,
  );

  if (
    brokerUpdate.status !== "FILLED" ||
    brokerUpdate.averageFillPrice === null
  ) {
    return prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        status: brokerUpdate.status,
        filledQuantity: brokerUpdate.filledQuantity,
        averageFillPrice:
          brokerUpdate.averageFillPrice,
      },
    });
  }

  return prisma.$transaction(async (tx) => {
    const freshOrder = await tx.order.findUnique({
      where: {
        id: order.id,
      },
    });

    if (!freshOrder) {
      throw new Error("ORDER_NOT_FOUND");
    }

    // Prevent applying the same fill twice.
    if (freshOrder.status === "FILLED") {
      return freshOrder;
    }

    const fillQuantity =
      brokerUpdate.filledQuantity;

    const fillPrice =
      brokerUpdate.averageFillPrice!;

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
            quantity: fillQuantity,
            averagePrice: fillPrice,
          },
        });
      } else {
        const oldQuantity = holding.quantity;
        const oldAveragePrice =
          Number(holding.averagePrice);

        const newQuantity =
          oldQuantity + fillQuantity;

        const newAveragePrice =
          (
            oldQuantity * oldAveragePrice +
            fillQuantity * fillPrice
          ) / newQuantity;

        await tx.holding.update({
          where: {
            id: holding.id,
          },
          data: {
            quantity: newQuantity,
            averagePrice: newAveragePrice,
          },
        });
      }
    }

    if (freshOrder.side === "SELL") {
      if (
        !holding ||
        holding.quantity < fillQuantity
      ) {
        throw new Error(
          "INSUFFICIENT_HOLDINGS",
        );
      }

      const remainingQuantity =
        holding.quantity - fillQuantity;

      if (remainingQuantity === 0) {
        await tx.holding.delete({
          where: {
            id: holding.id,
          },
        });
      } else {
        await tx.holding.update({
          where: {
            id: holding.id,
          },
          data: {
            quantity: remainingQuantity,
          },
        });
      }
    }

    return tx.order.update({
      where: {
        id: freshOrder.id,
      },
      data: {
        status: "FILLED",
        filledQuantity: fillQuantity,
        averageFillPrice: fillPrice,
        filledAt: new Date(),
      },
    });
  });
}