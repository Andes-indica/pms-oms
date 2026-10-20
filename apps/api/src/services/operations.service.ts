import {
  prisma,
} from "@pms-oms/db";

import {
  getOrderExecutionWorkerStatus,
} from "./order-execution-worker.service";

const EXECUTION_JOB_STATUSES = [
  "PENDING",
  "PROCESSING",
  "COMPLETED",
  "FAILED",
] as const;

function getLockTimeoutMs() {
  const configured =
    Number(
      process.env
        .ORDER_EXECUTION_LOCK_TIMEOUT_MS,
    );

  return Number.isFinite(
    configured,
  ) && configured >= 1_000
    ? configured
    : 60_000;
}

export async function getOperationsSnapshot(
  firmId: string,
) {
  const now = new Date();
  const staleBefore =
    new Date(
      now.getTime() -
        getLockTimeoutMs(),
    );
  const uncertainBefore =
    new Date(
      now.getTime() -
        5 * 60_000,
    );
  const expiringBefore =
    new Date(
      now.getTime() +
        60 * 60_000,
    );

  const [
    groupedJobs,
    oldestPending,
    staleLeases,
    recentFailures,
    uncertainOrders,
    expiredSessions,
    expiringSessions,
  ] = await Promise.all([
    prisma.executionJob.groupBy({
      by: ["status"],
      where: {
        order: {
          portfolio: {
            client: {
              firmId,
            },
          },
        },
      },
      _count: {
        _all: true,
      },
    }),
    prisma.executionJob.findFirst({
      where: {
        status: "PENDING",
        order: {
          portfolio: {
            client: {
              firmId,
            },
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
      select: {
        createdAt: true,
      },
    }),
    prisma.executionJob.count({
      where: {
        status: "PROCESSING",
        lockedAt: {
          lte: staleBefore,
        },
        order: {
          portfolio: {
            client: {
              firmId,
            },
          },
        },
      },
    }),
    prisma.executionJob.findMany({
      where: {
        status: "FAILED",
        order: {
          portfolio: {
            client: {
              firmId,
            },
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
      take: 10,
      select: {
        id: true,
        orderId: true,
        attempts: true,
        lastError: true,
        updatedAt: true,
        order: {
          select: {
            symbol: true,
            exchange: true,
          },
        },
      },
    }),
    prisma.order.count({
      where: {
        status: "SUBMITTED",
        brokerOrderId: null,
        updatedAt: {
          lte: uncertainBefore,
        },
        portfolio: {
          client: {
            firmId,
          },
        },
      },
    }),
    prisma.brokerConnection.count({
      where: {
        brokerAccount: {
          archivedAt: null,
          client: {
            firmId,
            archivedAt: null,
          },
        },
        OR: [
          {
            status: "EXPIRED",
          },
          {
            sessionExpiresAt: {
              lte: now,
            },
          },
        ],
      },
    }),
    prisma.brokerConnection.count({
      where: {
        status: "CONNECTED",
        sessionExpiresAt: {
          gt: now,
          lte: expiringBefore,
        },
        brokerAccount: {
          archivedAt: null,
          client: {
            firmId,
            archivedAt: null,
          },
        },
      },
    }),
  ]);

  const counts =
    Object.fromEntries(
      EXECUTION_JOB_STATUSES.map(
        (status) => [
          status,
          groupedJobs.find(
            (item) =>
              item.status ===
              status,
          )?._count._all ?? 0,
        ],
      ),
    );

  return {
    generatedAt:
      now.toISOString(),
    worker:
      getOrderExecutionWorkerStatus(),
    queue: {
      counts,
      oldestPendingAgeMs:
        oldestPending
          ? Math.max(
              0,
              now.getTime() -
                oldestPending
                  .createdAt
                  .getTime(),
            )
          : null,
      staleLeases,
      recentFailures,
    },
    alerts: {
      uncertainOrders,
      expiredSessions,
      expiringSessions,
    },
  };
}
