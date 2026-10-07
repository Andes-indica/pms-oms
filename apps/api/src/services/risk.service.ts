import { prisma } from "@pms-oms/db";

type RiskCheckInput = {
  currentOrderId: string;
  portfolioId: string;
  brokerAccountId: string;
  symbol: string;
  exchange: string;
  side: "BUY" | "SELL";
  quantity: number;
  estimatedPrice: number;
};

export async function runRiskChecks(
  input: RiskCheckInput,
  database: Pick<
    typeof prisma,
    "portfolio" | "restrictedSecurity" | "order" | "portfolioBrokerCash"
  > = prisma,
) {
  const portfolio =
    await database.portfolio.findUnique({
      where: {
        id: input.portfolioId,
      },

      include: {
        riskLimit: true,

        client: {
          select: {
            firmId: true,
          },
        },

        holdings: {
          where: {
            symbol: input.symbol,
            exchange: input.exchange,
          },
        },
      },
    });
  if (!portfolio) {
    throw new Error("PORTFOLIO_NOT_FOUND");
  }

  const restrictedSecurity =
    await database.restrictedSecurity.findFirst({
      where: {
        symbol: input.symbol,
        exchange: input.exchange,

        OR: [
          {
            firmId:
              portfolio.client
                .firmId,
          },
          {
            firmId: null,
          },
        ],
      },
    });

  if (restrictedSecurity) {
    throw new Error("RESTRICTED_SECURITY");
  }

  const orderValue =
    input.quantity * input.estimatedPrice;

  const brokerCashAllocation =
    await database.portfolioBrokerCash.findUnique({
      where: {
        portfolioId_brokerAccountId: {
          portfolioId:
            input.portfolioId,
          brokerAccountId:
            input.brokerAccountId,
        },
      },
    });

  const activeReservations = await database.order.aggregate({
    where: {
      portfolioId: input.portfolioId,
      id: {
        not: input.currentOrderId,
      },
      status: {
        in: ["SUBMITTED", "OPEN", "PARTIALLY_FILLED"],
      },
    },
    _sum: {
      reservedCash: true,
    },
  });

  const reservedCash = Number(
    activeReservations._sum.reservedCash ?? 0,
  );

  if (
    input.side === "BUY" &&
    Number(portfolio.cashBalance) - reservedCash < orderValue
  ) {
    throw new Error("INSUFFICIENT_CASH");
  }

  if (
    input.side === "BUY" &&
    brokerCashAllocation
  ) {
    const brokerReservations =
      await database.order.aggregate({
        where: {
          portfolioId:
            input.portfolioId,

          brokerAccountId:
            input.brokerAccountId,

          id: {
            not:
              input.currentOrderId,
          },

          status: {
            in: [
              "SUBMITTED",
              "OPEN",
              "PARTIALLY_FILLED",
            ],
          },
        },

        _sum: {
          reservedCash: true,
        },
      });

    const brokerReservedCash =
      Number(
        brokerReservations
          ._sum
          .reservedCash ??
        0,
      );

    if (
      Number(
        brokerCashAllocation
          .cashBalance,
      ) -
        brokerReservedCash <
      orderValue
    ) {
      throw new Error(
        "INSUFFICIENT_BROKER_CASH",
      );
    }
  }

  const limits = portfolio.riskLimit;

  if (
    limits?.maxOrderQuantity !== null &&
    limits?.maxOrderQuantity !== undefined &&
    input.quantity > limits.maxOrderQuantity
  ) {
    throw new Error(
      "MAX_ORDER_QUANTITY_EXCEEDED",
    );
  }

  if (
    limits?.maxOrderValue !== null &&
    limits?.maxOrderValue !== undefined &&
    orderValue >
    Number(limits.maxOrderValue)
  ) {
    throw new Error(
      "MAX_ORDER_VALUE_EXCEEDED",
    );
  }

  const holding = portfolio.holdings[0];

  const currentQuantity =
    portfolio.holdings.reduce(
      (total, holding) => total + holding.quantity, 0,
    );
  const brokerHoldingQuantity = portfolio.holdings.filter((holding) => holding.brokerAccountId === input.brokerAccountId,).reduce(
    (total, holding) => total + holding.quantity, 0,
  );

  const sellReservations = await database.order.aggregate({
    where: {
      portfolioId: input.portfolioId,
      symbol: input.symbol,
      exchange: input.exchange,
      id: {
        not: input.currentOrderId,
      },
      status: {
        in: ["SUBMITTED", "OPEN", "PARTIALLY_FILLED"],
      },
    },
    _sum: {
      reservedQuantity: true,
    },
  });
  const brokerSellReservations =
    await database.order.aggregate({
      where: {
        portfolioId:
          input.portfolioId,

        brokerAccountId:
          input.brokerAccountId,

        symbol:
          input.symbol,

        exchange:
          input.exchange,

        side: "SELL",

        id: {
          not:
            input.currentOrderId,
        },

        status: {
          in: [
            "SUBMITTED",
            "OPEN",
            "PARTIALLY_FILLED",
          ],
        },
      },

      _sum: {
        reservedQuantity:
          true,
      },
    });

  const brokerReservedQuantity =
    brokerSellReservations
      ._sum
      .reservedQuantity ?? 0;

  const reservedQuantity =
    sellReservations._sum.reservedQuantity ?? 0;

  const buyReservations = await database.order.aggregate({
    where: {
      portfolioId: input.portfolioId,
      symbol: input.symbol,
      exchange: input.exchange,
      side: "BUY",
      id: {
        not: input.currentOrderId,
      },
      status: {
        in: ["SUBMITTED", "OPEN", "PARTIALLY_FILLED"],
      },
    },
    _sum: {
      quantity: true,
      filledQuantity: true,
    },
  });

  const reservedBuyQuantity =
    (buyReservations._sum.quantity ?? 0) -
    (buyReservations._sum.filledQuantity ?? 0);
  if (
    input.side === "SELL" &&
    brokerHoldingQuantity -
    brokerReservedQuantity <
    input.quantity
  ) {
    throw new Error(
      "INSUFFICIENT_HOLDINGS",
    );
  }
  let projectedQuantity = currentQuantity;

  if (input.side === "BUY") {
    projectedQuantity += input.quantity + reservedBuyQuantity;
  }

  if (input.side === "SELL") {
    projectedQuantity -= input.quantity + reservedQuantity;

    if (projectedQuantity < 0) {
      throw new Error(
        "INSUFFICIENT_HOLDINGS",
      );
    }
  }

  if (
    limits?.maxPositionQuantity !== null &&
    limits?.maxPositionQuantity !== undefined &&
    projectedQuantity >
    limits.maxPositionQuantity
  ) {
    throw new Error(
      "MAX_POSITION_QUANTITY_EXCEEDED",
    );
  }

  const projectedPositionValue =
    projectedQuantity * input.estimatedPrice;

  if (
    limits?.maxPositionValue !== null &&
    limits?.maxPositionValue !== undefined &&
    projectedPositionValue >
    Number(limits.maxPositionValue)
  ) {
    throw new Error(
      "MAX_POSITION_VALUE_EXCEEDED",
    );
  }

  return {
    passed: true,
    orderValue,
    projectedQuantity,
    projectedPositionValue,
  };
}
