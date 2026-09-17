import { prisma } from "@pms-oms/db";

type RiskCheckInput = {
  currentOrderId: string;
  portfolioId: string;
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
    "portfolio" | "restrictedSecurity" | "order"
  > = prisma,
) {
  const portfolio =
    await database.portfolio.findUnique({
      where: {
        id: input.portfolioId,
      },

      include: {
        riskLimit: true,

        holdings: {
          where: {
            symbol: input.symbol,
            exchange: input.exchange,
          },
        },
      },
    });
  const restrictedSecurity =
    await database.restrictedSecurity.findUnique({
      where: {
        symbol_exchange: {
          symbol: input.symbol,
          exchange: input.exchange,
        },
      },
    });

  if (restrictedSecurity) {
    throw new Error("RESTRICTED_SECURITY");
  }

  if (!portfolio) {
    throw new Error("PORTFOLIO_NOT_FOUND");
  }

  const orderValue =
    input.quantity * input.estimatedPrice;

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
    holding?.quantity ?? 0;

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
