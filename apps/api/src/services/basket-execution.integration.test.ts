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
  mockBroker,
} from "../brokers/broker-registry";

import {
  clearTestDatabase,
  createTestAccount,
} from "../test/integration-db";

import {
  executeBasketOrderService,
} from "./basket-execution.service";

import {
  processNextExecutionJob,
} from "./order-execution-worker.service";

beforeEach(async () => {
  mockBroker.clear();

  await clearTestDatabase();
});

afterAll(async () => {
  await clearTestDatabase();

  await prisma.$disconnect();
});

describe(
  "basket execution integration",
  () => {
    test(
      "queues child orders and lets the worker submit them",
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

        const basket =
          await prisma.basketOrder
            .create({
              data: {
                firmId:
                  firm.id,

                name:
                  "Queued Basket",

                symbol:
                  "INFY",

                exchange:
                  "NSE",

                side:
                  "BUY",

                orderType:
                  "LIMIT",

                limitPrice:
                  1500,

                totalQuantity:
                  10,

                allocationMethod:
                  "FIXED_QUANTITY",
              },
            });

        const order =
          await prisma.order
            .create({
              data: {
                basketOrderId:
                  basket.id,

                portfolioId:
                  portfolio.id,

                brokerAccountId:
                  brokerAccount.id,

                symbol:
                  "INFY",

                exchange:
                  "NSE",

                side:
                  "BUY",

                orderType:
                  "LIMIT",

                quantity:
                  10,

                limitPrice:
                  1500,

                status:
                  "PENDING",
              },
            });

        const result =
          await executeBasketOrderService(
            basket.id,
            firm.id,
          );

        expect(
          result.results,
        ).toHaveLength(1);

        expect(
          result.results[0]
            ?.success,
        ).toBe(true);

        const queuedOrder =
          await prisma.order
            .findUniqueOrThrow({
              where: {
                id:
                  order.id,
              },
            });

        expect(
          queuedOrder
            .brokerOrderId,
        ).toBeNull();

        expect(
          queuedOrder.status,
        ).toBe("PENDING");

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
        ).toBe("PENDING");

        const workerResult =
          await processNextExecutionJob();

        expect(
          workerResult.processed,
        ).toBe(true);

        expect(
          workerResult.succeeded,
        ).toBe(true);

        const submittedOrder =
          await prisma.order
            .findUniqueOrThrow({
              where: {
                id:
                  order.id,
              },
            });

        expect(
          submittedOrder.status,
        ).toBe("SUBMITTED");

        expect(
          submittedOrder
            .brokerOrderId,
        ).not.toBeNull();

        const refreshedBasket =
          await prisma.basketOrder
            .findUniqueOrThrow({
              where: {
                id:
                  basket.id,
              },
            });

        expect(
          refreshedBasket.status,
        ).toBe("SUBMITTED");

        const completedJob =
          await prisma.executionJob
            .findUniqueOrThrow({
              where: {
                id:
                  job.id,
              },
            });

        expect(
          completedJob.status,
        ).toBe("COMPLETED");
      },
    );
  },
);
