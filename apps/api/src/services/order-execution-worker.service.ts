import {
  prisma,
} from "@pms-oms/db";

import {
  BrokerError,
} from "@pms-oms/broker";

import {
  executeOrderService,
} from "./order-execution.service";
import {
  publishLiveUpdate,
} from "./live-update.service";
import {
  refreshBasketOrderStatus,
} from "./basket-status-refresh.service";

type ClaimedJob = {
  id: string;
};

const DEFAULT_INTERVAL_MS =
  1_000;

const DEFAULT_LOCK_TIMEOUT_MS =
  60_000;

const MAX_ATTEMPTS =
  5;

const TERMINAL_EXECUTION_ERRORS =
  new Set([
    "ORDER_NOT_FOUND",
    "ORDER_NOT_PENDING",
    "BROKER_ACCOUNT_NOT_FOUND",
    "UNSUPPORTED_BROKER",
    "BROKER_NOT_CONNECTED",
    "BROKER_SESSION_EXPIRED",
    "INVALID_QUANTITY",
    "INSUFFICIENT_HOLDINGS",
    "HOLDING_IN_DIFFERENT_PORTFOLIO",
    "INSUFFICIENT_CASH",
    "INSUFFICIENT_BROKER_CASH",
    "RESTRICTED_SECURITY",
    "MAX_ORDER_QUANTITY_EXCEEDED",
    "MAX_ORDER_VALUE_EXCEEDED",
    "MAX_POSITION_QUANTITY_EXCEEDED",
    "MAX_POSITION_VALUE_EXCEEDED",
    "INVALID_ESTIMATED_PRICE",
  ]);

function isRetryableExecutionError(
  error: unknown,
): boolean {
  if (
    error instanceof BrokerError &&
    error.definitive
  ) {
    return false;
  }

  if (
    error instanceof Error &&
    TERMINAL_EXECUTION_ERRORS.has(
      error.message,
    )
  ) {
    return false;
  }

  return true;
}

export function describeExecutionError(error: unknown): string {
  if (error instanceof BrokerError) {
    return `${error.code}: ${error.brokerMessage}`;
  }

  return error instanceof Error
    ? error.message
    : "UNKNOWN_ERROR";
}

let workerTimer:
  ReturnType<
    typeof setTimeout
  > | null = null;

let workerStopped = true;

let activeWorkerCycle:
  Promise<void> | null =
  null;

function getLockTimeoutMs() {
  const configured =
    Number(
      process.env
        .ORDER_EXECUTION_LOCK_TIMEOUT_MS,
    );

  return (
    Number.isFinite(configured) &&
    configured >= 1_000
  )
    ? configured
    : DEFAULT_LOCK_TIMEOUT_MS;
}

async function recoverStaleJobs() {
  const lockTimeoutMs =
    getLockTimeoutMs();

  await prisma.$transaction(
    async (tx) => {
      await tx.$executeRaw`
        UPDATE "ExecutionJob"
        SET
          "status" = 'FAILED',
          "lockedAt" = NULL,
          "lastError" =
            COALESCE(
              "lastError",
              'WORKER_LEASE_EXPIRED'
            ),
          "updatedAt" = NOW()
        WHERE
          "status" = 'PROCESSING'
          AND "lockedAt" IS NOT NULL
          AND "lockedAt" <=
            NOW() -
            (
              ${lockTimeoutMs} *
              INTERVAL '1 millisecond'
            )
          AND "attempts" >= ${MAX_ATTEMPTS}
      `;

      await tx.$executeRaw`
        UPDATE "ExecutionJob"
        SET
          "status" = 'PENDING',
          "lockedAt" = NULL,
          "availableAt" = NOW(),
          "lastError" =
            'WORKER_LEASE_EXPIRED',
          "updatedAt" = NOW()
        WHERE
          "status" = 'PROCESSING'
          AND "lockedAt" IS NOT NULL
          AND "lockedAt" <=
            NOW() -
            (
              ${lockTimeoutMs} *
              INTERVAL '1 millisecond'
            )
          AND "attempts" < ${MAX_ATTEMPTS}
      `;
    },
  );
}

