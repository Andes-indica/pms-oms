import {
  prisma,
} from "@pms-oms/db";

type ManualCashType =
  | "DEPOSIT"
  | "WITHDRAWAL"
  | "ADJUSTMENT";

type CashAdjustmentInput = {
  type: ManualCashType;
  amount: number;
  note?: string | null;
};

export async function listPortfolioCashTransactions(
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
      select: {
        id: true,
      },
    });

  if (!portfolio) {
    throw new Error(
      "PORTFOLIO_NOT_FOUND",
    );
  }

  return prisma.cashTransaction.findMany({
    where: {
      portfolioId,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 100,
  });
}

export async function adjustPortfolioCash(
  portfolioId: string,
  firmId: string,
  actorUserId: string,
  input: CashAdjustmentInput,
) {
  const type =
    input.type;

  if (
    type !== "DEPOSIT" &&
    type !== "WITHDRAWAL" &&
    type !== "ADJUSTMENT"
  ) {
    throw new Error(
      "INVALID_CASH_TRANSACTION_TYPE",
    );
  }

  if (
    !Number.isFinite(
      input.amount,
    ) ||
    input.amount === 0
  ) {
    throw new Error(
      "INVALID_CASH_AMOUNT",
    );
  }

  if (
    type !== "ADJUSTMENT" &&
    input.amount < 0
  ) {
    throw new Error(
      "INVALID_CASH_AMOUNT",
    );
  }

  const delta =
    type === "WITHDRAWAL"
      ? -input.amount
      : input.amount;

  return prisma.$transaction(
    async (tx) => {
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
            client: {
              firmId,
            },
          },
        });

      if (!portfolio) {
        throw new Error(
          "PORTFOLIO_NOT_FOUND",
        );
      }

      const nextBalance =
        Number(
          portfolio.cashBalance,
        ) + delta;

      if (nextBalance < 0) {
        throw new Error(
          "INSUFFICIENT_CASH",
        );
      }

      const allocations =
        await tx.portfolioBrokerCash.aggregate({
          where: {
            portfolioId:
              portfolio.id,
          },

          _sum: {
            cashBalance:
              true,
          },
        });

      const allocatedCash =
        Number(
          allocations
            ._sum
            .cashBalance ??
          0,
        );

      if (
        nextBalance +
          0.01 <
        allocatedCash
      ) {
        throw new Error(
          "CASH_BELOW_BROKER_ALLOCATIONS",
        );
      }

      const updated =
        await tx.portfolio.update({
          where: {
            id: portfolio.id,
          },
          data: {
            cashBalance: {
              increment: delta,
            },
          },
        });

      const transaction =
        await tx.cashTransaction.create({
          data: {
            portfolioId:
              portfolio.id,
            type,
            amount: delta,
            balanceAfter:
              updated.cashBalance,
            note:
              input.note
                ?.trim() ||
              null,
            actorUserId,
          },
        });

      return {
        portfolio: updated,
        transaction,
      };
    },
  );
}