import { prisma } from "@pms-oms/db";

export async function runPreTradeChecks(orderId: string) {
  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
    include: {
      portfolio: true,
      brokerAccount: true,
    },
  });

  if (!order) {
    throw new Error("ORDER_NOT_FOUND");
  }

  if (order.status !== "PENDING") {
    throw new Error("ORDER_NOT_PENDING");
  }

  if (order.portfolio.clientId !== order.brokerAccount.clientId) {
    throw new Error("BROKER_ACCOUNT_MISMATCH");
  }

  if (order.quantity <= 0) {
    throw new Error("INVALID_QUANTITY");
  }

  if (order.side === "SELL") {
    const holding = await prisma.holding.findUnique({
      where: {
        portfolioId_symbol_exchange: {
          portfolioId: order.portfolioId,
          symbol: order.symbol,
          exchange: order.exchange,
        },
      },
    });

    if (!holding || holding.quantity < order.quantity) {
      throw new Error("INSUFFICIENT_HOLDINGS");
    }
  }

  return order;
}