import {
  prisma,
} from "@pms-oms/db";

import {
  executeOrderService,
} from "./order-execution.service";

type ClaimedJob = {
  id: string;
};

const DEFAULT_INTERVAL_MS =
  1_000;

const MAX_ATTEMPTS =
  5;

let workerTimer:
  ReturnType<
    typeof setTimeout
  > | null = null;

let workerStopped = true;

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

    return {
      processed: true,
      succeeded: true,
      jobId: job.id,
    };
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "UNKNOWN_ERROR";

    const retryable =
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

export function stopOrderExecutionWorker() {
  workerStopped = true;

  if (workerTimer) {
    clearTimeout(
      workerTimer,
    );

    workerTimer = null;
  }
}