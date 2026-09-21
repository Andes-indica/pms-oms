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

  const allOrders =
    clients.flatMap((client) =>
      client.portfolios.flatMap(
        (portfolio) =>
          portfolio.orders,
      ),
    );

  for (const client of clients) {
    for (const portfolio of client.portfolios) {
      portfolioCount++;

      totalCash += Number(
        portfolio.cashBalance,
      );

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

        totalUnrealizedPnl +=
          marketValue -
          costValue;
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
  };
}