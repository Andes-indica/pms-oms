import { prisma } from "@pms-oms/db";

type CreateOrderInput = {
  portfolioId: string;
  brokerAccountId: string;
  symbol: string;
  exchange: string;
  side: "BUY" | "SELL";
  orderType: "MARKET" | "LIMIT";
  quantity: number;
  limitPrice?: number;
};

export async function createOrderService(input: CreateOrderInput) {
  const {
    portfolioId,
    brokerAccountId,
    symbol,
    exchange,
    side,
    orderType,
    quantity,
    limitPrice,
  } = input;

  const portfolio = await prisma.portfolio.findUnique({
    where: { id: portfolioId },
  });

  if (!portfolio) {
    throw new Error("PORTFOLIO_NOT_FOUND");
  }

  const brokerAccount = await prisma.brokerAccount.findUnique({
    where: { id: brokerAccountId },
  });

  if (!brokerAccount) {
    throw new Error("BROKER_ACCOUNT_NOT_FOUND");
  }

  if (portfolio.clientId !== brokerAccount.clientId) {
    throw new Error("BROKER_ACCOUNT_MISMATCH");
  }

  return prisma.order.create({
    data: {
      portfolioId,
      brokerAccountId,
      symbol: symbol.toUpperCase(),
      exchange: exchange.toUpperCase(),
      side,
      orderType,
      quantity,
      limitPrice: orderType === "LIMIT" ? limitPrice : null,
      status: "PENDING",
    },
  });
}