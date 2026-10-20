import {
  prisma,
} from "@pms-oms/db";

import {
  createAuditLog,
} from "./audit.service";

const ACTIVE_ORDER_STATUSES = [
  "PENDING",
  "SUBMITTED",
  "OPEN",
  "PARTIALLY_FILLED",
] as const;

type CreatePortfolioInput = {
  name: string;
  initialCash?: number;
};

type UpdatePortfolioInput = {
  name: string;
};

function normalizeName(
  value: string,
) {
  const name =
    value?.trim();

  if (!name) {
    throw new Error(
      "PORTFOLIO_NAME_REQUIRED",
    );
  }

  return name;
}

export async function createPortfolioService(
  clientId: string,
  firmId: string,
  input: CreatePortfolioInput,
) {
  const client =
    await prisma.client.findFirst({
      where: {
        id: clientId,
        firmId,
        archivedAt: null,
      },
      select: {
        id: true,
      },
    });

  if (!client) {
    throw new Error(
      "CLIENT_NOT_FOUND",
    );
  }

  const name =
    normalizeName(
      input.name,
    );

  const initialCash =
    input.initialCash ?? 0;

  if (
    !Number.isFinite(
      initialCash,
    ) ||
    initialCash < 0
  ) {
    throw new Error(
      "INVALID_INITIAL_CASH",
    );
  }

  return prisma.$transaction(
    async (tx) => {
      const portfolio =
        await tx.portfolio.create({
          data: {
            clientId,
            name,
            cashBalance:
              initialCash,
          },
        });

      if (initialCash > 0) {
        await tx.cashTransaction.create({
          data: {
            portfolioId:
              portfolio.id,

            type:
              "DEPOSIT",

            amount:
              initialCash,

            balanceAfter:
              portfolio.cashBalance,

            referenceType:
              "PORTFOLIO_OPENING_BALANCE",

            referenceId:
              portfolio.id,

            note:
              "Opening cash balance",
          },
        });
      }

      return portfolio;
    },
  );
}

export async function updatePortfolioService(
  portfolioId: string,
  firmId: string,
  input: UpdatePortfolioInput,
) {
  const portfolio =
    await prisma.portfolio.findFirst({
      where: {
        id: portfolioId,
        client: {
          firmId,
          archivedAt: null,
        },
        archivedAt: null,
      },
      select: {
        id: true,
      },
    });

  if (!portfolio) {
    throw new Error(
      "PORTFOLIO_NOT_FOUND",
    );
  }

  return prisma.portfolio.update({
    where: {
      id: portfolio.id,
    },
    data: {
      name:
        normalizeName(
          input.name,
        ),
    },
  });
}

export async function deletePortfolioService(
  portfolioId: string,
  firmId: string,
  actorUserId?: string,
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
        holdings: {
          select: {
            id: true,
          },
        },
        orders: {
          select: {
            id: true,
          },
        },
        cashTransactions: {
          select: {
            id: true,
          },
        },
        allocations: {
          select: {
            id: true,
          },
        },
      },
    });

  if (!portfolio) {
    throw new Error(
      "PORTFOLIO_NOT_FOUND",
    );
  }

  if (
    portfolio.holdings.length >
      0 ||
    portfolio.orders.length >
      0 ||
    portfolio.cashTransactions
      .length > 0 ||
    portfolio.allocations.length >
      0
  ) {
    throw new Error(
      "PORTFOLIO_NOT_EMPTY",
    );
  }

  await prisma.$transaction(
    async (tx) => {
      await createAuditLog(
        {
          firmId,
          action:
            "PORTFOLIO_DELETED",
          entityType:
            "PORTFOLIO",
          entityId:
            portfolio.id,
          message:
            "Unused portfolio permanently deleted",
          actorUserId,
        },
        tx,
      );

      await tx.riskLimit.deleteMany({
        where: {
          portfolioId:
            portfolio.id,
        },
      });

      await tx.portfolio.delete({
        where: {
          id: portfolio.id,
        },
      });
    },
  );

  return {
    id: portfolio.id,
    deleted: true,
  };
}

