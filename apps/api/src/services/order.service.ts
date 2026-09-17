import { prisma } from "@pms-oms/db";
import { createAuditLog } from "./audit.service";

type CreateOrderInput = {
  firmId: string;

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
    firmId,
    portfolioId,
    brokerAccountId,
    symbol,
    exchange,
    side,
    orderType,
    quantity,
    limitPrice,
  } = input;

  const portfolio = await prisma.portfolio.findFirst({
    where: {
       id: portfolioId,
        client: {
          firmId,
        },
      },
  });

  if (!portfolio) {
    throw new Error("PORTFOLIO_NOT_FOUND");
  }

  const brokerAccount = await prisma.brokerAccount.findFirst({
    where: { id: brokerAccountId, client:{ firmId, }, },
  });

  if (!brokerAccount) {
    throw new Error("BROKER_ACCOUNT_NOT_FOUND");
  }

  if (portfolio.clientId !== brokerAccount.clientId) {
    throw new Error("BROKER_ACCOUNT_MISMATCH");
  }

  return prisma.$transaction(async (tx) => {
    const order = await tx.order.create({
      data: {
        portfolioId,
        brokerAccountId,
        symbol: symbol.toUpperCase(),
        exchange: exchange.toUpperCase(),
        side,
        orderType,
        quantity,
        limitPrice:
          orderType === "LIMIT"
            ? limitPrice
            : null,
        status: "PENDING",
      },
    });

    await createAuditLog({
      firmId,
      action: "ORDER_CREATED",
      entityType: "ORDER",
      entityId: order.id,
      message: "Order created",
      metadata: {
        portfolioId,
        brokerAccountId,
        symbol: order.symbol,
        side,
        quantity,
      },
    }, tx);

    return order;
  });
}
