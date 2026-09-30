import {
  supportsHoldings,
} from "@pms-oms/broker";

import {
  prisma,
} from "@pms-oms/db";

import {
  resolveBroker,
} from "../brokers/broker-registry";

export type HoldingReconciliationStatus =
  | "MATCH"
  | "MISSING_IN_PMS"
  | "MISSING_AT_BROKER"
  | "QUANTITY_MISMATCH"
  | "AVERAGE_PRICE_MISMATCH";

export type HoldingReconciliationItem = {
  symbol: string;
  exchange: string;

  status:
    HoldingReconciliationStatus;

  brokerQuantity: number;
  pmsQuantity: number;

  brokerAveragePrice:
    number | null;

  pmsAveragePrice:
    number | null;

  quantityDifference: number;

  averagePriceDifference:
    number | null;
};

function key(
  exchange: string,
  symbol: string,
) {
  return `${exchange.toUpperCase()}:${symbol.toUpperCase()}`;
}

function nearlyEqual(
  left: number,
  right: number,
  tolerance = 0.01,
) {
  return (
    Math.abs(left - right) <=
    tolerance
  );
}

export async function reconcileBrokerHoldings(
  brokerAccountId: string,
  firmId: string,
) {
  /*
   * Verify broker account belongs to
   * the authenticated firm.
   */
  const brokerAccount =
    await prisma.brokerAccount.findFirst({
      where: {
        id: brokerAccountId,

        client: {
          firmId,
        },
      },

      select: {
        id: true,
        broker: true,
        accountId: true,
        clientId: true,
      },
    });

  if (!brokerAccount) {
    throw new Error(
      "BROKER_ACCOUNT_NOT_FOUND",
    );
  }

  const broker =
    await resolveBroker(
      brokerAccountId,
      firmId,
    );

  if (
    !supportsHoldings(
      broker,
    )
  ) {
    throw new Error(
      "BROKER_HOLDINGS_UNSUPPORTED",
    );
  }

  const [
    brokerHoldings,
    pmsHoldings,
  ] =
    await Promise.all([
      broker.getHoldings(),

      prisma.holding.findMany({
        where: {
          brokerAccountId,

          portfolio: {
            client: {
              firmId,
            },
          },
        },

        select: {
          symbol: true,
          exchange: true,
          quantity: true,
          averagePrice: true,
        },
      }),
    ]);

  /*
   * Broker account is one account,
   * but PMS holdings may be spread over
   * several portfolios.
   *
   * Aggregate PMS holdings by instrument.
   */
  const pmsMap =
    new Map<
      string,
      {
        symbol: string;
        exchange: string;
        quantity: number;
        totalCost: number;
      }
    >();

  for (
    const holding of
    pmsHoldings
  ) {
    const normalizedKey =
      key(
        holding.exchange,
        holding.symbol,
      );

    const quantity =
      holding.quantity;

    const averagePrice =
      Number(
        holding.averagePrice,
      );

    const existing =
      pmsMap.get(
        normalizedKey,
      );

    if (existing) {
      existing.quantity +=
        quantity;

      existing.totalCost +=
        quantity *
        averagePrice;
    } else {
      pmsMap.set(
        normalizedKey,
        {
          symbol:
            holding.symbol
              .toUpperCase(),

          exchange:
            holding.exchange
              .toUpperCase(),

          quantity,

          totalCost:
            quantity *
            averagePrice,
        },
      );
    }
  }

  const brokerMap =
    new Map(
      brokerHoldings.map(
        (holding) => [
          key(
            holding.exchange,
            holding.symbol,
          ),

          {
            ...holding,

            symbol:
              holding.symbol
                .toUpperCase(),

            exchange:
              holding.exchange
                .toUpperCase(),
          },
        ],
      ),
    );

  const instrumentKeys =
    new Set([
      ...brokerMap.keys(),
      ...pmsMap.keys(),
    ]);

  const items:
    HoldingReconciliationItem[] =
      [];

  for (
    const instrumentKey of
    instrumentKeys
  ) {
    const brokerHolding =
      brokerMap.get(
        instrumentKey,
      );

    const pmsHolding =
      pmsMap.get(
        instrumentKey,
      );

    const brokerQuantity =
      brokerHolding
        ?.quantity ?? 0;

    const pmsQuantity =
      pmsHolding
        ?.quantity ?? 0;

    const brokerAveragePrice =
      brokerHolding
        ? brokerHolding
            .averagePrice
        : null;

    const pmsAveragePrice =
      pmsHolding &&
      pmsHolding.quantity >
        0
        ? pmsHolding
            .totalCost /
          pmsHolding
            .quantity
        : null;

    let status:
      HoldingReconciliationStatus;

    if (
      brokerHolding &&
      !pmsHolding
    ) {
      status =
        "MISSING_IN_PMS";
    } else if (
      !brokerHolding &&
      pmsHolding
    ) {
      status =
        "MISSING_AT_BROKER";
    } else if (
      brokerQuantity !==
      pmsQuantity
    ) {
      status =
        "QUANTITY_MISMATCH";
    } else if (
      brokerAveragePrice !==
        null &&
      pmsAveragePrice !==
        null &&
      !nearlyEqual(
        brokerAveragePrice,
        pmsAveragePrice,
      )
    ) {
      status =
        "AVERAGE_PRICE_MISMATCH";
    } else {
      status = "MATCH";
    }

    items.push({
      symbol:
        brokerHolding
          ?.symbol ??
        pmsHolding!
          .symbol,

      exchange:
        brokerHolding
          ?.exchange ??
        pmsHolding!
          .exchange,

      status,

      brokerQuantity,
      pmsQuantity,

      brokerAveragePrice,
      pmsAveragePrice,

      quantityDifference:
        brokerQuantity -
        pmsQuantity,

      averagePriceDifference:
        brokerAveragePrice !==
          null &&
        pmsAveragePrice !==
          null
          ? brokerAveragePrice -
            pmsAveragePrice
          : null,
    });
  }

  items.sort(
    (left, right) => {
      if (
        left.status ===
          "MATCH" &&
        right.status !==
          "MATCH"
      ) {
        return 1;
      }

      if (
        left.status !==
          "MATCH" &&
        right.status ===
          "MATCH"
      ) {
        return -1;
      }

      return (
        `${left.exchange}:${left.symbol}`
          .localeCompare(
            `${right.exchange}:${right.symbol}`,
          )
      );
    },
  );

  const mismatchCount =
    items.filter(
      (item) =>
        item.status !==
        "MATCH",
    ).length;

  return {
    brokerAccountId:
      brokerAccount.id,

    broker:
      brokerAccount.broker,

    accountId:
      brokerAccount.accountId,

    status:
      mismatchCount === 0
        ? "MATCH"
        : "MISMATCH",

    matchedCount:
      items.length -
      mismatchCount,

    mismatchCount,

    items,

    fetchedAt:
      new Date()
        .toISOString(),
  };
}