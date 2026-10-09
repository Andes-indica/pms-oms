import {
  afterEach,
  describe,
  expect,
  spyOn,
  test,
} from "bun:test";

import {
  KiteConnect,
} from "kiteconnect";

import {
  ZerodhaBroker,
} from "./zerodha-broker";

const restores:
  Array<() => void> = [];

afterEach(() => {
  for (
    const restore of
    restores.splice(0)
  ) {
    restore();
  }
});

describe(
  "ZerodhaBroker order status",
  () => {
    test(
      "preserves Zerodha's rejection explanation",
      async () => {
        const getOrders =
          spyOn(
            KiteConnect.prototype,
            "getOrders",
          ).mockResolvedValue([
            {
              order_id: "KITE-REJECTED",
              status: "REJECTED",
              quantity: 1,
              filled_quantity: 0,
              status_message:
                "Insufficient funds",
            },
          ] as never);

        restores.push(
          () =>
            getOrders.mockRestore(),
        );

        const broker =
          new ZerodhaBroker({
            apiKey: "test-api-key",
            accessToken:
              "test-access-token",
          });

        await expect(
          broker.getOrderStatus(
            "KITE-REJECTED",
          ),
        ).resolves.toEqual({
          brokerOrderId:
            "KITE-REJECTED",
          status: "REJECTED",
          filledQuantity: 0,
          averageFillPrice: null,
          statusMessage:
            "Insufficient funds",
        });
      },
    );
  },
);
