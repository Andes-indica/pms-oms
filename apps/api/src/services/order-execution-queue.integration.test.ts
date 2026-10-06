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
    enqueueOrderExecution,
} from "./order-execution-queue.service";

import {
    processNextExecutionJob,
} from "./order-execution-worker.service";

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

async function createPendingBuyOrder() {
    const {
        firm,
        portfolio,
        brokerAccount,
    } = await createTestAccount({
        cashBalance: 100_000,
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
                orderType: "LIMIT",

                quantity: 10,

                limitPrice: 1500,

                status: "PENDING",
            },
        });

    return {
        firm,
        portfolio,
        brokerAccount,
        order,
    };

}
async function createUnsupportedBrokerOrder() {
    const firm =
        await prisma.firm.create({
            data: {
                name:
                    "Unsupported Broker Firm",
            },
        });

    const client =
        await prisma.client.create({
            data: {
                name: "Client",

                firmId:
                    firm.id,
            },
        });

    const portfolio =
        await prisma.portfolio.create({
            data: {
                name: "Portfolio",

                clientId:
                    client.id,

                cashBalance:
                    100_000,
            },
        });

    const brokerAccount =
        await prisma.brokerAccount.create({
            data: {
                broker:
                    "UNKNOWN_BROKER",

                accountId:
                    `UNKNOWN-${crypto.randomUUID()}`,

                clientId:
                    client.id,
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

                side: "BUY",
                orderType: "LIMIT",

                quantity: 10,

                limitPrice: 1500,

                status: "PENDING",
            },
        });

    return {
        firm,
        order,
    };
}

async function createUncertainSubmissionOrder() {
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
                orderType: "LIMIT",

                quantity: 10,

                limitPrice: 1500,
                estimatedPrice: 1500,
                reservedCash: 15_000,

                status: "SUBMITTED",
            },
        });

    return {
        firm,
        order,
    };
}

