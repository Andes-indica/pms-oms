import {
  describe,
  expect,
  test,
} from "bun:test";

import {
  calculateExecutionRetryDelayMs,
} from "./order-execution-worker.service";

describe(
  "execution retry backoff",
  () => {
    test(
      "grows exponentially, applies bounded jitter and caps the delay",
      () => {
        expect(
          calculateExecutionRetryDelayMs(
            1,
            0,
          ),
        ).toBe(5_000);
        expect(
          calculateExecutionRetryDelayMs(
            2,
            0,
          ),
        ).toBe(10_000);
        expect(
          calculateExecutionRetryDelayMs(
            2,
            1,
          ),
        ).toBe(12_000);
        expect(
          calculateExecutionRetryDelayMs(
            20,
            0,
          ),
        ).toBe(300_000);
      },
    );
  },
);
