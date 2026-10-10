import {
  prisma,
} from "@pms-oms/db";

import {
  syncOrderService,
} from "./order-sync.service";
import {
  publishLiveUpdate,
} from "./live-update.service";
import {
  refreshBasketOrderStatus,
} from "./basket-status-refresh.service";

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
        basketOrderId: true,
        status: true,
        filledQuantity: true,
        averageFillPrice: true,
        realizedPnl: true,

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
      const firmId =
        order.portfolio
          .client
          .firmId;

      const updatedOrder =
        await syncOrderService(
          order.id,
          firmId,
        );

      const changed =
        updatedOrder.status !==
          order.status ||
        updatedOrder
          .filledQuantity !==
          order.filledQuantity ||
        Number(
          updatedOrder
            .averageFillPrice ??
          0,
        ) !==
          Number(
            order.averageFillPrice ??
            0,
          ) ||
        Number(
          updatedOrder
            .realizedPnl ??
          0,
        ) !==
          Number(
            order.realizedPnl ??
            0,
          );

      if (changed) {
        publishLiveUpdate(
          firmId,
          {
            type:
              "order.updated",
            entityType:
              "ORDER",
            entityId:
              updatedOrder.id,
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
          } catch (
            basketError
          ) {
            console.error(
              `Failed to refresh basket status for order ${order.id}:`,
              basketError,
            );
          }
        }
      }
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

let activeMonitorCycle:
  Promise<void> | null =
  null;

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

    const cycle =
      (async () => {
        try {
          await monitorActiveOrdersOnce();
        } catch (error) {
          console.error(
            "Order monitor cycle failed:",
            error,
          );
        }
      })();

    activeMonitorCycle =
      cycle;

    await cycle;

    if (
      activeMonitorCycle ===
      cycle
    ) {
      activeMonitorCycle =
        null;
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

export async function stopOrderMonitor() {
  monitorStopped = true;

  if (monitorTimer) {
    clearTimeout(
      monitorTimer,
    );

    monitorTimer = null;
  }

  await activeMonitorCycle;
}
