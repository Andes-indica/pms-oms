import {
  afterEach,
  describe,
  expect,
  test,
} from "bun:test";

import {
  validateRuntimeConfig,
} from "./runtime-config.service";

const originalEnv = {
  NODE_ENV:
    process.env.NODE_ENV,
  JWT_SECRET:
    process.env.JWT_SECRET,
  BROKER_CREDENTIAL_ENCRYPTION_KEY:
    process.env
      .BROKER_CREDENTIAL_ENCRYPTION_KEY,
  CORS_ORIGINS:
    process.env.CORS_ORIGINS,
  MARKET_DATA_PROVIDER:
    process.env
      .MARKET_DATA_PROVIDER,
  MARKET_DATA_BASE_URL:
    process.env
      .MARKET_DATA_BASE_URL,
  INSTRUMENT_MASTER_STRICT:
    process.env
      .INSTRUMENT_MASTER_STRICT,
  MARKET_DATA_REQUEST_TIMEOUT_MS:
    process.env
      .MARKET_DATA_REQUEST_TIMEOUT_MS,
  BROKER_HTTP_TIMEOUT_MS:
    process.env
      .BROKER_HTTP_TIMEOUT_MS,
  LOGIN_RATE_LIMIT_MAX_ATTEMPTS:
    process.env
      .LOGIN_RATE_LIMIT_MAX_ATTEMPTS,
  LOGIN_RATE_LIMIT_WINDOW_MS:
    process.env
      .LOGIN_RATE_LIMIT_WINDOW_MS,
  TRUST_PROXY_HOPS:
    process.env
      .TRUST_PROXY_HOPS,
  SHUTDOWN_TIMEOUT_MS:
    process.env
      .SHUTDOWN_TIMEOUT_MS,
};

function restore(
  key:
    keyof typeof originalEnv,
) {
  const value =
    originalEnv[key];

  if (
    value === undefined
  ) {
    delete process.env[key];
  } else {
    process.env[key] =
      value;
  }
}

afterEach(() => {
  for (
    const key of
    Object.keys(
      originalEnv,
    ) as Array<
      keyof typeof originalEnv
    >
  ) {
    restore(key);
  }
});

function setValidProductionConfig() {
  process.env.NODE_ENV =
    "production";

  process.env.JWT_SECRET =
    "0123456789abcdef0123456789abcdef";

  process.env
    .BROKER_CREDENTIAL_ENCRYPTION_KEY =
    Buffer.alloc(
      32,
      7,
    ).toString(
      "base64",
    );

  process.env.CORS_ORIGINS =
    "https://app.example.com";

  process.env
    .MARKET_DATA_PROVIDER =
    "http";

  process.env
    .MARKET_DATA_BASE_URL =
    "https://quotes.example.com";

  process.env
    .INSTRUMENT_MASTER_STRICT =
    "true";
}

describe(
  "validateRuntimeConfig",
  () => {
    test(
      "does nothing outside production",
      () => {
        process.env.NODE_ENV =
          "test";

        delete process.env
          .JWT_SECRET;

        expect(
          validateRuntimeConfig,
        ).not.toThrow();
      },
    );

    test(
      "accepts valid production config",
      () => {
        setValidProductionConfig();

        expect(
          validateRuntimeConfig,
        ).not.toThrow();
      },
    );

    test(
      "rejects placeholder jwt secret",
      () => {
        setValidProductionConfig();

        process.env.JWT_SECRET =
          "change-me";

        expect(
          validateRuntimeConfig,
        ).toThrow(
          "PRODUCTION_JWT_SECRET_INVALID",
        );
      },
    );

    test(
      "rejects invalid broker encryption key",
      () => {
        setValidProductionConfig();

        process.env
          .BROKER_CREDENTIAL_ENCRYPTION_KEY =
          Buffer.alloc(
            16,
          ).toString(
            "base64",
          );

        expect(
          validateRuntimeConfig,
        ).toThrow(
          "PRODUCTION_BROKER_ENCRYPTION_KEY_INVALID",
        );
      },
    );

    test(
      "requires explicit production cors origins",
      () => {
        setValidProductionConfig();

        delete process.env
          .CORS_ORIGINS;

        expect(
          validateRuntimeConfig,
        ).toThrow(
          "PRODUCTION_CORS_ORIGINS_REQUIRED",
        );
      },
    );

    test(
      "requires exact HTTPS production origins",
      () => {
        setValidProductionConfig();

        process.env.CORS_ORIGINS =
          "http://app.example.com";

        expect(
          validateRuntimeConfig,
        ).toThrow(
          "PRODUCTION_CORS_ORIGIN_INVALID",
        );
      },
    );

    test(
      "rejects the mock market-data provider in production",
      () => {
        setValidProductionConfig();

        process.env
          .MARKET_DATA_PROVIDER =
          "mock";

        expect(
          validateRuntimeConfig,
        ).toThrow(
          "PRODUCTION_MARKET_DATA_PROVIDER_INVALID",
        );
      },
    );

    test(
      "requires a production market-data base URL",
      () => {
        setValidProductionConfig();

        delete process.env
          .MARKET_DATA_BASE_URL;

        expect(
          validateRuntimeConfig,
        ).toThrow(
          "PRODUCTION_MARKET_DATA_BASE_URL_REQUIRED",
        );
      },
    );

    test(
      "rejects an invalid production market-data base URL",
      () => {
        setValidProductionConfig();

        process.env
          .MARKET_DATA_BASE_URL =
          "not-a-url";

        expect(
          validateRuntimeConfig,
        ).toThrow(
          "PRODUCTION_MARKET_DATA_BASE_URL_INVALID",
        );
      },
    );

    test(
      "requires strict instrument validation in production",
      () => {
        setValidProductionConfig();

        process.env
          .INSTRUMENT_MASTER_STRICT =
          "false";

        expect(
          validateRuntimeConfig,
        ).toThrow(
          "PRODUCTION_INSTRUMENT_MASTER_STRICT_REQUIRED",
        );
      },
    );

    test(
      "rejects invalid production timeout settings",
      () => {
        setValidProductionConfig();

        process.env
          .BROKER_HTTP_TIMEOUT_MS =
          "0";

        expect(
          validateRuntimeConfig,
        ).toThrow(
          "PRODUCTION_BROKER_HTTP_TIMEOUT_MS_INVALID",
        );
      },
    );
  },
);