describe(
    "execution queue integration",
    () => {
        test(
            "repeated enqueue creates only one execution job",
            async () => {
                const {
                    firm,
                    order,
                } =
                    await createPendingBuyOrder();

                const first =
                    await enqueueOrderExecution(
                        order.id,
                        firm.id,
                    );

                const second =
                    await enqueueOrderExecution(
                        order.id,
                        firm.id,
                    );

                expect(
                    second.id,
                ).toBe(first.id);

                expect(
                    await prisma.executionJob.count({
                        where: {
                            orderId:
                                order.id,
                        },
                    }),
                ).toBe(1);

                expect(
                    first.status,
                ).toBe("PENDING");
            },
        );
        test(
            "worker processes pending job and submits order to broker",
            async () => {
                const {
                    firm,
                    order,
                } =
                    await createPendingBuyOrder();

                const job =
                    await enqueueOrderExecution(
                        order.id,
                        firm.id,
                    );

                const result =
                    await processNextExecutionJob();

                expect(
                    result.processed,
                ).toBe(true);

                expect(
                    result.succeeded,
                ).toBe(true);

                const updatedJob =
                    await prisma.executionJob
                        .findUniqueOrThrow({
                            where: {
                                id: job.id,
                            },
                        });

                expect(
                    updatedJob.status,
                ).toBe("COMPLETED");

                expect(
                    updatedJob.attempts,
                ).toBe(1);

                expect(
                    updatedJob.lockedAt,
                ).toBeNull();

                const updatedOrder =
                    await prisma.order
                        .findUniqueOrThrow({
                            where: {
                                id:
                                    order.id,
                            },
                        });

                expect(
                    updatedOrder.status,
                ).toBe("SUBMITTED");

                expect(
                    updatedOrder.brokerOrderId,
                ).not.toBeNull();

                expect(
                    Number(
                        updatedOrder
                            .reservedCash,
                    ),
                ).toBe(15_000);
            },
        );
        test(
            "worker returns processed false when queue is empty",
            async () => {
                const result =
                    await processNextExecutionJob();

                expect(
                    result.processed,
                ).toBe(false);
            },
        );
        test(
            "concurrent workers do not process the same job twice",
            async () => {
                const {
                    firm,
                    order,
                } =
                    await createPendingBuyOrder();

                await enqueueOrderExecution(
                    order.id,
                    firm.id,
                );

                const [
                    first,
                    second,
                ] =
                    await Promise.all([
                        processNextExecutionJob(),
                        processNextExecutionJob(),
                    ]);

                const processedCount =
                    [first, second].filter(
                        (result) =>
                            result.processed,
                    ).length;

                expect(
                    processedCount,
                ).toBe(1);

                expect(
                    await prisma.executionJob.count({
                        where: {
                            orderId:
                                order.id,
                        },
                    }),
                ).toBe(1);

                const job =
                    await prisma.executionJob
                        .findUniqueOrThrow({
                            where: {
                                orderId:
                                    order.id,
                            },
                        });

                expect(
                    job.status,
                ).toBe("COMPLETED");

                expect(
                    job.attempts,
                ).toBe(1);

                const freshOrder =
                    await prisma.order
                        .findUniqueOrThrow({
                            where: {
                                id:
                                    order.id,
                            },
                        });

                expect(
                    freshOrder.brokerOrderId,
                ).not.toBeNull();
            },
        );
        test(
            "uncertain broker submission is rescheduled for retry",
            async () => {
                const {
                    firm,
                    order,
                } =
                    await createUncertainSubmissionOrder();

                const job =
                    await enqueueOrderExecution(
                        order.id,
                        firm.id,
                    );

                const before =
                    new Date();

                const result =
                    await processNextExecutionJob();

                expect(
                    result.processed,
                ).toBe(true);

                expect(
                    result.succeeded,
                ).toBe(false);

                expect(
                    result.retryable,
                ).toBe(true);

                const updatedJob =
                    await prisma.executionJob
                        .findUniqueOrThrow({
                            where: {
                                id: job.id,
                            },
                        });

                expect(
                    updatedJob.status,
                ).toBe("PENDING");

                expect(
                    updatedJob.attempts,
                ).toBe(1);

                expect(
                    updatedJob.lastError,
                ).toBe(
                    "BROKER_SUBMISSION_UNCERTAIN",
                );

                expect(
                    updatedJob.lockedAt,
                ).toBeNull();

                expect(
                    updatedJob.availableAt.getTime(),
                ).toBeGreaterThan(
                    before.getTime(),
                );
            },
        );

        test(
            "terminal execution error fails without retry",
            async () => {
                const {
                    firm,
                    order,
                } =
                    await createUnsupportedBrokerOrder();

                const job =
                    await enqueueOrderExecution(
                        order.id,
                        firm.id,
                    );

                const result =
                    await processNextExecutionJob();

                expect(
                    result.processed,
                ).toBe(true);

                expect(
                    result.succeeded,
                ).toBe(false);

                expect(
                    result.retryable,
                ).toBe(false);

                const updatedJob =
                    await prisma.executionJob
                        .findUniqueOrThrow({
                            where: {
                                id: job.id,
                            },
                        });

                expect(
                    updatedJob.status,
                ).toBe("FAILED");

                expect(
                    updatedJob.attempts,
                ).toBe(1);

                expect(
                    updatedJob.lastError,
                ).toBe(
                    "UNSUPPORTED_BROKER",
                );
            },
        );
        test(
            "fifth uncertain submission failure marks job failed",
            async () => {
                const {
                    firm,
                    order,
                } =
                    await createUncertainSubmissionOrder();

                const job =
                    await enqueueOrderExecution(
                        order.id,
                        firm.id,
                    );

                await prisma.executionJob.update({
                    where: {
                        id: job.id,
                    },

                    data: {
                        attempts: 4,
                        availableAt:
                            new Date(0),
                    },
                });

                const result =
                    await processNextExecutionJob();

                expect(
                    result.processed,
                ).toBe(true);

                expect(
                    result.succeeded,
                ).toBe(false);

                expect(
                    result.retryable,
                ).toBe(false);

                const updatedJob =
                    await prisma.executionJob
                        .findUniqueOrThrow({
                            where: {
                                id: job.id,
                            },
                        });

                expect(
                    updatedJob.status,
                ).toBe("FAILED");

                expect(
                    updatedJob.attempts,
                ).toBe(5);

                expect(
                    updatedJob.lastError,
                ).toBe(
                    "BROKER_SUBMISSION_UNCERTAIN",
                );

                expect(
                    updatedJob.lockedAt,
                ).toBeNull();
            },
        );
    },
);