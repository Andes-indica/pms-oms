import { describe, expect, test } from "bun:test";
import { BrokerError } from "@pms-oms/broker";
import { describeExecutionError } from "./order-execution-worker.service";

describe("execution error persistence", () => {
  test("preserves a stable broker code and the broker's explanation", () => {
    expect(describeExecutionError(new BrokerError(
      "BROKER_INSUFFICIENT_FUNDS",
      "Required margin is 12,000 but only 8,000 is available",
      true,
    ))).toBe(
      "BROKER_INSUFFICIENT_FUNDS: Required margin is 12,000 but only 8,000 is available",
    );
  });

  test("keeps existing application error codes unchanged", () => {
    expect(describeExecutionError(new Error("BROKER_SESSION_EXPIRED")))
      .toBe("BROKER_SESSION_EXPIRED");
  });
});
