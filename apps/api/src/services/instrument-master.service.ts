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
  item: InstrumentMasterItem,
): InstrumentMasterItem {
  const symbol =
    item.symbol
      ?.trim()
      .toUpperCase();

  const exchange =
    item.exchange
      ?.trim()
      .toUpperCase();

  if (
    !symbol ||
    !exchange
  ) {
    throw new Error(
      "INVALID_INSTRUMENT_MASTER",
    );
  }

  return {
    symbol,
    exchange,

    instrumentToken:
      item.instrumentToken
        ?.trim() ||
      undefined,

    name:
      item.name
        ?.trim() ||
      undefined,
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

  cachedPath =
    configuredPath;

  cachedSourceItems =
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

  return cachedSourceItems;
}

export async function getInstrumentMaster():
  Promise<InstrumentMasterItem[]> {
  const rows =
    await prisma.instrument.findMany({
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

  return getConfiguredSourceItems();
}

export async function validateInstrument(
  symbol: string,
  exchange: string,
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
    await prisma.instrument.findUnique({
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
) {
  const item =
    normalizeItem(
      input,
    );

  return prisma.instrument.upsert({
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
) {
  const items =
    await getConfiguredSourceItems();

  return prisma.$transaction(
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

export function resetInstrumentMasterCacheForTests() {
  cachedPath = null;
  cachedSourceItems =
    null;
}
