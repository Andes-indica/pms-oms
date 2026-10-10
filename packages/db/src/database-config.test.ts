import {
  describe,
  expect,
  test,
} from "bun:test";

import {
  getDatabaseConfig,
} from "./database-config";

describe(
  "getDatabaseConfig",
  () => {
    test(
      "uses bounded pool defaults",
      () => {
        expect(
          getDatabaseConfig({
            DATABASE_URL:
              "postgresql://localhost/pms",
          }),
        ).toEqual({
          connectionString:
            "postgresql://localhost/pms",
          max: 10,
          connectionTimeoutMillis:
            5_000,
          idleTimeoutMillis:
            30_000,
          pipeline: true,
        });
      },
    );

    test(
      "accepts explicit pool settings",
      () => {
        expect(
          getDatabaseConfig({
            DATABASE_URL:
              "postgresql://localhost/pms",
            DATABASE_POOL_MAX:
              "4",
            DATABASE_CONNECTION_TIMEOUT_MS:
              "2000",
            DATABASE_IDLE_TIMEOUT_MS:
              "10000",
          }),
        ).toMatchObject({
          max: 4,
          connectionTimeoutMillis:
            2_000,
          idleTimeoutMillis:
            10_000,
        });
      },
    );

    test(
      "rejects an invalid explicit pool size",
      () => {
        expect(() =>
          getDatabaseConfig({
            DATABASE_URL:
              "postgresql://localhost/pms",
            DATABASE_POOL_MAX:
              "0",
          }),
        ).toThrow(
          "DATABASE_POOL_MAX_INVALID",
        );
      },
    );
  },
);
