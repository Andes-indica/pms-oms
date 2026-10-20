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
  leaseToken: string;
};

const DEFAULT_INTERVAL_MS =
  1_000;

const DEFAULT_LOCK_TIMEOUT_MS =
  60_000;

const DEFAULT_MAX_IDLE_INTERVAL_MS =
  10_000;

const DEFAULT_RECOVERY_INTERVAL_MS =
  30_000;

const DEFAULT_CLEANUP_INTERVAL_MS =
  60 * 60 * 1_000;

const DEFAULT_DRAIN_BATCH_SIZE =
  25;

const DEFAULT_RETRY_BASE_MS =
  5_000;

const DEFAULT_RETRY_MAX_MS =
  5 * 60 * 1_000;

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
    "INSUFFICIENT_BROKER_AVAILABLE_CASH",
    "BROKER_FUNDS_UNSUPPORTED_FOR_DIRECT_EXECUTION",
    "BROKER_FUNDS_SNAPSHOT_TTL_INVALID",
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

let maintenanceTimer:
  ReturnType<
    typeof setTimeout
  > | null = null;

let activeWorkerCycle:
  Promise<void> | null =
  null;

let activeMaintenanceCycle:
  Promise<void> | null =
  null;

const workerId =
  process.env
    .ORDER_EXECUTION_WORKER_ID
    ?.trim() ||
  `${process.pid}-${crypto.randomUUID()}`;

const workerState = {
  workerId,
  running: false,
  active: false,
  startedAt:
    null as Date | null,
  lastCycleAt:
    null as Date | null,
  lastSuccessfulCycleAt:
    null as Date | null,
  lastMaintenanceAt:
    null as Date | null,
  lastError:
    null as string | null,
  lastMaintenanceError:
    null as string | null,
};

function readInteger(
  key: string,
  fallback: number,
  minimum: number,
) {
  const configured =
    Number(process.env[key]);

  return Number.isInteger(
    configured,
  ) && configured >= minimum
    ? configured
    : fallback;
}

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

export async function recoverStaleExecutionJobs() {
  const lockTimeoutMs =
    getLockTimeoutMs();

  return prisma.$transaction(
    async (tx) => {
      const failed =
        await tx.$executeRaw`
        UPDATE "ExecutionJob"
        SET
          "status" = 'FAILED',
          "lockedAt" = NULL,
          "leaseToken" = NULL,
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

      const recovered =
        await tx.$executeRaw`
        UPDATE "ExecutionJob"
        SET
          "status" = 'PENDING',
          "lockedAt" = NULL,
          "leaseToken" = NULL,
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

      return {
        failed,
        recovered,
      };
    },
  );
}

export async function cleanupExecutionJobs(
  now = new Date(),
) {
  const completedRetentionDays =
    readInteger(
      "ORDER_EXECUTION_COMPLETED_RETENTION_DAYS",
      30,
      1,
    );

  const failedRetentionDays =
    readInteger(
      "ORDER_EXECUTION_FAILED_RETENTION_DAYS",
      90,
      1,
    );

  const completedBefore =
    new Date(
      now.getTime() -
      completedRetentionDays *
        86_400_000,
    );

  const failedBefore =
    new Date(
      now.getTime() -
      failedRetentionDays *
        86_400_000,
    );

  const result =
    await prisma.executionJob.deleteMany({
      where: {
        OR: [
          {
            status: "COMPLETED",
            updatedAt: {
              lt: completedBefore,
            },
          },
          {
            status: "FAILED",
            updatedAt: {
              lt: failedBefore,
            },
          },
        ],
      },
    });

  return {
    deleted: result.count,
  };
}

