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
  availabilityAuthority?: "PMS" | "BROKER";
};

const ACTIVE_ORDER_STATUSES = [
  "SUBMITTED",
  "OPEN",
  "PARTIALLY_FILLED",
] as const;

function activeReservationFilter(
  now = new Date(),
) {
  return {
    OR: [
      {
        status: {
          in: [
            ...ACTIVE_ORDER_STATUSES,
          ],
        },
      },
      {
        status: "PENDING" as const,
        executionMode:
          "CLIENT_CONFIRMATION" as const,
        clientConfirmation: {
          OR: [
            {
              status:
                "HANDOFF_STARTED" as const,
            },
            {
              status:
                "AWAITING_CLIENT" as const,
              expiresAt: {
                gt: now,
              },
            },
          ],
        },
      },
    ],
  };
}

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

        client: {
          select: {
            firmId: true,
            archivedAt: true,
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
  if (
    !portfolio ||
    portfolio.archivedAt ||
    portfolio.client.archivedAt
  ) {
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

  /*
   * Cash balances and reservations are accounting data, not an order
   * admission rule. Required margin depends on broker product and margin
   * rules, so the broker's place/modify response is the authority.
   */

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

  const currentQuantity =
    portfolio.holdings.reduce(
      (total, holding) =>
        total + holding.quantity,
      0,
    );

  const brokerHoldingQuantity =
    portfolio.holdings
      .filter(
        (holding) =>
          holding.brokerAccountId ===
          input.brokerAccountId,
      )
      .reduce(
        (total, holding) =>
          total + holding.quantity,
        0,
      );

  const sellReservations = await database.order.aggregate({
    where: {
      portfolioId: input.portfolioId,
      symbol: input.symbol,
      exchange: input.exchange,
      id: {
        not: input.currentOrderId,
      },
      ...activeReservationFilter(),
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

        ...activeReservationFilter(),
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
      ...activeReservationFilter(),
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
    input.availabilityAuthority !== "BROKER" &&
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

    if (
      projectedQuantity < 0 &&
      input.availabilityAuthority !== "BROKER"
    ) {
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
