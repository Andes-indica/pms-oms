import {
  describe,
  expect,
  test,
} from "bun:test";

import {
  runRiskChecks,
} from "./risk.service";

function makePortfolio(
  overrides: Record<string, unknown> = {},
) {
  return {
    id: "portfolio-1",

    cashBalance: 100_000,

    client: {
      firmId: "firm-1",
    },

    holdings: [
      {
        brokerAccountId:
          "broker-1",

        symbol: "INFY",
        exchange: "NSE",

        quantity: 10,

        averagePrice: 1500,
      },
    ],

    riskLimit: null,

    ...overrides,
  };
}

function fakeDatabase({
  portfolio =
    makePortfolio(),

  restrictedSecurity =
    null,

  reservedQuantity = 0,

  buyQuantity = 0,

  buyFilledQuantity = 0,

}: {
  portfolio?: any;
  restrictedSecurity?: any;
  reservedQuantity?: number;
  buyQuantity?: number;
  buyFilledQuantity?: number;
} = {}) {
  return {
    portfolio: {
      findUnique: async () =>
        portfolio,
    },

    restrictedSecurity: {
      findFirst: async () =>
        restrictedSecurity,
    },

    order: {
      aggregate: async (
        args: any,
      ) => {
        if (
          args?._sum?.quantity
        ) {
          return {
            _sum: {
              quantity:
                buyQuantity,
              filledQuantity:
                buyFilledQuantity,
            },
          };
        }

        return {
          _sum: {
            reservedQuantity,
          },
        };
      },
    },
  } as any;
}

const baseInput = {
  currentOrderId: "order-1",

  portfolioId:
    "portfolio-1",

  brokerAccountId:
    "broker-1",

  symbol: "INFY",
  exchange: "NSE",

  side: "BUY" as const,

  quantity: 5,

  estimatedPrice: 1600,
};

