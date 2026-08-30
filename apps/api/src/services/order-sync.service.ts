import { prisma } from "@pms-oms/db";
import { MockBroker } from "@pms-oms/broker";

const broker = new MockBroker();

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

  const brokerStatus = await broker.getOrderStatus(
    order.brokerOrderId,
  );

  if (brokerStatus !== "FILLED") {
    return prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        status: brokerStatus,
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

    if (freshOrder.status === "FILLED") {
      return freshOrder;
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

    if (freshOrder.side === "BUY") {
      if (holding) {
        await tx.holding.update({
          where: {
            id: holding.id,
          },
          data: {
            quantity: {
              increment: freshOrder.quantity,
            },
          },
        });
      } else {
        await tx.holding.create({
          data: {
            portfolioId: freshOrder.portfolioId,
            symbol: freshOrder.symbol,
            exchange: freshOrder.exchange,
            quantity: freshOrder.quantity,
            averagePrice: freshOrder.limitPrice ?? 0,
          },
        });
      }
    }

    if (freshOrder.side === "SELL") {
      if (!holding || holding.quantity < freshOrder.quantity) {
        throw new Error("INSUFFICIENT_HOLDINGS");
      }

      const remainingQuantity =
        holding.quantity - freshOrder.quantity;

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
      },
    });
  });
}