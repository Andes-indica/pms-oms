import { prisma } from "@pms-oms/db";

import {
  allocateOrder,
  type AllocationTarget,
} from "./allocation.service";

import { createAuditLog } from "./audit.service";

type CreateBasketOrderInput = {
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
      await prisma.portfolio.findUnique({
        where: {
          id: allocation.portfolioId,
        },
      });

    if (!portfolio) {
      throw new Error(
        `PORTFOLIO_NOT_FOUND:${allocation.portfolioId}`,
      );
    }

    const brokerAccount =
      await prisma.brokerAccount.findUnique({
        where: {
          id: allocation.brokerAccountId,
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

        return createdBasket;
      },
    );

  await createAuditLog({
    action: "BASKET_CREATED",
    entityType: "BASKET_ORDER",
    entityId: basket.id,

    message: "Basket order created",

    metadata: {
      symbol: basket.symbol,
      totalQuantity:
        basket.totalQuantity,
      allocationMethod:
        basket.allocationMethod,
      clientCount:
        allocations.length,
    },
  });

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