async function claimNextJob():
  Promise<ClaimedJob | null> {
  return prisma.$transaction(
    async (tx) => {
      const rows =
        await tx.$queryRaw<
          ClaimedJob[]
        >`
          WITH candidate AS (
            SELECT "id"
            FROM "ExecutionJob"
            WHERE
              "status" = 'PENDING'
              AND "availableAt" <= NOW()
            ORDER BY "createdAt" ASC
            FOR UPDATE SKIP LOCKED
            LIMIT 1
          )

          UPDATE "ExecutionJob"
          SET
            "status" = 'PROCESSING',
            "lockedAt" = NOW(),
            "attempts" =
              "attempts" + 1,
            "updatedAt" = NOW()

          WHERE "id" IN (
            SELECT "id"
            FROM candidate
          )

          RETURNING "id"
        `;

      return rows[0] ?? null;
    },
  );
}
export async function processNextExecutionJob() {
  await recoverStaleJobs();

  const claimed =
    await claimNextJob();

  if (!claimed) {
    return {
      processed: false,
    };
  }

  const job =
    await prisma.executionJob
      .findUnique({
        where: {
          id: claimed.id,
        },

        include: {
          order: {
            include: {
              portfolio: {
                include: {
                  client: true,
                },
              },
            },
          },
        },
      });

  if (!job) {
    return {
      processed: false,
    };
  }

  const firmId =
    job.order
      .portfolio
      .client
      .firmId;

  try {
    const order =
      await executeOrderService(
        job.orderId,
        firmId,
      );

    await prisma.executionJob.update({
      where: {
        id: job.id,
      },

      data: {
        status:
          "COMPLETED",

        lastError:
          null,

        lockedAt:
          null,
      },
    });

    publishLiveUpdate(
      firmId,
      {
        type: "order.updated",
        entityType: "ORDER",
        entityId: order.id,
      },
    );

    if (
      order.basketOrderId
    ) {
      try {
        const basket =
          await refreshBasketOrderStatus(
            order.basketOrderId,
            firmId,
          );

        if (basket) {
          publishLiveUpdate(
            firmId,
            {
              type:
                "basket.updated",
              entityType:
                "BASKET_ORDER",
              entityId:
                basket.id,
            },
          );
        }
      } catch (error) {
        console.error(
          `Failed to refresh basket status for order ${order.id}:`,
          error,
        );
      }
    }

    return {
      processed: true,
      succeeded: true,
      jobId: job.id,
    };
  } catch (error) {
    const message =
      describeExecutionError(error);

    const retryable =
      isRetryableExecutionError(
        error,
      ) &&
      job.attempts <
        MAX_ATTEMPTS;

    await prisma.executionJob.update({
      where: {
        id: job.id,
      },

      data: retryable
        ? {
            status:
              "PENDING",

            lastError:
              message,

            lockedAt:
              null,

            availableAt:
              new Date(
                Date.now() +
                  5_000,
              ),
          }
        : {
            status:
              "FAILED",

            lastError:
              message,

            lockedAt:
              null,
          },
    });

    publishLiveUpdate(
      firmId,
      {
        type: "order.updated",
        entityType: "ORDER",
        entityId: job.orderId,
      },
    );

    if (
      job.order.basketOrderId
    ) {
      try {
        const basket =
          await refreshBasketOrderStatus(
            job.order.basketOrderId,
            firmId,
          );

        if (basket) {
          publishLiveUpdate(
            firmId,
            {
              type:
                "basket.updated",
              entityType:
                "BASKET_ORDER",
              entityId:
                basket.id,
            },
          );
        }
      } catch (
        basketError
      ) {
        console.error(
          `Failed to refresh basket status after execution failure for order ${job.orderId}:`,
          basketError,
        );
      }
    }

    return {
      processed: true,
      succeeded: false,
      retryable,
      jobId: job.id,
      error: message,
    };
  }
}
export function startOrderExecutionWorker() {
  if (!workerStopped) {
    return;
  }

  workerStopped = false;

  const configuredInterval =
    Number(
      process.env
        .ORDER_EXECUTION_WORKER_INTERVAL_MS,
    );

  const intervalMs =
    Number.isFinite(
      configuredInterval,
    ) &&
    configuredInterval >= 250
      ? configuredInterval
      : DEFAULT_INTERVAL_MS;

  async function run() {
    if (workerStopped) {
      return;
    }

    const cycle =
      (async () => {
        try {
          /*
           * Drain available jobs before
           * sleeping again.
           */
          while (
            !workerStopped
          ) {
            const result =
              await processNextExecutionJob();

            if (
              !result.processed
            ) {
              break;
            }
          }
        } catch (error) {
          console.error(
            "Order execution worker cycle failed:",
            error,
          );
        }
      })();

    activeWorkerCycle =
      cycle;

    await cycle;

    if (
      activeWorkerCycle ===
      cycle
    ) {
      activeWorkerCycle =
        null;
    }

    if (!workerStopped) {
      workerTimer =
        setTimeout(
          run,
          intervalMs,
        );
    }
  }

  void run();
}

export async function stopOrderExecutionWorker() {
  workerStopped = true;

  if (workerTimer) {
    clearTimeout(
      workerTimer,
    );

    workerTimer = null;
  }

  await activeWorkerCycle;
}
