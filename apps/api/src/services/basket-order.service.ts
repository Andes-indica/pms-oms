import { prisma } from "@pms-oms/db";

import {
  allocateOrder,
  type AllocationTarget,
} from "./allocation.service";

import { createAuditLog } from "./audit.service";

type CreateBasketOrderInput = {
  firmId: string;
  name?: string;

  symbol: string;
  exchange: string;

  side: "BUY" | "SELL";

  orderType:
    | "MARKET"
    | "LIMIT";

  limitPrice?: number;

  totalQuantity: number;

  allocationMethod:
    | "FIXED_QUANTITY"
    | "EQUAL_QUANTITY"
    | "PERCENTAGE";

  targets: AllocationTarget[];
};

export async function createBasketOrderService(
  input: CreateBasketOrderInput,
) {
  if (
    typeof input.symbol !== "string" || !input.symbol.trim() ||
    typeof input.exchange !== "string" || !input.exchange.trim()
  ) {
    throw new Error("INVALID_INSTRUMENT");
  }

  if (!(["BUY", "SELL"] as const).includes(input.side)) {
    throw new Error("INVALID_ORDER_SIDE");
  }

  if (!(["MARKET", "LIMIT"] as const).includes(input.orderType)) {
    throw new Error("INVALID_ORDER_TYPE");
  }

  if (
    input.orderType === "LIMIT" &&
    (typeof input.limitPrice !== "number" ||
      !Number.isFinite(input.limitPrice) ||
      input.limitPrice <= 0)
  ) {
    throw new Error("INVALID_LIMIT_PRICE");
  }

  if (!Array.isArray(input.targets)) {
    throw new Error("NO_ALLOCATION_TARGETS");
  }

  const allocations = allocateOrder({
    method: input.allocationMethod,
    totalQuantity: input.totalQuantity,
    targets: input.targets,
  });

  //
  // Validate every portfolio/account pair first.
  //
  for (const allocation of allocations) {
    const portfolio =
      await prisma.portfolio.findFirst({
        where: {
          id: allocation.portfolioId,
          client: {
            firmId: input.firmId,
          },
        },
      });

    if (!portfolio) {
      throw new Error(
        `PORTFOLIO_NOT_FOUND:${allocation.portfolioId}`,
      );
    }

    const brokerAccount =
      await prisma.brokerAccount.findFirst({
        where: {
          id: allocation.brokerAccountId,
          client: {
            firmId: input.firmId,
          },
        },
      });

    if (!brokerAccount) {
      throw new Error(
        `BROKER_ACCOUNT_NOT_FOUND:${allocation.brokerAccountId}`,
      );
    }

    if (
      portfolio.clientId !==
      brokerAccount.clientId
    ) {
      throw new Error(
        "BROKER_ACCOUNT_MISMATCH",
      );
    }
  }

  const basket =
    await prisma.$transaction(
      async (tx) => {
        const createdBasket =
          await tx.basketOrder.create({
            data: {
              name: input.name,

              symbol:
                input.symbol.toUpperCase(),

              exchange:
                input.exchange.toUpperCase(),

              side: input.side,

              orderType:
                input.orderType,

              limitPrice:
                input.orderType === "LIMIT"
                  ? input.limitPrice
                  : null,

              totalQuantity:
                input.totalQuantity,

              allocationMethod:
                input.allocationMethod,

              status: "PENDING",
              firmId: input.firmId,
            },
          });

        for (const allocation of allocations) {
          await tx.order.create({
            data: {
              basketOrderId:
                createdBasket.id,

              portfolioId:
                allocation.portfolioId,

              brokerAccountId:
                allocation.brokerAccountId,

              symbol:
                input.symbol.toUpperCase(),

              exchange:
                input.exchange.toUpperCase(),

              side: input.side,

              orderType:
                input.orderType,

              quantity:
                allocation.quantity,

              limitPrice:
                input.orderType === "LIMIT"
                  ? input.limitPrice
                  : null,

              status: "PENDING",
            },
          });
        }

        await createAuditLog({
          firmId: input.firmId,
          action: "BASKET_CREATED",
          entityType: "BASKET_ORDER",
          entityId: createdBasket.id,
          message: "Basket order created",
          metadata: {
            symbol: createdBasket.symbol,
            totalQuantity: createdBasket.totalQuantity,
            allocationMethod: createdBasket.allocationMethod,
            clientCount: allocations.length,
          },
        }, tx);

        return createdBasket;
      },
    );

  return prisma.basketOrder.findUnique({
    where: {
      id: basket.id,
    },
    include: {
      orders: {
        include: {
          portfolio: {
            include: {
              client: true,
            },
          },
          brokerAccount: true,
        },
      },
    },
  });
}
