import {
  afterEach,
  describe,
  expect,
  test,
} from "bun:test";

import {
  validateRuntimeDependencies,
} from "./runtime-readiness.service";

const originalNodeEnv =
  process.env.NODE_ENV;

const originalMasterPath =
  process.env
    .INSTRUMENT_MASTER_PATH;

afterEach(() => {
  if (
    originalNodeEnv ===
    undefined
  ) {
    delete process.env
      .NODE_ENV;
  } else {
    process.env.NODE_ENV =
      originalNodeEnv;
  }

  if (
    originalMasterPath ===
    undefined
  ) {
    delete process.env
      .INSTRUMENT_MASTER_PATH;
  } else {
    process.env
      .INSTRUMENT_MASTER_PATH =
      originalMasterPath;
  }
});

function databaseWithCounts(
  activeCount: number,
  storedCount = activeCount,
) {
  return {
    instrument: {
      count: async (
        input?: {
          where?: {
            isActive?: boolean;
          };
        },
      ) =>
        input?.where
          ?.isActive === true
          ? activeCount
          : storedCount,
      findMany:
        async () => [],
    },
  } as never;
}

describe(
  "validateRuntimeDependencies",
  () => {
    test(
      "does nothing outside production",
      async () => {
        process.env.NODE_ENV =
          "test";

        await expect(
          validateRuntimeDependencies(
            databaseWithCounts(
              0,
            ),
          ),
        ).resolves.toBeUndefined();
      },
    );

    test(
      "accepts an active database instrument master",
      async () => {
        process.env.NODE_ENV =
          "production";

        delete process.env
          .INSTRUMENT_MASTER_PATH;

        await expect(
          validateRuntimeDependencies(
            databaseWithCounts(
              5,
            ),
          ),
        ).resolves.toBeUndefined();
      },
    );

    test(
      "requires a configured source when the database is empty",
      async () => {
        process.env.NODE_ENV =
          "production";

        delete process.env
          .INSTRUMENT_MASTER_PATH;

        await expect(
          validateRuntimeDependencies(
            databaseWithCounts(
              0,
            ),
          ),
        ).rejects.toThrow(
          "PRODUCTION_INSTRUMENT_MASTER_REQUIRED",
        );
      },
    );
  },
);