export async function archivePortfolioService(
  portfolioId: string,
  firmId: string,
  actorUserId?: string,
) {
  return prisma.$transaction(
    async (tx) => {
      const candidate =
        await tx.portfolio.findFirst({
          where: {
            id: portfolioId,
            client: {
              firmId,
            },
          },
          select: {
            clientId: true,
          },
        });

      if (!candidate) {
        throw new Error(
          "PORTFOLIO_NOT_FOUND",
        );
      }

      /*
       * Order creation takes a shared client lock.
       * The exclusive lock below makes portfolio
       * closure and order creation mutually atomic.
       */
      await tx.$queryRaw`
        SELECT "id"
        FROM "Client"
        WHERE "id" = ${candidate.clientId}
        FOR UPDATE
      `;

      await tx.$queryRaw`
        SELECT "id"
        FROM "Portfolio"
        WHERE "id" = ${portfolioId}
        FOR UPDATE
      `;

      const portfolio =
        await tx.portfolio.findFirst({
          where: {
            id: portfolioId,
            archivedAt: null,
            client: {
              firmId,
              archivedAt: null,
            },
          },
          include: {
            holdings: {
              where: {
                quantity: {
                  gt: 0,
                },
              },
              select: {
                id: true,
              },
            },
            orders: {
              where: {
                status: {
                  in: [
                    ...ACTIVE_ORDER_STATUSES,
                  ],
                },
              },
              select: {
                id: true,
              },
            },
            brokerCashAllocations: {
              where: {
                cashBalance: {
                  gt: 0,
                },
              },
              select: {
                id: true,
              },
            },
          },
        });

      if (!portfolio) {
        throw new Error(
          "PORTFOLIO_NOT_FOUND",
        );
      }

      if (
        portfolio.holdings.length >
        0
      ) {
        throw new Error(
          "PORTFOLIO_HAS_OPEN_POSITIONS",
        );
      }

      if (
        portfolio.orders.length >
        0
      ) {
        throw new Error(
          "PORTFOLIO_HAS_ACTIVE_ORDERS",
        );
      }

      if (
        portfolio
          .brokerCashAllocations
          .length > 0
      ) {
        throw new Error(
          "PORTFOLIO_HAS_ALLOCATED_CASH",
        );
      }

      const archivedAt =
        new Date();

      const archived =
        await tx.portfolio.update({
          where: {
            id: portfolio.id,
          },
          data: {
            archivedAt,
          },
        });

      await createAuditLog(
        {
          firmId,
          action:
            "PORTFOLIO_ARCHIVED",
          entityType:
            "PORTFOLIO",
          entityId:
            portfolio.id,
          message:
            "Portfolio archived after closure checks",
          actorUserId,
          metadata: {
            archivedAt:
              archivedAt.toISOString(),
          },
        },
        tx,
      );

      return archived;
    },
  );
}

export async function restorePortfolioService(
  portfolioId: string,
  firmId: string,
  actorUserId?: string,
) {
  return prisma.$transaction(
    async (tx) => {
      const candidate =
        await tx.portfolio.findFirst({
          where: {
            id: portfolioId,
            client: {
              firmId,
              archivedAt: null,
            },
          },
          select: {
            clientId: true,
          },
        });

      if (!candidate) {
        throw new Error(
          "PORTFOLIO_NOT_FOUND",
        );
      }

      await tx.$queryRaw`
        SELECT "id"
        FROM "Client"
        WHERE "id" = ${candidate.clientId}
        FOR UPDATE
      `;

      await tx.$queryRaw`
        SELECT "id"
        FROM "Portfolio"
        WHERE "id" = ${portfolioId}
        FOR UPDATE
      `;

      const portfolio =
        await tx.portfolio.findFirst({
          where: {
            id: portfolioId,
            archivedAt: {
              not: null,
            },
            client: {
              firmId,
              archivedAt: null,
            },
          },
        });

      if (!portfolio) {
        throw new Error(
          "PORTFOLIO_NOT_FOUND",
        );
      }

      const restored =
        await tx.portfolio.update({
          where: {
            id: portfolio.id,
          },
          data: {
            archivedAt: null,
          },
        });

      await createAuditLog(
        {
          firmId,
          action:
            "PORTFOLIO_RESTORED",
          entityType:
            "PORTFOLIO",
          entityId:
            portfolio.id,
          message:
            "Portfolio restored",
          actorUserId,
        },
        tx,
      );

      return restored;
    },
  );
}
