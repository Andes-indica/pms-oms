import { prisma } from "@pms-oms/db";

import {
  getMarketPrice,
} from "./market-data.service";

export async function getPortfolioValuationService(
  portfolioId: string,
  firmId: string,
) {
  const portfolio =
    await prisma.portfolio.findFirst({
      where: {
        id: portfolioId,

        client: {
          firmId,
        },
      },

      include: {
        holdings: true,
      },
    });

  if (!portfolio) {
    throw new Error(
      "PORTFOLIO_NOT_FOUND",
    );
  }

  const holdings =
    await Promise.all(
      portfolio.holdings.map(
        async (holding) => {
          const currentPrice =
            await getMarketPrice(
              holding.symbol,
              holding.exchange,
            );

          const averagePrice =
            Number(
              holding.averagePrice,
            );

          const costValue =
            averagePrice *
            holding.quantity;

          const marketValue =
            currentPrice *
            holding.quantity;

          const unrealizedPnl =
            marketValue -
            costValue;

          const unrealizedPnlPercent =
            costValue > 0
              ? (unrealizedPnl /
                  costValue) *
                100
              : 0;

          return {
            id: holding.id,

            symbol:
              holding.symbol,

            exchange:
              holding.exchange,

            quantity:
              holding.quantity,

            averagePrice,

            currentPrice,

            costValue,

            marketValue,

            unrealizedPnl,

            unrealizedPnlPercent,
          };
        },
      ),
    );

  const totalCostValue =
    holdings.reduce(
      (sum, holding) =>
        sum +
        holding.costValue,
      0,
    );

  const totalMarketValue =
    holdings.reduce(
      (sum, holding) =>
        sum +
        holding.marketValue,
      0,
    );

  const totalUnrealizedPnl =
    holdings.reduce(
      (sum, holding) =>
        sum +
        holding.unrealizedPnl,
      0,
    );

  const cashBalance =
    Number(
      portfolio.cashBalance,
    );

  const portfolioValue =
    cashBalance +
    totalMarketValue;

  return {
    portfolioId:
      portfolio.id,

    portfolioName:
      portfolio.name,

    cashBalance,

    totalCostValue,

    totalMarketValue,

    totalUnrealizedPnl,

    portfolioValue,

    holdings,
  };
}