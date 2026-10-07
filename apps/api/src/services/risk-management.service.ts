import {
  prisma,
} from "@pms-oms/db";

type RiskLimitInput = {
  maxOrderQuantity?: number | null;
  maxOrderValue?: number | null;
  maxPositionQuantity?: number | null;
  maxPositionValue?: number | null;
};

type RestrictedSecurityInput = {
  symbol: string;
  exchange: string;
  reason?: string | null;
};

function validateOptionalNumber(
  value: number | null | undefined,
  name: string,
) {
  if (
    value !== null &&
    value !== undefined &&
    (
      !Number.isFinite(value) ||
      value <= 0
    )
  ) {
    throw new Error(
      "INVALID_" + name,
    );
  }
}

export async function setPortfolioRiskLimit(
  portfolioId: string,
  firmId: string,
  input: RiskLimitInput,
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

  validateOptionalNumber(
    input.maxOrderQuantity,
    "MAX_ORDER_QUANTITY",
  );

  validateOptionalNumber(
    input.maxOrderValue,
    "MAX_ORDER_VALUE",
  );

  validateOptionalNumber(
    input.maxPositionQuantity,
    "MAX_POSITION_QUANTITY",
  );

  validateOptionalNumber(
    input.maxPositionValue,
    "MAX_POSITION_VALUE",
  );

  return prisma.riskLimit.upsert({
    where: {
      portfolioId,
    },
    create: {
      portfolioId,
      maxOrderQuantity:
        input.maxOrderQuantity ??
        null,
      maxOrderValue:
        input.maxOrderValue ??
        null,
      maxPositionQuantity:
        input.maxPositionQuantity ??
        null,
      maxPositionValue:
        input.maxPositionValue ??
        null,
    },
    update: {
      maxOrderQuantity:
        input.maxOrderQuantity ??
        null,
      maxOrderValue:
        input.maxOrderValue ??
        null,
      maxPositionQuantity:
        input.maxPositionQuantity ??
        null,
      maxPositionValue:
        input.maxPositionValue ??
        null,
    },
  });
}

export async function clearPortfolioRiskLimit(
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

  await prisma.riskLimit.deleteMany({
    where: {
      portfolioId,
    },
  });

  return {
    portfolioId,
    cleared: true,
  };
}

export async function listRestrictedSecurities(
  firmId: string,
) {
  return prisma.restrictedSecurity.findMany({
    where: {
      OR: [
        {
          firmId,
        },
        {
          firmId: null,
        },
      ],
    },
    orderBy: [
      {
        exchange: "asc",
      },
      {
        symbol: "asc",
      },
    ],
  });
}

export async function addRestrictedSecurity(
  firmId: string,
  input: RestrictedSecurityInput,
) {
  const symbol =
    input.symbol
      ?.trim()
      .toUpperCase();

  const exchange =
    input.exchange
      ?.trim()
      .toUpperCase();

  if (
    !symbol ||
    !exchange
  ) {
    throw new Error(
      "INVALID_RESTRICTED_SECURITY",
    );
  }

  const existing =
    await prisma.restrictedSecurity.findFirst({
      where: {
        firmId,
        symbol,
        exchange,
      },
    });

  if (existing) {
    return existing;
  }

  return prisma.restrictedSecurity.create({
    data: {
      firmId,
      symbol,
      exchange,
      reason:
        input.reason
          ?.trim() ||
        null,
    },
  });
}

export async function removeRestrictedSecurity(
  id: string,
  firmId: string,
) {
  const item =
    await prisma.restrictedSecurity.findFirst({
      where: {
        id,
        firmId,
      },
      select: {
        id: true,
      },
    });

  if (!item) {
    throw new Error(
      "RESTRICTED_SECURITY_NOT_FOUND",
    );
  }

  await prisma.restrictedSecurity.delete({
    where: {
      id: item.id,
    },
  });

  return {
    id: item.id,
    deleted: true,
  };
}