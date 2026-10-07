import {
  readFile,
} from "node:fs/promises";

import {
  prisma,
} from "@pms-oms/db";

export type InstrumentMasterItem = {
  symbol: string;
  exchange: string;
  instrumentToken?: string;
  name?: string;
};

const defaultInstruments:
  InstrumentMasterItem[] = [
    {
      symbol: "RELIANCE",
      exchange: "NSE",
      name:
        "Reliance Industries",
    },
    {
      symbol: "INFY",
      exchange: "NSE",
      name:
        "Infosys",
    },
    {
      symbol: "TCS",
      exchange: "NSE",
      name:
        "Tata Consultancy Services",
    },
    {
      symbol: "HDFCBANK",
      exchange: "NSE",
      name:
        "HDFC Bank",
    },
  ];

let cachedPath:
  string | null = null;

let cachedSourceItems:
  InstrumentMasterItem[] | null =
  null;

function normalizeItem(
  input: unknown,
): InstrumentMasterItem {
  if (!input || typeof input !== "object") {
    throw new Error("INVALID_INSTRUMENT_MASTER");
  }

  const item = input as Record<string, unknown>;
  if (
    typeof item.symbol !== "string" ||
    typeof item.exchange !== "string" ||
    (item.instrumentToken !== undefined && typeof item.instrumentToken !== "string") ||
    (item.name !== undefined && typeof item.name !== "string")
  ) {
    throw new Error("INVALID_INSTRUMENT_MASTER");
  }

  const symbol = item.symbol.trim().toUpperCase();
  const exchange = item.exchange.trim().toUpperCase();
  if (!symbol || !exchange) {
    throw new Error("INVALID_INSTRUMENT_MASTER");
  }

  return {
    symbol,
    exchange,
    instrumentToken: (item.instrumentToken as string | undefined)?.trim() || undefined,
    name: (item.name as string | undefined)?.trim() || undefined,
  };
}

async function getConfiguredSourceItems():
  Promise<InstrumentMasterItem[]> {
  const configuredPath =
    process.env
      .INSTRUMENT_MASTER_PATH
      ?.trim() ||
    null;

  if (
    cachedSourceItems &&
    cachedPath ===
      configuredPath
  ) {
    return cachedSourceItems;
  }

  if (!configuredPath) {
    cachedPath = null;

    cachedSourceItems =
      defaultInstruments.map(
        normalizeItem,
      );

    return cachedSourceItems;
  }

  let parsed:
    unknown;

  try {
    parsed =
      JSON.parse(
        await readFile(
          configuredPath,
          "utf8",
        ),
      );
  } catch {
    throw new Error(
      "INSTRUMENT_MASTER_UNAVAILABLE",
    );
  }

  if (
    !Array.isArray(
      parsed,
    )
  ) {
    throw new Error(
      "INVALID_INSTRUMENT_MASTER",
    );
  }

  const seen =
    new Set<string>();

  const items =
    parsed.map(
      (value) => {
        if (
          !value ||
          typeof value !==
            "object"
        ) {
          throw new Error(
            "INVALID_INSTRUMENT_MASTER",
          );
        }

        const item =
          normalizeItem(
            value as InstrumentMasterItem,
          );

        const key =
          item.exchange +
          ":" +
          item.symbol;

        if (
          seen.has(key)
        ) {
          throw new Error(
            "DUPLICATE_INSTRUMENT",
          );
        }

        seen.add(key);

        return item;
      },
    );

  cachedPath = configuredPath;
  cachedSourceItems = items;
  return items;
}

