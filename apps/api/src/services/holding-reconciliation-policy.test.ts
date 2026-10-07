import {
  describe,
  expect,
  test,
} from "bun:test";

import {
  classifyInventoryReconciliation,
} from "./holding-reconciliation-policy";

describe(
  "holding reconciliation policy",
  () => {
    test(
      "same inventory is a match regardless of cost basis",
      () => {
        expect(
          classifyInventoryReconciliation({
            brokerPresent: true,
            pmsPresent: true,
            brokerQuantity: 10,
            pmsQuantity: 10,
          }),
        ).toBe("MATCH");
      },
    );

    test(
      "detects quantity mismatch",
      () => {
        expect(
          classifyInventoryReconciliation({
            brokerPresent: true,
            pmsPresent: true,
            brokerQuantity: 9,
            pmsQuantity: 10,
          }),
        ).toBe(
          "QUANTITY_MISMATCH",
        );
      },
    );

    test(
      "detects missing PMS holding",
      () => {
        expect(
          classifyInventoryReconciliation({
            brokerPresent: true,
            pmsPresent: false,
            brokerQuantity: 10,
            pmsQuantity: 0,
          }),
        ).toBe(
          "MISSING_IN_PMS",
        );
      },
    );

    test(
      "detects stale PMS holding",
      () => {
        expect(
          classifyInventoryReconciliation({
            brokerPresent: false,
            pmsPresent: true,
            brokerQuantity: 0,
            pmsQuantity: 10,
          }),
        ).toBe(
          "MISSING_AT_BROKER",
        );
      },
    );
  },
);
