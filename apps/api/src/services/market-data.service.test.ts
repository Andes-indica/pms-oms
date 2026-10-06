import {
  afterEach,
  describe,
  expect,
  test,
} from "bun:test";

import {
  getMarketPrice,
} from "./market-data.service";

const originalProvider =
  process.env
    .MARKET_DATA_PROVIDER;

const originalBaseUrl =
  process.env
    .MARKET_DATA_BASE_URL;

const originalToken =
  process.env
    .MARKET_DATA_API_TOKEN;

const originalFetch =
  globalThis.fetch;

afterEach(() => {
  if (
    originalProvider ===
    undefined
  ) {
    delete process.env
      .MARKET_DATA_PROVIDER;
  } else {
    process.env
      .MARKET_DATA_PROVIDER =
      originalProvider;
  }

  if (
    originalBaseUrl ===
    undefined
  ) {
    delete process.env
      .MARKET_DATA_BASE_URL;
  } else {
    process.env
      .MARKET_DATA_BASE_URL =
      originalBaseUrl;
  }

  if (
    originalToken ===
    undefined
  ) {
    delete process.env
      .MARKET_DATA_API_TOKEN;
  } else {
    process.env
      .MARKET_DATA_API_TOKEN =
      originalToken;
  }

  globalThis.fetch =
    originalFetch;
});

describe(
  "getMarketPrice",
  () => {
    test(
      "uses mock provider by default",
      async () => {
        delete process.env
          .MARKET_DATA_PROVIDER;

        await expect(
          getMarketPrice(
            "infy",
            "nse",
          ),
        ).resolves.toBe(1600);
      },
    );

    test(
      "reads price from configured HTTP provider",
      async () => {
        process.env
          .MARKET_DATA_PROVIDER =
          "http";

        process.env
          .MARKET_DATA_BASE_URL =
          "https://quotes.example";

        process.env
          .MARKET_DATA_API_TOKEN =
          "test-token";

        globalThis.fetch =
          (async (
            input:
              RequestInfo |
              URL,
            init?:
              RequestInit,
          ) => {
            const url =
              new URL(
                String(input),
              );

            expect(
              url.pathname,
            ).toBe("/quote");

            expect(
              url.searchParams
                .get("symbol"),
            ).toBe("INFY");

            expect(
              url.searchParams
                .get("exchange"),
            ).toBe("NSE");

            const headers =
              new Headers(
                init?.headers,
              );

            expect(
              headers.get(
                "Authorization",
              ),
            ).toBe(
              "Bearer test-token",
            );

            return new Response(
              JSON.stringify({
                price: 1625.5,
              }),
              {
                status: 200,
                headers: {
                  "Content-Type":
                    "application/json",
                },
              },
            );
          }) as typeof fetch;

        await expect(
          getMarketPrice(
            "infy",
            "nse",
          ),
        ).resolves.toBe(
          1625.5,
        );
      },
    );

    test(
      "rejects invalid HTTP provider price",
      async () => {
        process.env
          .MARKET_DATA_PROVIDER =
          "http";

        process.env
          .MARKET_DATA_BASE_URL =
          "https://quotes.example";

        globalThis.fetch =
          (async (
            _input:
              RequestInfo |
              URL,
            _init?:
              RequestInit,
          ) =>
            new Response(
              JSON.stringify({
                price: 0,
              }),
              {
                status: 200,
                headers: {
                  "Content-Type":
                    "application/json",
                },
              },
            )) as typeof fetch;

        await expect(
          getMarketPrice(
            "INFY",
            "NSE",
          ),
        ).rejects.toThrow(
          "INVALID_MARKET_PRICE",
        );
      },
    );

    test(
      "requires HTTP provider base URL",
      async () => {
        process.env
          .MARKET_DATA_PROVIDER =
          "http";

        delete process.env
          .MARKET_DATA_BASE_URL;

        await expect(
          getMarketPrice(
            "INFY",
            "NSE",
          ),
        ).rejects.toThrow(
          "MARKET_DATA_NOT_CONFIGURED",
        );
      },
    );
  },
);
