import {
  prisma,
} from "@pms-oms/db";

import {
  syncOrderService,
} from "./order-sync.service";

const ACTIVE_ORDER_STATUSES = [
  "SUBMITTED",
  "OPEN",
  "PARTIALLY_FILLED",
] as const;

export async function monitorActiveOrdersOnce() {
  const orders =
    await prisma.order.findMany({
      where: {
        brokerOrderId: {
          not: null,
        },

        status: {
          in: [
            ...ACTIVE_ORDER_STATUSES,
          ],
        },
      },

      select: {
        id: true,

        portfolio: {
          select: {
            client: {
              select: {
                firmId: true,
              },
            },
          },
        },
      },

      orderBy: {
        updatedAt: "asc",
      },

      take: 100,
    });

  for (const order of orders) {
    try {
      await syncOrderService(
        order.id,
        order.portfolio
          .client
          .firmId,
      );
    } catch (error) {
      console.error(
        `Failed to automatically sync order ${order.id}:`,
        error,
      );
    }
  }

  return {
    checked:
      orders.length,
  };
}

const DEFAULT_INTERVAL_MS =
  10_000;

let monitorTimer:
  ReturnType<
    typeof setTimeout
  > | null = null;

let monitorStopped = true;

export function startOrderMonitor() {
  if (!monitorStopped) {
    return;
  }

  monitorStopped = false;

  const configuredInterval =
    Number(
      process.env
        .ORDER_MONITOR_INTERVAL_MS,
    );

  const intervalMs =
    Number.isFinite(
      configuredInterval,
    ) &&
    configuredInterval >=
      1_000
      ? configuredInterval
      : DEFAULT_INTERVAL_MS;

  async function run() {
    if (monitorStopped) {
      return;
    }

    try {
      await monitorActiveOrdersOnce();
    } catch (error) {
      console.error(
        "Order monitor cycle failed:",
        error,
      );
    }

    if (!monitorStopped) {
      monitorTimer =
        setTimeout(
          run,
          intervalMs,
        );
    }
  }

  /*
   * Start immediately.
   *
   * Recursive setTimeout means the next
   * cycle begins only after this one ends,
   * so monitor runs cannot overlap.
   */
  void run();
}

export function stopOrderMonitor() {
  monitorStopped = true;

  if (monitorTimer) {
    clearTimeout(
      monitorTimer,
    );

    monitorTimer = null;
  }
}