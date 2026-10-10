type MarketDataProvider = {
  getPrice(
    symbol: string,
    exchange: string,
  ): Promise<number>;
};

const mockPrices:
  Record<string, number> = {
    RELIANCE: 1450,
    INFY: 1600,
    TCS: 3200,
    HDFCBANK: 1700,
  };

const DEFAULT_REQUEST_TIMEOUT_MS =
  5_000;

function getRequestTimeoutMs() {
  const configured =
    Number(
      process.env
        .MARKET_DATA_REQUEST_TIMEOUT_MS,
    );

  return Number.isInteger(
    configured,
  ) && configured > 0 &&
    configured <= 60_000
    ? configured
    : DEFAULT_REQUEST_TIMEOUT_MS;
}

class MockMarketDataProvider
  implements MarketDataProvider {
  async getPrice(
    symbol: string,
    _exchange: string,
  ): Promise<number> {
    return (
      mockPrices[
        symbol
          .trim()
          .toUpperCase()
      ] ??
      1000
    );
  }
}

class HttpMarketDataProvider
  implements MarketDataProvider {
  constructor(
    private readonly baseUrl:
      string,

    private readonly token:
      string | null,
  ) {}

  async getPrice(
    symbol: string,
    exchange: string,
  ): Promise<number> {
    const url =
      new URL(
        "/quote",
        this.baseUrl,
      );

    url.searchParams.set(
      "symbol",
      symbol
        .trim()
        .toUpperCase(),
    );

    url.searchParams.set(
      "exchange",
      exchange
        .trim()
        .toUpperCase(),
    );

    const headers =
      new Headers();

    if (this.token) {
      headers.set(
        "Authorization",
        `Bearer ${this.token}`,
      );
    }

    const signal =
      AbortSignal.timeout(
        getRequestTimeoutMs(),
      );

    let response:
      Response;

    try {
      response =
        await fetch(
          url,
          {
            headers,
            signal,
          },
        );
    } catch {
      throw new Error(
        signal.aborted
          ? "MARKET_DATA_REQUEST_TIMEOUT"
          : "MARKET_DATA_REQUEST_FAILED",
      );
    }

    if (!response.ok) {
      throw new Error(
        "MARKET_DATA_REQUEST_FAILED",
      );
    }

    let body: {
      price?: unknown;
    };

    try {
      body =
        await response.json() as {
          price?: unknown;
        };
    } catch {
      throw new Error(
        "MARKET_DATA_RESPONSE_INVALID",
      );
    }

    if (
      typeof body.price !==
        "number" ||
      !Number.isFinite(
        body.price,
      ) ||
      body.price <= 0
    ) {
      throw new Error(
        "INVALID_MARKET_PRICE",
      );
    }

    return body.price;
  }
}

function resolveProvider():
  MarketDataProvider {
  const provider =
    (
      process.env
        .MARKET_DATA_PROVIDER ??
      "mock"
    )
      .trim()
      .toLowerCase();

  if (
    provider === "mock"
  ) {
    return new MockMarketDataProvider();
  }

  if (
    provider === "http"
  ) {
    const baseUrl =
      process.env
        .MARKET_DATA_BASE_URL
        ?.trim();

    if (!baseUrl) {
      throw new Error(
        "MARKET_DATA_NOT_CONFIGURED",
      );
    }

    return new HttpMarketDataProvider(
      baseUrl,
      process.env
        .MARKET_DATA_API_TOKEN
        ?.trim() ||
        null,
    );
  }

  throw new Error(
    "UNSUPPORTED_MARKET_DATA_PROVIDER",
  );
}

export async function getMarketPrice(
  symbol: string,
  exchange: string,
): Promise<number> {
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

  const price =
    await resolveProvider()
      .getPrice(
        normalizedSymbol,
        normalizedExchange,
      );

  if (
    !Number.isFinite(price) ||
    price <= 0
  ) {
    throw new Error(
      "INVALID_MARKET_PRICE",
    );
  }

  return price;
}
