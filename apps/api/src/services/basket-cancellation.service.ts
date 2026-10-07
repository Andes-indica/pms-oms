import {
  prisma,
} from "@pms-oms/db";

import {
  cancelOrderService,
} from "./order-cancellation.service";

import {
  refreshBasketOrderStatus,
} from "./basket-status-refresh.service";

import {
  createAuditLog,
} from "./audit.service";

const TERMINAL_ORDER_STATUSES =
  new Set([
    "FILLED",
    "CANCELLED",
    "REJECTED",
  ]);

export async function cancelBasketOrderService(
  basketOrderId: string,
  firmId: string,
  actorUserId?: string,
) {
  const basket =
    await prisma.basketOrder.findFirst({
      where: {
        id: basketOrderId,
        firmId,
      },

      include: {
        orders: true,
      },
    });

  if (!basket) {
    throw new Error(
      "BASKET_NOT_FOUND",
    );
  }

  if (
    basket.orders.length ===
    0
  ) {
    throw new Error(
      "BASKET_HAS_NO_ORDERS",
    );
  }

  const results: Array<{
    orderId: string;
    status:
      | "CANCELLED"
      | "SKIPPED"
      | "FAILED";
    orderStatus?: string;
    error?: string;
  }> = [];

  for (
    const order of
    basket.orders
  ) {
    if (
      TERMINAL_ORDER_STATUSES.has(
        order.status,
      )
    ) {
      results.push({
        orderId:
          order.id,

        status:
          "SKIPPED",

        orderStatus:
          order.status,
      });

      continue;
    }

    try {
      const cancelled =
        await cancelOrderService(
          order.id,
          firmId,
          actorUserId,
        );

      results.push({
        orderId:
          order.id,

        status:
          "CANCELLED",

        orderStatus:
          cancelled.status,
      });
    } catch (error) {
      results.push({
        orderId:
          order.id,

        status:
          "FAILED",

        error:
          error instanceof Error
            ? error.message
            : "UNKNOWN_ERROR",
      });
    }
  }

  const refreshed =
    await refreshBasketOrderStatus(
      basket.id,
      firmId,
    );

  await createAuditLog({
    firmId,

    action:
      "BASKET_CANCELLED",

    entityType:
      "BASKET_ORDER",

    entityId:
      basket.id,

    message:
      "Basket cancellation requested",

    actorUserId,

    metadata: {
      cancelledOrders:
        results.filter(
          (result) =>
            result.status ===
            "CANCELLED",
        ).length,

      skippedOrders:
        results.filter(
          (result) =>
            result.status ===
            "SKIPPED",
        ).length,

      failedOrders:
        results.filter(
          (result) =>
            result.status ===
            "FAILED",
        ).length,

      resultingStatus:
        refreshed?.status ??
        basket.status,
    },
  });

  return {
    basket:
      refreshed ??
      basket,

    results,
  };
}
