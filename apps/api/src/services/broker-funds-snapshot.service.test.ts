import {
  afterEach,
  describe,
  expect,
  test,
} from "bun:test";

import {
  getBrokerFundsSnapshotTtlMs,
} from "./broker-funds-snapshot.service";

const originalTtl =
  process.env
    .BROKER_FUNDS_SNAPSHOT_TTL_SECONDS;

afterEach(() => {
  if (originalTtl === undefined) {
    delete process.env
      .BROKER_FUNDS_SNAPSHOT_TTL_SECONDS;
  } else {
    process.env
      .BROKER_FUNDS_SNAPSHOT_TTL_SECONDS =
      originalTtl;
  }
});

describe(
  "broker funds snapshot configuration",
  () => {
    test(
      "uses a short default freshness window",
      () => {
        delete process.env
          .BROKER_FUNDS_SNAPSHOT_TTL_SECONDS;

        expect(
          getBrokerFundsSnapshotTtlMs(),
        ).toBe(30_000);
      },
    );

    test(
      "rejects a freshness window outside the safe range",
      () => {
        process.env
          .BROKER_FUNDS_SNAPSHOT_TTL_SECONDS =
          "301";

        expect(
          getBrokerFundsSnapshotTtlMs,
        ).toThrow(
          "BROKER_FUNDS_SNAPSHOT_TTL_INVALID",
        );
      },
    );
  },
);