async function claimNextJob():
  Promise<ClaimedJob | null> {
  const leaseToken =
    crypto.randomUUID();

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
            "leaseToken" = ${leaseToken},
            "attempts" =
              "attempts" + 1,
            "updatedAt" = NOW()

          WHERE "id" IN (
            SELECT "id"
            FROM candidate
          )

          RETURNING "id", "leaseToken"
        `;

      return rows[0] ?? null;
    },
  );
}

type ProcessExecutionJobOptions = {
  recoverStale?: boolean;
};

function startLeaseHeartbeat(
  job: ClaimedJob,
) {
  const intervalMs =
    Math.max(
      250,
      Math.floor(
        getLockTimeoutMs() / 3,
      ),
    );

  let stopped = false;
  let timer:
    ReturnType<
      typeof setTimeout
    > | null = null;
  let active:
    Promise<void> | null =
    null;

  async function pulse() {
    if (stopped) {
      return;
    }

    active =
      (async () => {
        const result =
          await prisma.executionJob
            .updateMany({
              where: {
                id: job.id,
                status:
                  "PROCESSING",
                leaseToken:
                  job.leaseToken,
              },
              data: {
                lockedAt:
                  new Date(),
              },
            });

        if (result.count === 0) {
          stopped = true;
        }
      })().catch(
        (error) => {
          console.error(
            "Execution job lease heartbeat failed:",
            error,
          );
        },
      );

    await active;
    active = null;

    if (!stopped) {
      timer = setTimeout(
        pulse,
        intervalMs,
      );
    }
  }

  timer = setTimeout(
    pulse,
    intervalMs,
  );

  return async () => {
    stopped = true;

    if (timer) {
      clearTimeout(timer);
      timer = null;
    }

    await active;
  };
}

export function calculateExecutionRetryDelayMs(
  attempts: number,
  jitter = Math.random(),
) {
  const exponential =
    DEFAULT_RETRY_BASE_MS *
    2 ** Math.max(
      0,
      attempts - 1,
    );

  const bounded =
    Math.min(
      exponential,
      DEFAULT_RETRY_MAX_MS,
    );

  const safeJitter =
    Math.min(
      1,
      Math.max(0, jitter),
    );

  return Math.round(
    bounded *
      (1 + safeJitter * 0.2),
  );
}

export async function processNextExecutionJob(
  options:
    ProcessExecutionJobOptions = {},
) {
  if (
    options.recoverStale !==
    false
  ) {
    await recoverStaleExecutionJobs();
  }

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

  const stopHeartbeat =
    startLeaseHeartbeat(
      claimed,
    );

  let executionSucceeded =
    false;

  try {
    const order =
      await executeOrderService(
        job.orderId,
        firmId,
      );

    executionSucceeded = true;

    const completed =
      await prisma.executionJob.updateMany({
      where: {
        id: job.id,
        status:
          "PROCESSING",
        leaseToken:
          claimed.leaseToken,
      },

      data: {
        status:
          "COMPLETED",

        lastError:
          null,

        lockedAt:
          null,

        leaseToken:
          null,
      },
    });

    await stopHeartbeat();

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
      leaseLost:
        completed.count === 0,
    };
  } catch (error) {
    await stopHeartbeat();

    /*
     * A database or notification failure after
     * broker execution must not be converted into
     * an execution retry. The persisted order state
     * prevents a second broker placement, while the
     * stale-lease path can repair the queue record.
     */
    if (executionSucceeded) {
      throw error;
    }

    const message =
      describeExecutionError(error);

    const retryable =
      isRetryableExecutionError(
        error,
      ) &&
      job.attempts <
        MAX_ATTEMPTS;

    const updated =
      await prisma.executionJob.updateMany({
      where: {
        id: job.id,
        status:
          "PROCESSING",
        leaseToken:
          claimed.leaseToken,
      },

      data: retryable
        ? {
            status:
              "PENDING",

            lastError:
              message,

            lockedAt:
              null,

            leaseToken:
              null,

            availableAt:
              new Date(
                Date.now() +
                  calculateExecutionRetryDelayMs(
                    job.attempts,
                  ),
              ),
          }
        : {
            status:
              "FAILED",

            lastError:
              message,

            lockedAt:
              null,

            leaseToken:
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
      leaseLost:
        updated.count === 0,
    };
  }
}

export function getOrderExecutionWorkerStatus() {
  return {
    ...workerState,
    startedAt:
      workerState.startedAt
        ?.toISOString() ?? null,
    lastCycleAt:
      workerState.lastCycleAt
        ?.toISOString() ?? null,
    lastSuccessfulCycleAt:
      workerState
        .lastSuccessfulCycleAt
        ?.toISOString() ?? null,
    lastMaintenanceAt:
      workerState
        .lastMaintenanceAt
        ?.toISOString() ?? null,
  };
}
export function startOrderExecutionWorker() {
  if (!workerStopped) {
    return;
  }

  workerStopped = false;
  workerState.running = true;
  workerState.startedAt =
    new Date();
  workerState.lastError = null;

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

  const maxIdleIntervalMs =
    Math.max(
      intervalMs,
      readInteger(
        "ORDER_EXECUTION_WORKER_MAX_INTERVAL_MS",
        DEFAULT_MAX_IDLE_INTERVAL_MS,
        intervalMs,
      ),
    );

  const batchSize =
    readInteger(
      "ORDER_EXECUTION_DRAIN_BATCH_SIZE",
      DEFAULT_DRAIN_BATCH_SIZE,
      1,
    );

  let idleIntervalMs =
    intervalMs;

  async function run() {
    if (workerStopped) {
      return;
    }

    const cycle =
      (async () => {
        workerState.active = true;
        workerState.lastCycleAt =
          new Date();

        try {
          /*
           * Drain available jobs before
           * sleeping again.
           */
          let processed = 0;

          while (
            !workerStopped &&
            processed < batchSize
          ) {
            const result =
              await processNextExecutionJob({
                recoverStale: false,
              });

            if (
              !result.processed
            ) {
              break;
            }

            processed += 1;
          }

          workerState
            .lastSuccessfulCycleAt =
            new Date();
          workerState.lastError =
            null;

          if (processed === 0) {
            idleIntervalMs =
              Math.min(
                maxIdleIntervalMs,
                Math.max(
                  intervalMs,
                  idleIntervalMs * 2,
                ),
              );
          } else {
            idleIntervalMs =
              processed >= batchSize
                ? 0
                : intervalMs;
          }
        } catch (error) {
          workerState.lastError =
            describeExecutionError(
              error,
            );

          console.error(
            "Order execution worker cycle failed:",
            error,
          );
        } finally {
          workerState.active =
            false;
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
          idleIntervalMs,
        );
    }
  }

  const recoveryIntervalMs =
    readInteger(
      "ORDER_EXECUTION_RECOVERY_INTERVAL_MS",
      DEFAULT_RECOVERY_INTERVAL_MS,
      1_000,
    );

  const cleanupIntervalMs =
    readInteger(
      "ORDER_EXECUTION_CLEANUP_INTERVAL_MS",
      DEFAULT_CLEANUP_INTERVAL_MS,
      60_000,
    );

  let lastCleanupAt = 0;

  async function maintain() {
    if (workerStopped) {
      return;
    }

    const cycle =
      (async () => {
        try {
          await recoverStaleExecutionJobs();

          if (
            Date.now() -
              lastCleanupAt >=
            cleanupIntervalMs
          ) {
            await cleanupExecutionJobs();
            lastCleanupAt =
              Date.now();
          }

          workerState
            .lastMaintenanceAt =
            new Date();
          workerState
            .lastMaintenanceError =
            null;
        } catch (error) {
          workerState
            .lastMaintenanceError =
            describeExecutionError(
              error,
            );

          console.error(
            "Order execution queue maintenance failed:",
            error,
          );
        }
      })();

    activeMaintenanceCycle =
      cycle;
    await cycle;

    if (
      activeMaintenanceCycle ===
      cycle
    ) {
      activeMaintenanceCycle =
        null;
    }

    if (!workerStopped) {
      maintenanceTimer =
        setTimeout(
          maintain,
          recoveryIntervalMs,
        );
    }
  }

  void run();
  void maintain();
}

export async function stopOrderExecutionWorker() {
  workerStopped = true;
  workerState.running = false;

  if (workerTimer) {
    clearTimeout(
      workerTimer,
    );

    workerTimer = null;
  }

  if (maintenanceTimer) {
    clearTimeout(
      maintenanceTimer,
    );
    maintenanceTimer = null;
  }

  await Promise.all([
    activeWorkerCycle,
    activeMaintenanceCycle,
  ]);
}
