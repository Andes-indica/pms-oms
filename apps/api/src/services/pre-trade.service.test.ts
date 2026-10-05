import {
  describe,
  expect,
  test,
} from "bun:test";

import {
  runPreTradeChecks,
} from "./pre-trade.service";

function makeOrder(
  overrides: Record<string, unknown> = {},
) {
  return {
    id: "order-1",
    status: "PENDING",
    side: "SELL",
    quantity: 5,

    symbol: "INFY",
    exchange: "NSE",

    portfolioId: "portfolio-1",
    brokerAccountId: "broker-1",

    portfolio: {
      clientId: "client-1",
    },

    brokerAccount: {
      clientId: "client-1",
    },

    ...overrides,
  };
}

function fakeDatabase({
  order = makeOrder(),
  holding = {
    quantity: 10,
  },
  otherHolding = null,
}: {
  order?: any;
  holding?: any;
  otherHolding?: any;
} = {}) {
  return {
    order: {
      findFirst: async () =>
        order,
    },

    holding: {
      findUnique: async () =>
        holding,

      findFirst: async () =>
        otherHolding,
    },
  } as any;
}

describe(
  "runPreTradeChecks",
  () => {
    test(
      "accepts SELL when the exact broker and portfolio holding has enough quantity",
      async () => {
        const result =
          await runPreTradeChecks(
            "order-1",
            "firm-1",
            fakeDatabase(),
          );

        expect(result.id).toBe(
          "order-1",
        );
      },
    );

    test(
      "rejects SELL when holding quantity is insufficient",
      async () => {
        expect(
          runPreTradeChecks(
            "order-1",
            "firm-1",
            fakeDatabase({
              holding: {
                quantity: 3,
              },
            }),
          ),
        ).rejects.toThrow(
          "INSUFFICIENT_HOLDINGS",
        );
      },
    );

    test(
      "rejects SELL when no matching holding exists",
      async () => {
        expect(
          runPreTradeChecks(
            "order-1",
            "firm-1",
            fakeDatabase({
              holding: null,
              otherHolding: null,
            }),
          ),
        ).rejects.toThrow(
          "INSUFFICIENT_HOLDINGS",
        );
      },
    );

    test(
      "distinguishes a holding that belongs to another portfolio",
      async () => {
        expect(
          runPreTradeChecks(
            "order-1",
            "firm-1",
            fakeDatabase({
              holding: null,

              otherHolding: {
                quantity: 10,
                portfolioId:
                  "portfolio-2",
              },
            }),
          ),
        ).rejects.toThrow(
          "HOLDING_IN_DIFFERENT_PORTFOLIO",
        );
      },
    );

    test(
      "does not require holdings for BUY orders",
      async () => {
        const result =
          await runPreTradeChecks(
            "order-1",
            "firm-1",
            fakeDatabase({
              order: makeOrder({
                side: "BUY",
              }),

              holding: null,
            }),
          );

        expect(result.side).toBe(
          "BUY",
        );
      },
    );

    test(
      "rejects order belonging to another firm",
      async () => {
        expect(
          runPreTradeChecks(
            "order-1",
            "firm-1",
            fakeDatabase({
              order: null,
            }),
          ),
        ).rejects.toThrow(
          "ORDER_NOT_FOUND",
        );
      },
    );

    test(
      "rejects non-pending orders",
      async () => {
        expect(
          runPreTradeChecks(
            "order-1",
            "firm-1",
            fakeDatabase({
              order: makeOrder({
                status: "SUBMITTED",
              }),
            }),
          ),
        ).rejects.toThrow(
          "ORDER_NOT_PENDING",
        );
      },
    );

    test(
      "rejects broker account from another client",
      async () => {
        expect(
          runPreTradeChecks(
            "order-1",
            "firm-1",
            fakeDatabase({
              order: makeOrder({
                brokerAccount: {
                  clientId:
                    "client-2",
                },
              }),
            }),
          ),
        ).rejects.toThrow(
          "BROKER_ACCOUNT_MISMATCH",
        );
      },
    );

    test(
      "rejects non-positive quantity",
      async () => {
        expect(
          runPreTradeChecks(
            "order-1",
            "firm-1",
            fakeDatabase({
              order: makeOrder({
                quantity: 0,
              }),
            }),
          ),
        ).rejects.toThrow(
          "INVALID_QUANTITY",
        );
      },
    );
  },
);