describe(
  "runRiskChecks",
  () => {
    test(
      "allows BUY after configured risk checks pass",
      async () => {
        const result =
          await runRiskChecks(
            baseInput,
            fakeDatabase(),
          );

        expect(result.passed).toBe(
          true,
        );

        expect(
          result.orderValue,
        ).toBe(8000);
      },
    );

    test(
      "does not use PMS cash or reservations as an order admission check",
      async () => {
        const result =
          await runRiskChecks(
            {
              ...baseInput,

              quantity: 10,

              estimatedPrice:
                1000,
            },

            fakeDatabase({
              portfolio:
                makePortfolio({
                  cashBalance: 0,
                }),
            }),
          );

        expect(result.passed).toBe(
          true,
        );
      },
    );

    test(
      "does not require a PMS broker cash allocation",
      async () => {
        const result =
          await runRiskChecks(
            {
              ...baseInput,

              quantity: 10,

              estimatedPrice:
                1000,
            },

            fakeDatabase({
              portfolio:
                makePortfolio({
                  cashBalance: 0,
                }),
            }),
          );

        expect(result.passed).toBe(
          true,
        );
      },
    );

    test(
      "rejects restricted security",
      async () => {
        expect(
          runRiskChecks(
            baseInput,

            fakeDatabase({
              restrictedSecurity: {
                symbol:
                  "INFY",
              },
            }),
          ),
        ).rejects.toThrow(
          "RESTRICTED_SECURITY",
        );
      },
    );

    test(
      "rejects missing portfolio",
      async () => {
        expect(
          runRiskChecks(
            baseInput,

            fakeDatabase({
              portfolio: null,
            }),
          ),
        ).rejects.toThrow(
          "PORTFOLIO_NOT_FOUND",
        );
      },
    );

    test(
      "enforces maximum order quantity",
      async () => {
        expect(
          runRiskChecks(
            {
              ...baseInput,

              quantity: 6,
            },

            fakeDatabase({
              portfolio:
                makePortfolio({
                  riskLimit: {
                    maxOrderQuantity:
                      5,

                    maxOrderValue:
                      null,

                    maxPositionQuantity:
                      null,

                    maxPositionValue:
                      null,
                  },
                }),
            }),
          ),
        ).rejects.toThrow(
          "MAX_ORDER_QUANTITY_EXCEEDED",
        );
      },
    );

    test(
      "enforces maximum order value",
      async () => {
        expect(
          runRiskChecks(
            baseInput,

            fakeDatabase({
              portfolio:
                makePortfolio({
                  riskLimit: {
                    maxOrderQuantity:
                      null,

                    maxOrderValue:
                      7000,

                    maxPositionQuantity:
                      null,

                    maxPositionValue:
                      null,
                  },
                }),
            }),
          ),
        ).rejects.toThrow(
          "MAX_ORDER_VALUE_EXCEEDED",
        );
      },
    );

    test(
      "allows SELL when broker-specific holding is sufficient",
      async () => {
        const result =
          await runRiskChecks(
            {
              ...baseInput,

              side: "SELL",

              quantity: 5,
            },

            fakeDatabase(),
          );

        expect(result.passed).toBe(
          true,
        );
      },
    );

    test(
      "does not use holdings from another broker for SELL",
      async () => {
        expect(
          runRiskChecks(
            {
              ...baseInput,

              side: "SELL",

              quantity: 5,
            },

            fakeDatabase({
              portfolio:
                makePortfolio({
                  holdings: [
                    {
                      brokerAccountId:
                        "broker-2",

                      symbol:
                        "INFY",

                      exchange:
                        "NSE",

                      quantity:
                        100,

                      averagePrice:
                        1500,
                    },
                  ],
                }),
            }),
          ),
        ).rejects.toThrow(
          "INSUFFICIENT_HOLDINGS",
        );
      },
    );

    test(
      "SELL reservations reduce available broker quantity",
      async () => {
        expect(
          runRiskChecks(
            {
              ...baseInput,

              side: "SELL",

              quantity: 7,
            },

            fakeDatabase({
              reservedQuantity:
                4,
            }),
          ),
        ).rejects.toThrow(
          "INSUFFICIENT_HOLDINGS",
        );
      },
    );

    test(
      "does not block broker-authoritative SELL on a stale PMS holding snapshot",
      async () => {
        const result =
          await runRiskChecks(
            {
              ...baseInput,
              side: "SELL",
              availabilityAuthority:
                "BROKER",
            },
            fakeDatabase({
              portfolio:
                makePortfolio({
                  holdings: [],
                }),
              reservedQuantity: 100,
            }),
          );

        expect(result.passed).toBe(
          true,
        );
      },
    );

    test(
      "enforces maximum projected position quantity",
      async () => {
        expect(
          runRiskChecks(
            {
              ...baseInput,

              side: "BUY",

              quantity: 5,
            },

            fakeDatabase({
              portfolio:
                makePortfolio({
                  riskLimit: {
                    maxOrderQuantity:
                      null,

                    maxOrderValue:
                      null,

                    maxPositionQuantity:
                      12,

                    maxPositionValue:
                      null,
                  },
                }),
            }),
          ),
        ).rejects.toThrow(
          "MAX_POSITION_QUANTITY_EXCEEDED",
        );
      },
    );

    test(
      "enforces maximum projected position value",
      async () => {
        expect(
          runRiskChecks(
            {
              ...baseInput,

              side: "BUY",

              quantity: 5,

              estimatedPrice:
                2000,
            },

            fakeDatabase({
              portfolio:
                makePortfolio({
                  riskLimit: {
                    maxOrderQuantity:
                      null,

                    maxOrderValue:
                      null,

                    maxPositionQuantity:
                      null,

                    maxPositionValue:
                      20_000,
                  },
                }),
            }),
          ),
        ).rejects.toThrow(
          "MAX_POSITION_VALUE_EXCEEDED",
        );
      },
    );
  },
);
