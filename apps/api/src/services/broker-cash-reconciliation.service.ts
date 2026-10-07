import {
  supportsFunds,
} from "@pms-oms/broker";

import {
  prisma,
} from "@pms-oms/db";

import {
  resolveBroker,
} from "../brokers/broker-registry";

function nearlyEqual(
  left: number,
  right: number,
  tolerance = 0.01,
) {
  return (
    Math.abs(
      left - right,
    ) <= tolerance
  );
}

export async function getBrokerCashReconciliation(
  brokerAccountId: string,
  firmId: string,
) {
  const account =
    await prisma.brokerAccount.findFirst({
      where: {
        id:
          brokerAccountId,

        archivedAt:
          null,

        client: {
          firmId,
        },
      },

      select: {
        id: true,
        broker: true,
        accountId: true,
      },
    });

  if (!account) {
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
    !supportsFunds(
      broker,
    )
  ) {
    throw new Error(
      "BROKER_FUNDS_UNSUPPORTED",
    );
  }

  const [
    funds,
    allocations,
  ] =
    await Promise.all([
      broker.getFunds(),

      prisma.portfolioBrokerCash.findMany({
        where: {
          brokerAccountId,

          portfolio: {
            client: {
              firmId,
            },
          },
        },

        include: {
          portfolio: {
            select: {
              id: true,
              name: true,
              cashBalance:
                true,
            },
          },
        },

        orderBy: {
          portfolio: {
            name: "asc",
          },
        },
      }),
    ]);

  const pmsAllocatedCash =
    allocations.reduce(
      (
        total,
        allocation,
      ) =>
        total +
        Number(
          allocation.cashBalance,
        ),
      0,
    );

  const status =
    allocations.length === 0
      ? "UNCONFIGURED"
      : nearlyEqual(
          funds.availableCash,
          pmsAllocatedCash,
        )
        ? "MATCH"
        : "MISMATCH";

  return {
    brokerAccountId:
      account.id,

    broker:
      account.broker,

    accountId:
      account.accountId,

    status,

    brokerAvailableCash:
      funds.availableCash,

    brokerNetAvailable:
      funds.netAvailable,

    brokerUsedMargin:
      funds.usedMargin,

    pmsAllocatedCash,

    difference:
      funds.availableCash -
      pmsAllocatedCash,

    allocations:
      allocations.map(
        (allocation) => ({
          id:
            allocation.id,

          portfolioId:
            allocation
              .portfolioId,

          portfolioName:
            allocation
              .portfolio
              .name,

          portfolioCashBalance:
            Number(
              allocation
                .portfolio
                .cashBalance,
            ),

          allocatedCash:
            Number(
              allocation
                .cashBalance,
            ),
        }),
      ),

    fetchedAt:
      new Date()
        .toISOString(),
  };
}

export async function setBrokerCashAllocation(
  brokerAccountId: string,
  portfolioId: string,
  firmId: string,
  amount: number,
) {
  if (
    !Number.isFinite(
      amount,
    ) ||
    amount < 0
  ) {
    throw new Error(
      "INVALID_BROKER_CASH_ALLOCATION",
    );
  }

  return prisma.$transaction(
    async (tx) => {
      await tx.$queryRaw`
        SELECT "id"
        FROM "Portfolio"
        WHERE "id" = ${portfolioId}
        FOR UPDATE
      `;

      const account =
        await tx.brokerAccount.findFirst({
          where: {
            id:
              brokerAccountId,

            archivedAt:
              null,

            client: {
              firmId,
            },
          },

          select: {
            id: true,
            clientId: true,
          },
        });

      if (!account) {
        throw new Error(
          "BROKER_ACCOUNT_NOT_FOUND",
        );
      }

      const portfolio =
        await tx.portfolio.findFirst({
          where: {
            id:
              portfolioId,

            clientId:
              account.clientId,

            client: {
              firmId,
            },
          },

          select: {
            id: true,
            cashBalance:
              true,
          },
        });

      if (!portfolio) {
        throw new Error(
          "BROKER_CASH_PORTFOLIO_INVALID",
        );
      }

      const otherAllocations =
        await tx.portfolioBrokerCash.aggregate({
          where: {
            portfolioId,

            brokerAccountId: {
              not:
                brokerAccountId,
            },
          },

          _sum: {
            cashBalance:
              true,
          },
        });

      const alreadyAllocated =
        Number(
          otherAllocations
            ._sum
            .cashBalance ??
          0,
        );

      if (
        alreadyAllocated +
          amount >
        Number(
          portfolio.cashBalance,
        ) +
          0.01
      ) {
        throw new Error(
          "BROKER_CASH_ALLOCATION_EXCEEDS_PORTFOLIO_CASH",
        );
      }

      return tx.portfolioBrokerCash.upsert({
        where: {
          portfolioId_brokerAccountId: {
            portfolioId,
            brokerAccountId,
          },
        },

        create: {
          portfolioId,
          brokerAccountId,
          cashBalance:
            amount,
        },

        update: {
          cashBalance:
            amount,
        },
      });
    },
  );
}

export async function removeBrokerCashAllocation(
  brokerAccountId: string,
  portfolioId: string,
  firmId: string,
) {
  const allocation =
    await prisma.portfolioBrokerCash.findFirst({
      where: {
        brokerAccountId,
        portfolioId,

        brokerAccount: {
          archivedAt:
            null,

          client: {
            firmId,
          },
        },

        portfolio: {
          client: {
            firmId,
          },
        },
      },

      select: {
        id: true,
      },
    });

  if (!allocation) {
    throw new Error(
      "BROKER_CASH_ALLOCATION_NOT_FOUND",
    );
  }

  await prisma.portfolioBrokerCash.delete({
    where: {
      id:
        allocation.id,
    },
  });

  return {
    id:
      allocation.id,
    deleted: true,
  };
}