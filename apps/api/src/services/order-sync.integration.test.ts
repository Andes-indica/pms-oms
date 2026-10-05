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

beforeEach(async () => {
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
    },
);