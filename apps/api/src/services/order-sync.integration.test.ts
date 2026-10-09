import {
    afterAll,
    beforeEach,
    describe,
    expect,
    test,
} from "bun:test";

import {
    prisma,
} from "@pms-oms/db";

import {
    syncOrderService,
} from "./order-sync.service";

import {
    clearTestDatabase,
    createTestAccount,
} from "../test/integration-db";

import {
    mockBroker,
} from "../brokers/broker-registry";

beforeEach(async () => {
    mockBroker.clear();
    await clearTestDatabase();
});

afterAll(async () => {
    await clearTestDatabase();
    await prisma.$disconnect();
});

describe(
    "syncOrderService integration",
    () => {
        test(
            "BUY fill persists execution, holding and cash accounting",
            async () => {
                const {
                    firm,
                    portfolio,
                    brokerAccount,
                } =
                    await createTestAccount({
                        cashBalance:
                            100_000,
                    });

                const order =
                    await prisma.order.create({
                        data: {
                            portfolioId:
                                portfolio.id,

                            brokerAccountId:
                                brokerAccount.id,

                            symbol: "INFY",
                            exchange: "NSE",

                            side: "BUY",

                            orderType:
                                "LIMIT",

                            quantity: 10,

                            limitPrice: 1500,

                            estimatedPrice:
                                1500,

                            reservedCash:
                                15_000,

                            status:
                                "SUBMITTED",

                            brokerOrderId:
                                `MOCK-${crypto.randomUUID()}`,
                        },
                    });

                const result =
                    await syncOrderService(
                        order.id,
                        firm.id,
                    );

                expect(
                    result.status,
                ).toBe("FILLED");

                expect(
                    result.filledQuantity,
                ).toBe(10);

                expect(
                    Number(
                        result.averageFillPrice,
                    ),
                ).toBe(1500);

                const executions =
                    await prisma.execution.findMany({
                        where: {
                            orderId:
                                order.id,
                        },
                    });

                expect(
                    executions,
                ).toHaveLength(1);

                expect(
                    executions[0]
                        ?.quantity,
                ).toBe(10);

                expect(
                    Number(
                        executions[0]
                            ?.price,
                    ),
                ).toBe(1500);

                const holding =
                    await prisma.holding.findUnique({
                        where: {
                            portfolioId_brokerAccountId_symbol_exchange:
                            {
                                portfolioId:
                                    portfolio.id,

                                brokerAccountId:
                                    brokerAccount.id,

                                symbol:
                                    "INFY",

                                exchange:
                                    "NSE",
                            },
                        },
                    });

                expect(
                    holding?.quantity,
                ).toBe(10);

                expect(
                    Number(
                        holding
                            ?.averagePrice,
                    ),
                ).toBe(1500);

                const updatedPortfolio =
                    await prisma.portfolio.findUniqueOrThrow({
                        where: {
                            id:
                                portfolio.id,
                        },
                    });

                expect(
                    Number(
                        updatedPortfolio
                            .cashBalance,
                    ),
                ).toBe(85_000);

                expect(
                    Number(
                        result.reservedCash,
                    ),
                ).toBe(0);
            },
        );
        test(
            "repeated sync does not duplicate execution or accounting",
            async () => {
                const {
                    firm,
                    portfolio,
                    brokerAccount,
                } =
                    await createTestAccount({
                        cashBalance:
                            100_000,
                    });

                const order =
                    await prisma.order.create({
                        data: {
                            portfolioId:
                                portfolio.id,

                            brokerAccountId:
                                brokerAccount.id,

                            symbol: "INFY",
                            exchange: "NSE",

                            side: "BUY",

                            orderType:
                                "LIMIT",

                            quantity: 10,

                            limitPrice: 1500,

                            estimatedPrice:
                                1500,

                            reservedCash:
                                15_000,

                            status:
                                "SUBMITTED",

                            brokerOrderId:
                                `MOCK-${crypto.randomUUID()}`,
                        },
                    });

                await syncOrderService(
                    order.id,
                    firm.id,
                );

                await syncOrderService(
                    order.id,
                    firm.id,
                );

                const executions =
                    await prisma.execution.findMany({
                        where: {
                            orderId:
                                order.id,
                        },
                    });

                expect(
                    executions,
                ).toHaveLength(1);

                const holding =
                    await prisma.holding.findUniqueOrThrow({
                        where: {
                            portfolioId_brokerAccountId_symbol_exchange:
                            {
                                portfolioId:
                                    portfolio.id,

                                brokerAccountId:
                                    brokerAccount.id,

                                symbol:
                                    "INFY",

                                exchange:
                                    "NSE",
                            },
                        },
                    });

                expect(
                    holding.quantity,
                ).toBe(10);

                const updatedPortfolio =
                    await prisma.portfolio.findUniqueOrThrow({
                        where: {
                            id:
                                portfolio.id,
                        },
                    });

                expect(
                    Number(
                        updatedPortfolio
                            .cashBalance,
                    ),
                ).toBe(85_000);
            },
        );
        test(
            "SELL fill reduces holding, credits cash and records realized P&L",
            async () => {
                const {
                    firm,
                    portfolio,
                    brokerAccount,
                } =
                    await createTestAccount({
                        cashBalance:
                            10_000,
                    });

                await prisma.holding.create({
                    data: {
                        portfolioId:
                            portfolio.id,

                        brokerAccountId:
                            brokerAccount.id,

                        symbol: "INFY",
                        exchange: "NSE",

                        quantity: 10,

                        averagePrice:
                            1400,
                    },
                });

                const order =
                    await prisma.order.create({
                        data: {
                            portfolioId:
                                portfolio.id,

                            brokerAccountId:
                                brokerAccount.id,

                            symbol: "INFY",
                            exchange: "NSE",

                            side: "SELL",

                            orderType:
                                "LIMIT",

                            quantity: 4,

                            limitPrice: 1500,

                            estimatedPrice:
                                1500,

                            reservedQuantity:
                                4,

                            status:
                                "SUBMITTED",

                            brokerOrderId:
                                `MOCK-${crypto.randomUUID()}`,
                        },
                    });

                const result =
                    await syncOrderService(
                        order.id,
                        firm.id,
                    );

                const holding =
                    await prisma.holding.findUniqueOrThrow({
                        where: {
                            portfolioId_brokerAccountId_symbol_exchange:
                            {
                                portfolioId:
                                    portfolio.id,

                                brokerAccountId:
                                    brokerAccount.id,

                                symbol:
                                    "INFY",

                                exchange:
                                    "NSE",
                            },
                        },
                    });

                expect(
                    holding.quantity,
                ).toBe(6);

                const updatedPortfolio =
                    await prisma.portfolio.findUniqueOrThrow({
                        where: {
                            id:
                                portfolio.id,
                        },
                    });

                expect(
                    Number(
                        updatedPortfolio
                            .cashBalance,
                    ),
                ).toBe(16_000);

                expect(
                    Number(
                        result.realizedPnl,
                    ),
                ).toBe(400);

                expect(
                    result.reservedQuantity,
                ).toBe(0);
            },
        );
        test(
            "partial BUY fill applies only the filled quantity",
            async () => {
                const {
                    firm,
                    portfolio,
                    brokerAccount,
                } =
                    await createTestAccount({
                        cashBalance:
                            100_000,
                    });

                const brokerOrderId =
                    `MOCK-${crypto.randomUUID()}`;

                const order =
                    await prisma.order.create({
                        data: {
                            portfolioId:
                                portfolio.id,

                            brokerAccountId:
                                brokerAccount.id,

                            symbol: "INFY",
                            exchange: "NSE",

                            side: "BUY",
                            orderType: "LIMIT",

                            quantity: 10,
                            limitPrice: 1500,

                            estimatedPrice:
                                1500,

                            reservedCash:
                                15_000,

                            status:
                                "SUBMITTED",

                            brokerOrderId,
                        },
                    });

                /*
                 * Seed MockBroker manually so
                 * ensureMockBrokerOrder() won't
                 * replace our test state.
                 */
                mockBroker.restoreOrder(
                    brokerOrderId,
                    {
                        clientOrderId:
                            order.id,

                        symbol: "INFY",
                        exchange: "NSE",

                        side: "BUY",
                        orderType: "LIMIT",

                        quantity: 10,
                        limitPrice: 1500,
                    },
                    "SUBMITTED",
                );

                const executedAt =
                    new Date();

                mockBroker.setOrderSimulation(
                    brokerOrderId,

                    {
                        brokerOrderId,

                        status:
                            "PARTIALLY_FILLED",

                        filledQuantity: 4,

                        averageFillPrice:
                            1500,
                    },

                    [
                        {
                            brokerExecutionId:
                                `${brokerOrderId}:fill:1`,

                            brokerOrderId,

                            quantity: 4,

                            price: 1500,

                            executedAt,
                        },
                    ],
                );

                const result =
                    await syncOrderService(
                        order.id,
                        firm.id,
                    );

                expect(
                    result.status,
                ).toBe(
                    "PARTIALLY_FILLED",
                );

                expect(
                    result.filledQuantity,
                ).toBe(4);

                expect(
                    Number(
                        result.reservedCash,
                    ),
                ).toBe(9000);

                const holding =
                    await prisma.holding
                        .findUniqueOrThrow({
                            where: {
                                portfolioId_brokerAccountId_symbol_exchange:
                                {
                                    portfolioId:
                                        portfolio.id,

                                    brokerAccountId:
                                        brokerAccount.id,

                                    symbol:
                                        "INFY",

                                    exchange:
                                        "NSE",
                                },
                            },
                        });

                expect(
                    holding.quantity,
                ).toBe(4);

                const updatedPortfolio =
                    await prisma.portfolio
                        .findUniqueOrThrow({
                            where: {
                                id:
                                    portfolio.id,
                            },
                        });

                expect(
                    Number(
                        updatedPortfolio
                            .cashBalance,
                    ),
                ).toBe(94_000);

                const executions =
                    await prisma.execution.findMany({
                        where: {
                            orderId:
                                order.id,
                        },
                    });

                expect(
                    executions,
                ).toHaveLength(1);

                expect(
                    executions[0]?.quantity,
                ).toBe(4);
            },
        );
        test(
            "second partial BUY sync applies only the incremental fill",
            async () => {
                const {
                    firm,
                    portfolio,
                    brokerAccount,
                } =
                    await createTestAccount({
                        cashBalance:
                            100_000,
                    });

                const brokerOrderId =
                    `MOCK-${crypto.randomUUID()}`;

                const order =
                    await prisma.order.create({
                        data: {
                            portfolioId:
                                portfolio.id,

                            brokerAccountId:
                                brokerAccount.id,

                            symbol: "INFY",
                            exchange: "NSE",

                            side: "BUY",
                            orderType: "LIMIT",

                            quantity: 10,
                            limitPrice: 1500,

                            estimatedPrice:
                                1500,

                            reservedCash:
                                15_000,

                            status:
                                "SUBMITTED",

                            brokerOrderId,
                        },
                    });

                mockBroker.restoreOrder(
                    brokerOrderId,
                    {
                        clientOrderId:
                            order.id,

                        symbol: "INFY",
                        exchange: "NSE",

                        side: "BUY",
                        orderType: "LIMIT",

                        quantity: 10,
                        limitPrice: 1500,
                    },
                    "SUBMITTED",
                );

                const firstExecutionTime =
                    new Date();

                mockBroker.setOrderSimulation(
                    brokerOrderId,

                    {
                        brokerOrderId,
                        status:
                            "PARTIALLY_FILLED",

                        filledQuantity: 4,
                        averageFillPrice:
                            1500,
                    },

                    [
                        {
                            brokerExecutionId:
                                `${brokerOrderId}:fill:1`,

                            brokerOrderId,

                            quantity: 4,
                            price: 1500,

                            executedAt:
                                firstExecutionTime,
                        },
                    ],
                );

                await syncOrderService(
                    order.id,
                    firm.id,
                );

                /*
                 * Broker now reports cumulative 7.
                 *
                 * PMS must account only the new
                 * 3 shares.
                 */
                mockBroker.setOrderSimulation(
                    brokerOrderId,

                    {
                        brokerOrderId,

                        status:
                            "PARTIALLY_FILLED",

                        filledQuantity: 7,

                        averageFillPrice:
                            1500,
                    },

                    [
                        {
                            brokerExecutionId:
                                `${brokerOrderId}:fill:1`,

                            brokerOrderId,

                            quantity: 4,
                            price: 1500,

                            executedAt:
                                firstExecutionTime,
                        },

                        {
                            brokerExecutionId:
                                `${brokerOrderId}:fill:2`,

                            brokerOrderId,

                            quantity: 3,
                            price: 1500,

                            executedAt:
                                new Date(),
                        },
                    ],
                );

                const result =
                    await syncOrderService(
                        order.id,
                        firm.id,
                    );

                expect(
                    result.filledQuantity,
                ).toBe(7);

                const holding =
                    await prisma.holding
                        .findUniqueOrThrow({
                            where: {
                                portfolioId_brokerAccountId_symbol_exchange:
                                {
                                    portfolioId:
                                        portfolio.id,

                                    brokerAccountId:
                                        brokerAccount.id,

                                    symbol:
                                        "INFY",

                                    exchange:
                                        "NSE",
                                },
                            },
                        });

                /*
                 * Must be 7, NOT 11.
                 */
                expect(
                    holding.quantity,
                ).toBe(7);

                const updatedPortfolio =
                    await prisma.portfolio
                        .findUniqueOrThrow({
                            where: {
                                id:
                                    portfolio.id,
                            },
                        });

                /*
                 * Total accounted fill:
                 *
                 * 7 × 1500 = 10500
                 */
                expect(
                    Number(
                        updatedPortfolio
                            .cashBalance,
                    ),
                ).toBe(89_500);

                /*
                 * Remaining:
                 *
                 * 3 × 1500
                 */
                expect(
                    Number(
                        result.reservedCash,
                    ),
                ).toBe(4500);

                const executions =
                    await prisma.execution.findMany({
                        where: {
                            orderId:
                                order.id,
                        },
                    });

                expect(
                    executions,
                ).toHaveLength(2);

                expect(
                    executions.reduce(
                        (
                            total,
                            execution,
                        ) =>
                            total +
                            execution.quantity,

                        0,
                    ),
                ).toBe(7);
            },
        );
        test(
            "execution quantity mismatch does not mutate PMS state",
            async () => {
                const {
                    firm,
                    portfolio,
                    brokerAccount,
                } = await createTestAccount({
                    cashBalance: 100_000,
                });

                const brokerOrderId =
                    `MOCK-${crypto.randomUUID()}`;

                const order =
                    await prisma.order.create({
                        data: {
                            portfolioId:
                                portfolio.id,

                            brokerAccountId:
                                brokerAccount.id,

                            symbol: "INFY",
                            exchange: "NSE",

                            side: "BUY",
                            orderType: "LIMIT",

                            quantity: 10,

                            limitPrice: 1500,
                            estimatedPrice: 1500,

                            reservedCash: 15_000,

                            status: "SUBMITTED",

                            brokerOrderId,
                        },
                    });

                mockBroker.restoreOrder(
                    brokerOrderId,
                    {
                        clientOrderId:
                            order.id,

                        symbol: "INFY",
                        exchange: "NSE",

                        side: "BUY",
                        orderType: "LIMIT",

                        quantity: 10,
                        limitPrice: 1500,
                    },
                    "SUBMITTED",
                );

                mockBroker.setOrderSimulation(
                    brokerOrderId,

                    {
                        brokerOrderId,
                        status:
                            "PARTIALLY_FILLED",

                        filledQuantity: 5,
                        averageFillPrice:
                            1500,
                    },

                    [
                        {
                            brokerExecutionId:
                                `${brokerOrderId}:fill:1`,

                            brokerOrderId,

                            quantity: 4,
                            price: 1500,

                            executedAt:
                                new Date(),
                        },
                    ],
                );

                expect(
                    syncOrderService(
                        order.id,
                        firm.id,
                    ),
                ).rejects.toThrow(
                    "BROKER_EXECUTION_QUANTITY_MISMATCH",
                );

                const freshOrder =
                    await prisma.order
                        .findUniqueOrThrow({
                            where: {
                                id: order.id,
                            },
                        });

                expect(
                    freshOrder.status,
                ).toBe("SUBMITTED");

                expect(
                    freshOrder.filledQuantity,
                ).toBe(0);

                expect(
                    Number(
                        freshOrder.reservedCash,
                    ),
                ).toBe(15_000);

                expect(
                    await prisma.execution.count({
                        where: {
                            orderId:
                                order.id,
                        },
                    }),
                ).toBe(0);

                expect(
                    await prisma.holding.count({
                        where: {
                            portfolioId:
                                portfolio.id,

                            symbol: "INFY",
                        },
                    }),
                ).toBe(0);

                const freshPortfolio =
                    await prisma.portfolio
                        .findUniqueOrThrow({
                            where: {
                                id:
                                    portfolio.id,
                            },
                        });

                expect(
                    Number(
                        freshPortfolio.cashBalance,
                    ),
                ).toBe(100_000);
            },
        );
        test(
            "fill quantity greater than order quantity rolls back completely",
            async () => {
                const {
                    firm,
                    portfolio,
                    brokerAccount,
                } = await createTestAccount({
                    cashBalance: 100_000,
                });

                const brokerOrderId =
                    `MOCK-${crypto.randomUUID()}`;

                const order =
                    await prisma.order.create({
                        data: {
                            portfolioId:
                                portfolio.id,

                            brokerAccountId:
                                brokerAccount.id,

                            symbol: "INFY",
                            exchange: "NSE",

                            side: "BUY",
                            orderType: "LIMIT",

                            quantity: 10,

                            limitPrice: 1500,
                            estimatedPrice: 1500,

                            reservedCash: 15_000,

                            status: "SUBMITTED",

                            brokerOrderId,
                        },
                    });

                mockBroker.restoreOrder(
                    brokerOrderId,
                    {
                        clientOrderId:
                            order.id,

                        symbol: "INFY",
                        exchange: "NSE",

                        side: "BUY",
                        orderType: "LIMIT",

                        quantity: 10,
                        limitPrice: 1500,
                    },
                    "SUBMITTED",
                );

                /*
                 * Executions and broker update agree
                 * with each other, but both claim 11
                 * shares against a 10-share order.
                 */
                mockBroker.setOrderSimulation(
                    brokerOrderId,

                    {
                        brokerOrderId,
                        status: "FILLED",

                        filledQuantity: 11,
                        averageFillPrice:
                            1500,
                    },

                    [
                        {
                            brokerExecutionId:
                                `${brokerOrderId}:fill:1`,

                            brokerOrderId,

                            quantity: 11,
                            price: 1500,

                            executedAt:
                                new Date(),
                        },
                    ],
                );

                expect(
                    syncOrderService(
                        order.id,
                        firm.id,
                    ),
                ).rejects.toThrow(
                    "INVALID_FILL_QUANTITY",
                );

                const freshOrder =
                    await prisma.order
                        .findUniqueOrThrow({
                            where: {
                                id: order.id,
                            },
                        });

                expect(
                    freshOrder.filledQuantity,
                ).toBe(0);

                expect(
                    freshOrder.status,
                ).toBe("SUBMITTED");

                expect(
                    await prisma.execution.count({
                        where: {
                            orderId:
                                order.id,
                        },
                    }),
                ).toBe(0);

                expect(
                    await prisma.holding.count(),
                ).toBe(0);

                const freshPortfolio =
                    await prisma.portfolio
                        .findUniqueOrThrow({
                            where: {
                                id:
                                    portfolio.id,
                            },
                        });

                expect(
                    Number(
                        freshPortfolio.cashBalance,
                    ),
                ).toBe(100_000);
            },
        );
        test(
            "SELL fill with insufficient PMS holding rolls back execution and accounting",
            async () => {
                const {
                    firm,
                    portfolio,
                    brokerAccount,
                } = await createTestAccount({
                    cashBalance: 10_000,
                });

                await prisma.holding.create({
                    data: {
                        portfolioId:
                            portfolio.id,

                        brokerAccountId:
                            brokerAccount.id,

                        symbol: "INFY",
                        exchange: "NSE",

                        quantity: 2,

                        averagePrice: 1400,
                    },
                });

                const brokerOrderId =
                    `MOCK-${crypto.randomUUID()}`;

                const order =
                    await prisma.order.create({
                        data: {
                            portfolioId:
                                portfolio.id,

                            brokerAccountId:
                                brokerAccount.id,

                            symbol: "INFY",
                            exchange: "NSE",

                            side: "SELL",
                            orderType: "LIMIT",

                            quantity: 5,

                            limitPrice: 1500,
                            estimatedPrice: 1500,

                            reservedQuantity: 5,

                            status: "SUBMITTED",

                            brokerOrderId,
                        },
                    });

                mockBroker.restoreOrder(
                    brokerOrderId,
                    {
                        clientOrderId:
                            order.id,

                        symbol: "INFY",
                        exchange: "NSE",

                        side: "SELL",
                        orderType: "LIMIT",

                        quantity: 5,
                        limitPrice: 1500,
                    },
                    "SUBMITTED",
                );

                mockBroker.setOrderSimulation(
                    brokerOrderId,

                    {
                        brokerOrderId,
                        status: "FILLED",

                        filledQuantity: 5,
                        averageFillPrice:
                            1500,
                    },

                    [
                        {
                            brokerExecutionId:
                                `${brokerOrderId}:fill:1`,

                            brokerOrderId,

                            quantity: 5,
                            price: 1500,

                            executedAt:
                                new Date(),
                        },
                    ],
                );

                expect(
                    syncOrderService(
                        order.id,
                        firm.id,
                    ),
                ).rejects.toThrow(
                    "INSUFFICIENT_HOLDINGS",
                );

                /*
                 * Execution upsert happened inside
                 * the same transaction, therefore it
                 * must also have rolled back.
                 */
                expect(
                    await prisma.execution.count({
                        where: {
                            orderId:
                                order.id,
                        },
                    }),
                ).toBe(0);

                const holding =
                    await prisma.holding
                        .findUniqueOrThrow({
                            where: {
                                portfolioId_brokerAccountId_symbol_exchange:
                                {
                                    portfolioId:
                                        portfolio.id,

                                    brokerAccountId:
                                        brokerAccount.id,

                                    symbol: "INFY",
                                    exchange: "NSE",
                                },
                            },
                        });

                expect(
                    holding.quantity,
                ).toBe(2);

                const freshPortfolio =
                    await prisma.portfolio
                        .findUniqueOrThrow({
                            where: {
                                id:
                                    portfolio.id,
                            },
                        });

                expect(
                    Number(
                        freshPortfolio.cashBalance,
                    ),
                ).toBe(10_000);

                const freshOrder =
                    await prisma.order
                        .findUniqueOrThrow({
                            where: {
                                id: order.id,
                            },
                        });

                expect(
                    freshOrder.status,
                ).toBe("SUBMITTED");

                expect(
                    freshOrder.filledQuantity,
                ).toBe(0);

                expect(
                    freshOrder.reservedQuantity,
                ).toBe(5);
            },
        );
        test(
            "repeating the same partial fill does not duplicate execution or accounting",
            async () => {
                const {
                    firm,
                    portfolio,
                    brokerAccount,
                } = await createTestAccount({
                    cashBalance: 100_000,
                });

                const brokerOrderId =
                    `MOCK-${crypto.randomUUID()}`;

                const order =
                    await prisma.order.create({
                        data: {
                            portfolioId:
                                portfolio.id,

                            brokerAccountId:
                                brokerAccount.id,

                            symbol: "INFY",
                            exchange: "NSE",

                            side: "BUY",
                            orderType: "LIMIT",

                            quantity: 10,

                            limitPrice: 1500,
                            estimatedPrice: 1500,

                            reservedCash: 15_000,

                            status: "SUBMITTED",

                            brokerOrderId,
                        },
                    });

                mockBroker.restoreOrder(
                    brokerOrderId,
                    {
                        clientOrderId:
                            order.id,

                        symbol: "INFY",
                        exchange: "NSE",

                        side: "BUY",
                        orderType: "LIMIT",

                        quantity: 10,
                        limitPrice: 1500,
                    },
                    "SUBMITTED",
                );

                const executedAt =
                    new Date();

                mockBroker.setOrderSimulation(
                    brokerOrderId,

                    {
                        brokerOrderId,

                        status:
                            "PARTIALLY_FILLED",

                        filledQuantity: 4,

                        averageFillPrice:
                            1500,
                    },

                    [
                        {
                            brokerExecutionId:
                                `${brokerOrderId}:fill:1`,

                            brokerOrderId,

                            quantity: 4,
                            price: 1500,

                            executedAt,
                        },
                    ],
                );

                await syncOrderService(
                    order.id,
                    firm.id,
                );

                /*
                 * Same exact broker snapshot again.
                 */
                await syncOrderService(
                    order.id,
                    firm.id,
                );

                expect(
                    await prisma.execution.count({
                        where: {
                            orderId:
                                order.id,
                        },
                    }),
                ).toBe(1);

                const holding =
                    await prisma.holding
                        .findUniqueOrThrow({
                            where: {
                                portfolioId_brokerAccountId_symbol_exchange:
                                {
                                    portfolioId:
                                        portfolio.id,

                                    brokerAccountId:
                                        brokerAccount.id,

                                    symbol: "INFY",
                                    exchange: "NSE",
                                },
                            },
                        });

                expect(
                    holding.quantity,
                ).toBe(4);

                const freshPortfolio =
                    await prisma.portfolio
                        .findUniqueOrThrow({
                            where: {
                                id:
                                    portfolio.id,
                            },
                        });

                expect(
                    Number(
                        freshPortfolio.cashBalance,
                    ),
                ).toBe(94_000);

                const freshOrder =
                    await prisma.order
                        .findUniqueOrThrow({
                            where: {
                                id: order.id,
                            },
                        });

                expect(
                    freshOrder.filledQuantity,
                ).toBe(4);

                expect(
                    Number(
                        freshOrder.reservedCash,
                    ),
                ).toBe(9000);
            },
        );

        test(
            "persists the broker explanation when an accepted order is later rejected",
            async () => {
                const {
                    firm,
                    portfolio,
                    brokerAccount,
                } =
                    await createTestAccount({
                        cashBalance:
                            100_000,
                    });

                const brokerOrderId =
                    `MOCK-${crypto.randomUUID()}`;

                const order =
                    await prisma.order.create({
                        data: {
                            portfolioId:
                                portfolio.id,
                            brokerAccountId:
                                brokerAccount.id,
                            symbol: "INFY",
                            exchange: "NSE",
                            side: "BUY",
                            orderType: "LIMIT",
                            quantity: 10,
                            limitPrice: 1500,
                            estimatedPrice: 1500,
                            reservedCash: 15_000,
                            status: "SUBMITTED",
                            brokerOrderId,
                            executionJob: {
                                create: {
                                    status:
                                        "COMPLETED",
                                },
                            },
                        },
                    });

                mockBroker.restoreOrder(
                    brokerOrderId,
                    {
                        clientOrderId:
                            order.id,
                        symbol: "INFY",
                        exchange: "NSE",
                        side: "BUY",
                        orderType: "LIMIT",
                        quantity: 10,
                        limitPrice: 1500,
                    },
                    "SUBMITTED",
                );

                mockBroker.setOrderSimulation(
                    brokerOrderId,
                    {
                        brokerOrderId,
                        status: "REJECTED",
                        filledQuantity: 0,
                        averageFillPrice: null,
                        statusMessage:
                            "Exchange rejected the price outside the permitted range",
                    },
                    [],
                );

                const result =
                    await syncOrderService(
                        order.id,
                        firm.id,
                    );

                expect(result.status)
                    .toBe("REJECTED");
                expect(Number(result.reservedCash))
                    .toBe(0);

                const job =
                    await prisma.executionJob
                        .findUniqueOrThrow({
                            where: {
                                orderId:
                                    order.id,
                            },
                        });

                expect(job.status)
                    .toBe("COMPLETED");
                expect(job.lastError)
                    .toBe(
                        "BROKER_ORDER_REJECTED: Exchange rejected the price outside the permitted range",
                    );

                const audit =
                    await prisma.auditLog
                        .findFirstOrThrow({
                            where: {
                                entityId:
                                    order.id,
                                action:
                                    "ORDER_REJECTED",
                            },
                            orderBy: {
                                createdAt:
                                    "desc",
                            },
                        });

                expect(audit.metadata)
                    .toMatchObject({
                        rejectionReason:
                            "Exchange rejected the price outside the permitted range",
                    });
            },
        );
    },
);