export async function getInstrumentMaster(
  database: Pick<typeof prisma, "instrument"> = prisma,
):
  Promise<InstrumentMasterItem[]> {
  const rows =
    await database.instrument.findMany({
      where: {
        isActive: true,
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

  if (
    rows.length > 0
  ) {
    return rows.map(
      (row) => ({
        symbol:
          row.symbol,

        exchange:
          row.exchange,

        instrumentToken:
          row.instrumentToken ??
          undefined,

        name:
          row.name ??
          undefined,
      }),
    );
  }

  // An initialized database remains authoritative even when every row is inactive.
  const storedCount = await database.instrument.count();
  return storedCount > 0 ? [] : getConfiguredSourceItems();
}

export async function validateInstrument(
  symbol: string,
  exchange: string,
  database: Pick<typeof prisma, "instrument"> = prisma,
) {
  const normalizedSymbol =
    symbol
      .trim()
      .toUpperCase();

  const normalizedExchange =
    exchange
      .trim()
      .toUpperCase();

  if (
    !normalizedSymbol ||
    !normalizedExchange
  ) {
    throw new Error(
      "INVALID_INSTRUMENT",
    );
  }

  const row =
    await database.instrument.findUnique({
      where: {
        symbol_exchange: {
          symbol:
            normalizedSymbol,

          exchange:
            normalizedExchange,
        },
      },
    });

  if (
    row?.isActive
  ) {
    return {
      symbol:
        row.symbol,

      exchange:
        row.exchange,

      instrumentToken:
        row.instrumentToken ??
        undefined,

      name:
        row.name ??
        undefined,
    } satisfies InstrumentMasterItem;
  }

  // Explicit deactivation must not be bypassed by permissive validation.
  if (row) {
    throw new Error("UNKNOWN_INSTRUMENT");
  }

  if (await database.instrument.count() === 0) {
    const sourceItems = await getConfiguredSourceItems();
    const configuredItem = sourceItems.find(
      (item) => item.symbol === normalizedSymbol && item.exchange === normalizedExchange,
    );
    if (configuredItem) {
      return configuredItem;
    }
  }

  const strict =
    process.env
      .INSTRUMENT_MASTER_STRICT ===
    "true";

  if (strict) {
    throw new Error(
      "UNKNOWN_INSTRUMENT",
    );
  }

  return {
    symbol:
      normalizedSymbol,

    exchange:
      normalizedExchange,
  } satisfies InstrumentMasterItem;
}

export async function upsertInstrument(
  input: InstrumentMasterItem,
  database: Pick<typeof prisma, "instrument"> = prisma,
) {
  const item =
    normalizeItem(
      input,
    );

  return database.instrument.upsert({
    where: {
      symbol_exchange: {
        symbol:
          item.symbol,

        exchange:
          item.exchange,
      },
    },

    create: {
      symbol:
        item.symbol,

      exchange:
        item.exchange,

      instrumentToken:
        item.instrumentToken ??
        null,

      name:
        item.name ??
        null,

      isActive:
        true,
    },

    update: {
      instrumentToken:
        item.instrumentToken ??
        null,

      name:
        item.name ??
        null,

      isActive:
        true,
    },
  });
}

export async function deactivateInstrument(
  id: string,
) {
  const existing =
    await prisma.instrument.findUnique({
      where: {
        id,
      },
    });

  if (!existing) {
    throw new Error(
      "INSTRUMENT_NOT_FOUND",
    );
  }

  return prisma.instrument.update({
    where: {
      id,
    },

    data: {
      isActive: false,
    },
  });
}

export async function importConfiguredInstrumentMaster(
  replace = false,
  database: Pick<typeof prisma, "$transaction"> = prisma,
) {
  // Explicit imports must read edits to the configured file at the same path.
  resetInstrumentMasterCache();
  const items =
    await getConfiguredSourceItems();

  return database.$transaction(
    async (tx) => {
      if (replace) {
        await tx.instrument.updateMany({
          data: {
            isActive: false,
          },
        });
      }

      for (
        const item of
        items
      ) {
        await tx.instrument.upsert({
          where: {
            symbol_exchange: {
              symbol:
                item.symbol,

              exchange:
                item.exchange,
            },
          },

          create: {
            symbol:
              item.symbol,

            exchange:
              item.exchange,

            instrumentToken:
              item.instrumentToken ??
              null,

            name:
              item.name ??
              null,

            isActive:
              true,
          },

          update: {
            instrumentToken:
              item.instrumentToken ??
              null,

            name:
              item.name ??
              null,

            isActive:
              true,
          },
        });
      }

      return {
        importedCount:
          items.length,

        replaced:
          replace,
      };
    },
  );
}

function resetInstrumentMasterCache() {
  cachedPath = null;
  cachedSourceItems =
    null;
}

export const resetInstrumentMasterCacheForTests = resetInstrumentMasterCache;
