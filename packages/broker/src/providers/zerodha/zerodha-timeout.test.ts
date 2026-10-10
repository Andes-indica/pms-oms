import {
  afterEach,
  describe,
  expect,
  test,
} from "bun:test";

import {
  getZerodhaHttpTimeoutMs,
} from "./zerodha-timeout";

const originalTimeout =
  process.env
    .BROKER_HTTP_TIMEOUT_MS;

afterEach(() => {
  if (
    originalTimeout ===
    undefined
  ) {
    delete process.env
      .BROKER_HTTP_TIMEOUT_MS;
  } else {
    process.env
      .BROKER_HTTP_TIMEOUT_MS =
      originalTimeout;
  }
});

describe(
  "Zerodha HTTP timeout",
  () => {
    test(
      "uses the SDK-compatible default",
      () => {
        delete process.env
          .BROKER_HTTP_TIMEOUT_MS;

        expect(
          getZerodhaHttpTimeoutMs(),
        ).toBe(7_000);
      },
    );

    test(
      "uses a valid configured timeout",
      () => {
        process.env
          .BROKER_HTTP_TIMEOUT_MS =
          "12000";

        expect(
          getZerodhaHttpTimeoutMs(),
        ).toBe(12_000);
      },
    );

    test(
      "falls back outside production for invalid values",
      () => {
        process.env
          .BROKER_HTTP_TIMEOUT_MS =
          "0";

        expect(
          getZerodhaHttpTimeoutMs(),
        ).toBe(7_000);
      },
    );
  },
);
