import { prisma } from "@pms-oms/db";
import { createAuditLog } from "./audit.service";
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

  // Prevent applying the same fill twice
  if (order.status === "FILLED") {
    return order;
  }

  const brokerUpdate = await mockBroker.getOrderStatus(
    order.brokerOrderId,
  );

  // If the broker hasn't fully filled the order yet,
  // only update the execution state.
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
        averageFillPrice: brokerUpdate.averageFillPrice,
      },
    });
  }

  const  updatedOrder= await prisma.$transaction(async (tx) => {
    const freshOrder = await tx.order.findUnique({
      where: {
        id: order.id,
      },
    });

    if (!freshOrder) {
      throw new Error("ORDER_NOT_FOUND");
    }

    // Protect against duplicate sync calls
    if (freshOrder.status === "FILLED") {
      return freshOrder;
    }

    const fillQuantity = brokerUpdate.filledQuantity;
    const fillPrice = brokerUpdate.averageFillPrice;

    if(fillPrice === null){
      throw new Error("INVALID_FILL_PRICE");
    }

    if (fillQuantity <= 0) {
      throw new Error("INVALID_FILL_QUANTITY");
    }

    const holding = await tx.holding.findUnique({
      where: {
        portfolioId_symbol_exchange: {
          portfolioId: freshOrder.portfolioId,
          symbol: freshOrder.symbol,
          exchange: freshOrder.exchange,
        },
      },
    });

    // BUY
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
        const oldAveragePrice = Number(
          holding.averagePrice,
        );

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

      return tx.order.update({
        where: {
          id: freshOrder.id,
        },
        data: {
          status: "FILLED",
          filledQuantity: fillQuantity,
          averageFillPrice: fillPrice,
          realizedPnl: null,
          filledAt: new Date(),
        },
      });
    }

    // SELL
    if (freshOrder.side === "SELL") {
      if (
        !holding ||
        holding.quantity < fillQuantity
      ) {
        throw new Error("INSUFFICIENT_HOLDINGS");
      }

      const holdingAveragePrice = Number(
        holding.averagePrice,
      );

      const realizedPnl =
        (fillPrice - holdingAveragePrice) *
        fillQuantity;

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

      return tx.order.update({
        where: {
          id: freshOrder.id,
        },
        data: {
          status: "FILLED",
          filledQuantity: fillQuantity,
          averageFillPrice: fillPrice,
          realizedPnl,
          filledAt: new Date(),
        },
      });
    }

    throw new Error("INVALID_ORDER_SIDE");
  });

  if (updatedOrder.status === "FILLED") {
  await createAuditLog({
    action: "ORDER_FILLED",
    entityType: "ORDER",
    entityId: updatedOrder.id,
    message: "Order filled",
    metadata: {
      filledQuantity: updatedOrder.filledQuantity,
      averageFillPrice:
        updatedOrder.averageFillPrice?.toString(),
      realizedPnl:
        updatedOrder.realizedPnl?.toString(),
    },
  });
}

return updatedOrder;
}