import { prisma } from "@pms-oms/db";

import { executeOrderService } from "./order-execution.service";
import { createAuditLog } from "./audit.service";

export async function executeBasketOrderService(
  basketOrderId: string,
  firmId: string,
) {
  const basket = await prisma.basketOrder.findFirst({
    where: {
      id: basketOrderId,
      firmId,
    },
    include: {
      orders: true,
    },
  });

  if (!basket) {
    throw new Error("BASKET_NOT_FOUND");
  }

  if (basket.status !== "PENDING") {
    throw new Error("BASKET_NOT_PENDING");
  }

  if (basket.orders.length === 0) {
    throw new Error("BASKET_HAS_NO_ORDERS");
  }

  const results: Array<{
    orderId: string;
    success: boolean;
    status?: string;
    error?: string;
  }> = [];

  for (const childOrder of basket.orders) {
    try {
      const executedOrder =
        await executeOrderService(childOrder.id, firmId);

      results.push({
        orderId: childOrder.id,
        success: true,
        status: executedOrder.status,
      });
    } catch (error) {
      results.push({
        orderId: childOrder.id,
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "UNKNOWN_ERROR",
      });
    }
  }

  const successfulCount = results.filter(
    (result) => result.success,
  ).length;

  let basketStatus:
    | "SUBMITTED"
    | "PARTIALLY_SUBMITTED"
    | "REJECTED";

  if (successfulCount === results.length) {
    basketStatus = "SUBMITTED";
  } else if (successfulCount === 0) {
    basketStatus = "REJECTED";
  } else {
    basketStatus = "PARTIALLY_SUBMITTED";
  }

  const updatedBasket = await prisma.$transaction(async (tx) => {
    const updated = await tx.basketOrder.update({
      where: {
        id: basket.id,
      },
      data: {
        status: basketStatus,
      },
      include: {
        orders: true,
      },
    });

    await createAuditLog({
      firmId,
      action: "BASKET_SUBMITTED",
      entityType: "BASKET_ORDER",
      entityId: basket.id,
      message: "Basket execution attempted",
      metadata: {
        totalOrders: results.length,
        successfulOrders: successfulCount,
        failedOrders: results.length - successfulCount,
        status: basketStatus,
      },
    }, tx);

    return updated;
  });

  return {
    basket: updatedBasket,
    results,
  };
}
