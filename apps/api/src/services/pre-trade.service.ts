import { prisma } from "@pms-oms/db";

export async function runPreTradeChecks(
  orderId: string,
  firmId: string,
  database: Pick<typeof prisma, "order" | "holding"> = prisma,
  availabilityAuthority: "PMS" | "BROKER" = "PMS",
) {
  const order = await database.order.findFirst({
    where: {
      id: orderId,
      portfolio: {
        archivedAt: null,
        client: {
          firmId,
          archivedAt: null,
        },
      },
      brokerAccount: {
        archivedAt: null,
      },
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

  /*
   * A broker-authoritative execution must not be blocked by a stale
   * PMS holding snapshot. The broker validates deliverable quantity
   * when it accepts the order. PMS-authoritative callers retain the
   * stricter local inventory check.
   */
  if (
    order.side === "SELL" &&
    availabilityAuthority === "PMS"
  ) {
    const holding =
      await database.holding.findUnique({
        where: {
          portfolioId_brokerAccountId_symbol_exchange:
            {
              portfolioId:
                order.portfolioId,

              brokerAccountId:
                order.brokerAccountId,

              symbol:
                order.symbol,

              exchange:
                order.exchange,
            },
        },
      });

    if (!holding) {
      const brokerHolding =
        await database.holding.findFirst({
          where: {
            brokerAccountId:
              order.brokerAccountId,

            symbol:
              order.symbol,

            exchange:
              order.exchange,
          },
        });

      if (brokerHolding) {
        throw new Error(
          "HOLDING_IN_DIFFERENT_PORTFOLIO",
        );
      }

      throw new Error(
        "INSUFFICIENT_HOLDINGS",
      );
    }

    if (
      holding.quantity <
      order.quantity
    ) {
      throw new Error(
        "INSUFFICIENT_HOLDINGS",
      );
    }
  }

  return order;
}
