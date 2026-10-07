import {
  prisma,
} from "@pms-oms/db";

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
      0
  ) {
    throw new Error(
      "PORTFOLIO_NOT_EMPTY",
    );
  }

  await prisma.riskLimit.deleteMany({
    where: {
      portfolioId:
        portfolio.id,
    },
  });

  await prisma.portfolio.delete({
    where: {
      id: portfolio.id,
    },
  });

  return {
    id: portfolio.id,
    deleted: true,
  };
}
