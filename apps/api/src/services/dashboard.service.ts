import { prisma } from "@pms-oms/db";

import {
  getMarketPrice,
} from "./market-data.service";

export async function getDashboardService(
  firmId: string,
) {
  const clients =
    await prisma.client.findMany({
      where: {
        firmId,
      },

      include: {
        portfolios: {
          include: {
            holdings: true,
            orders: true,
          },
        },
      },
    });

  let totalCash = 0;
  let totalMarketValue = 0;
  let totalUnrealizedPnl = 0;
  let totalRealizedPnl = 0;
  let portfolioCount = 0;

  // IMPORTANT:
  // These must be inside the function,
  // so every request starts fresh.
  const clientBreakdown: Array<{
    clientId: string;
    clientName: string;
    cash: number;
    marketValue: number;
    aum: number;
  }> = [];

  const holdingMap =
    new Map<
      string,
      {
        symbol: string;
        exchange: string;
        quantity: number;
        marketValue: number;
      }
    >();

  const allOrders =
    clients.flatMap((client) =>
      client.portfolios.flatMap(
        (portfolio) =>
          portfolio.orders,
      ),
    );

  for (const client of clients) {
    let clientCash = 0;
    let clientMarketValue = 0;

    for (const portfolio of client.portfolios) {
      portfolioCount++;

      const cash =
        Number(
          portfolio.cashBalance,
        );

      totalCash += cash;
      clientCash += cash;

      for (const holding of portfolio.holdings) {
        const currentPrice =
          await getMarketPrice(
            holding.symbol,
            holding.exchange,
          );

        const averagePrice =
          Number(
            holding.averagePrice,
          );

        const marketValue =
          currentPrice *
          holding.quantity;

        const costValue =
          averagePrice *
          holding.quantity;

        totalMarketValue +=
          marketValue;

        clientMarketValue +=
          marketValue;

        totalUnrealizedPnl +=
          marketValue -
          costValue;

        const key =
          `${holding.exchange}:${holding.symbol}`;

        const existing =
          holdingMap.get(key);

        if (existing) {
          existing.quantity +=
            holding.quantity;

          existing.marketValue +=
            marketValue;
        } else {
          holdingMap.set(
            key,
            {
              symbol:
                holding.symbol,

              exchange:
                holding.exchange,

              quantity:
                holding.quantity,

              marketValue,
            },
          );
        }
      }

      totalRealizedPnl +=
        portfolio.orders.reduce(
          (total, order) =>
            total +
            Number(
              order.realizedPnl ??
                0,
            ),
          0,
        );
    }

    // One entry per client.
    clientBreakdown.push({
      clientId:
        client.id,

      clientName:
        client.name,

      cash:
        clientCash,

      marketValue:
        clientMarketValue,

      aum:
        clientCash +
        clientMarketValue,
    });
  }

  const activeOrders =
    allOrders.filter((order) =>
      [
        "PENDING",
        "SUBMITTED",
        "OPEN",
        "PARTIALLY_FILLED",
      ].includes(order.status),
    ).length;

  const filledOrders =
    allOrders.filter(
      (order) =>
        order.status ===
        "FILLED",
    ).length;

  const totalAum =
    totalCash +
    totalMarketValue;

  const topHoldings =
    Array.from(
      holdingMap.values(),
    )
      .sort(
        (a, b) =>
          b.marketValue -
          a.marketValue,
      )
      .slice(0, 5)
      .map((holding) => ({
        ...holding,

        allocationPercent:
          totalMarketValue > 0
            ? (
                holding.marketValue /
                totalMarketValue
              ) * 100
            : 0,
      }));

  clientBreakdown.sort(
    (a, b) =>
      b.aum -
      a.aum,
  );

  return {
    totalAum,
    totalCash,
    totalMarketValue,
    totalUnrealizedPnl,
    totalRealizedPnl,

    clients:
      clients.length,

    portfolios:
      portfolioCount,

    activeOrders,
    filledOrders,

    totalOrders:
      allOrders.length,

    clientBreakdown,
    topHoldings,
  };
}