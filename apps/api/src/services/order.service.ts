import { prisma } from "@pms-oms/db";
import { createAuditLog } from "./audit.service";
import {
  validateInstrument,
} from "./instrument-master.service";

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
  executionMode?:
    | "DIRECT_API"
    | "CLIENT_CONFIRMATION";
  actorUserId?: string;
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
    executionMode =
      "DIRECT_API",
    actorUserId,
  } = input;

  const instrument =
    await validateInstrument(
      symbol,
      exchange,
    );

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
    where: {
      id: brokerAccountId,
      archivedAt: null,
      client: {
        firmId,
      },
    },
  });

  if (!brokerAccount) {
    throw new Error("BROKER_ACCOUNT_NOT_FOUND");
  }

  if (portfolio.clientId !== brokerAccount.clientId) {
    throw new Error("BROKER_ACCOUNT_MISMATCH");
  }

  if (
    executionMode ===
      "CLIENT_CONFIRMATION" &&
    brokerAccount.broker
      .toUpperCase() !==
      "ZERODHA"
  ) {
    throw new Error(
      "CLIENT_CONFIRMATION_BROKER_UNSUPPORTED",
    );
  }

  return prisma.$transaction(async (tx) => {
    const order = await tx.order.create({
      data: {
        portfolioId,
        brokerAccountId,
        symbol:
          instrument.symbol,
        exchange:
          instrument.exchange,
        side,
        orderType,
        quantity,
        limitPrice:
          orderType === "LIMIT"
            ? limitPrice
            : null,
        status: "PENDING",
        executionMode,
      },
    });

    await createAuditLog({
      firmId,
      action: "ORDER_CREATED",
      entityType: "ORDER",
      entityId: order.id,
      message: "Order created",
      actorUserId,
      metadata: {
        portfolioId,
        brokerAccountId,
        symbol: order.symbol,
        side,
        quantity,
        executionMode,
      },
    }, tx);

    return order;
  });
}
