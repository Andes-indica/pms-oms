import {
  describe,
  expect,
  test,
} from "bun:test";

import {
  getBasketChildRecoveryAction,
} from "./basket-child-recovery.service";

describe(
  "basket child recovery policy",
  () => {
    test("retries only a failed pending child", () => {
      expect(
        getBasketChildRecoveryAction({
          status: "PENDING",
          brokerOrderId: null,
          executionJob: {
            status: "FAILED",
          },
        }),
      ).toBe("RETRY");

      expect(
        getBasketChildRecoveryAction({
          status: "PENDING",
          brokerOrderId: null,
          executionJob: {
            status: "PENDING",
          },
        }),
      ).toBeNull();
    });

    test("reconciles an uncertain submitted child instead of retrying it", () => {
      expect(
        getBasketChildRecoveryAction({
          status: "SUBMITTED",
          brokerOrderId: null,
          executionJob: {
            status: "FAILED",
          },
        }),
      ).toBe("RECONCILE");
    });

    test("offers one replacement for a rejected child", () => {
      expect(
        getBasketChildRecoveryAction({
          status: "REJECTED",
          brokerOrderId: null,
          executionJob: {
            status: "FAILED",
          },
        }),
      ).toBe(
        "CREATE_REPLACEMENT",
      );

      expect(
        getBasketChildRecoveryAction({
          status: "REJECTED",
          brokerOrderId: null,
          executionJob: {
            status: "FAILED",
          },
          replacementBasket: {
            id: "replacement",
          },
        }),
      ).toBeNull();

      expect(
        getBasketChildRecoveryAction({
          status: "REJECTED",
          brokerOrderId:
            "broker-order",
          quantity: 2,
          filledQuantity: 2,
          executionJob: {
            status: "FAILED",
          },
        }),
      ).toBeNull();
    });
  },
);
