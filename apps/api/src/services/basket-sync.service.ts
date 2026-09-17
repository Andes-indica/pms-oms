import { prisma } from "@pms-oms/db";

import { syncOrderService } from "./order-sync.service";

export async function syncBasketOrderService(
  basketOrderId: string,
) {
  const basket = await prisma.basketOrder.findUnique({
    where: {
      id: basketOrderId,
    },
    include: {
      orders: true,
    },
  });

  if (!basket) {
    throw new Error("BASKET_NOT_FOUND");
  }

  const results = [];

  for (const order of basket.orders) {
    if (
      order.status === "SUBMITTED" ||
      order.status === "OPEN" ||
      order.status === "PARTIALLY_FILLED"
    ) {
      try {
        const synced =
          await syncOrderService(order.id);

        results.push({
          orderId: order.id,
          status: synced.status,
          success: true,
        });
      } catch (error) {
        results.push({
          orderId: order.id,
          success: false,
          error:
            error instanceof Error
              ? error.message
              : "UNKNOWN_ERROR",
        });
      }
    }
  }

  const refreshedOrders =
    await prisma.order.findMany({
      where: {
        basketOrderId,
      },
    });

  const filledCount =
    refreshedOrders.filter(
      (order) => order.status === "FILLED",
    ).length;

  const rejectedCount =
    refreshedOrders.filter(
      (order) => order.status === "REJECTED",
    ).length;

  let status:
    | "SUBMITTED"
    | "PARTIALLY_FILLED"
    | "FILLED"
    | "REJECTED";

  if (filledCount === refreshedOrders.length) {
    status = "FILLED";
  } else if (
    rejectedCount === refreshedOrders.length
  ) {
    status = "REJECTED";
  } else if (filledCount > 0) {
    status = "PARTIALLY_FILLED";
  } else {
    status = "SUBMITTED";
  }

  const updatedBasket =
    await prisma.basketOrder.update({
      where: {
        id: basketOrderId,
      },
      data: {
        status,
      },
      include: {
        orders: true,
      },
    });

  return {
    basket: updatedBasket,
    results,
  };
}