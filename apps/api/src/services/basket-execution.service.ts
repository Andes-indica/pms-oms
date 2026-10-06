import {
  prisma,
} from "@pms-oms/db";

import {
  createAuditLog,
} from "./audit.service";

import {
  enqueueOrderExecution,
} from "./order-execution-queue.service";

export async function executeBasketOrderService(
  basketOrderId: string,
  firmId: string,
) {
  const basket =
    await prisma.basketOrder
      .findFirst({
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
    basket.status !==
    "PENDING"
  ) {
    throw new Error(
      "BASKET_NOT_PENDING",
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
    success: boolean;
    jobId?: string;
    status?: string;
    error?: string;
  }> = [];

  for (
    const childOrder of
    basket.orders
  ) {
    try {
      const job =
        await enqueueOrderExecution(
          childOrder.id,
          firmId,
        );

      results.push({
        orderId:
          childOrder.id,

        success: true,

        jobId:
          job.id,

        status:
          job.status,
      });
    } catch (error) {
      results.push({
        orderId:
          childOrder.id,

        success: false,

        error:
          error instanceof Error
            ? error.message
            : "UNKNOWN_ERROR",
      });
    }
  }

  const successfulCount =
    results.filter(
      (result) =>
        result.success,
    ).length;

  await prisma.$transaction(
    async (tx) => {
      await createAuditLog(
        {
          firmId,

          action:
            "BASKET_SUBMITTED",

          entityType:
            "BASKET_ORDER",

          entityId:
            basket.id,

          message:
            "Basket child orders queued for execution",

          metadata: {
            totalOrders:
              results.length,

            queuedOrders:
              successfulCount,

            failedOrders:
              results.length -
              successfulCount,
          },
        },

        tx,
      );
    },
  );

  const refreshedBasket =
    await prisma.basketOrder
      .findFirst({
        where: {
          id: basket.id,
          firmId,
        },

        include: {
          orders: true,
        },
      });

  return {
    basket:
      refreshedBasket ??
      basket,

    results,
  };
}
