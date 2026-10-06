import {
  readFile,
} from "node:fs/promises";

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

let cachedItems:
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

export async function getInstrumentMaster():
  Promise<InstrumentMasterItem[]> {
  const configuredPath =
    process.env
      .INSTRUMENT_MASTER_PATH
      ?.trim() ||
    null;

  if (
    cachedItems &&
    cachedPath ===
      configuredPath
  ) {
    return cachedItems;
  }

  if (!configuredPath) {
    cachedPath = null;

    cachedItems =
      defaultInstruments.map(
        normalizeItem,
      );

    return cachedItems;
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
          `${item.exchange}:${item.symbol}`;

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

  cachedPath =
    configuredPath;

  cachedItems =
    items;

  return items;
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

  const instruments =
    await getInstrumentMaster();

  const match =
    instruments.find(
      (item) =>
        item.symbol ===
          normalizedSymbol &&
        item.exchange ===
          normalizedExchange,
    );

  if (match) {
    return match;
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

export function resetInstrumentMasterCacheForTests() {
  cachedPath = null;
  cachedItems = null;
}
