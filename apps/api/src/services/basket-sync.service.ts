import { prisma, type OrderStatus } from "@pms-oms/db";
import { syncOrderService } from "./order-sync.service";
import { deriveBasketStatus } from "./basket-status";

export async function syncBasketOrderService(
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

  if (basket.orders.length === 0) {
    throw new Error("BASKET_HAS_NO_ORDERS");
  }

  const results: Array<{
    orderId: string;
    success: boolean;
    status?: OrderStatus;
    error?: string;
  }> = [];

  for (const order of basket.orders) {
    if (
      order.status === "SUBMITTED" ||
      order.status === "OPEN" ||
      order.status === "PARTIALLY_FILLED"
    ) {
      try {
        const synced = await syncOrderService(order.id, firmId);

        results.push({
          orderId: order.id,
          status: synced.status,
          success: true,
        });
      } catch (error) {
        results.push({
          orderId: order.id,
          success: false,
          error: error instanceof Error ? error.message : "UNKNOWN_ERROR",
        });
      }
    }
  }

  const refreshedOrders = await prisma.order.findMany({
    where: {
      basketOrderId,
      portfolio: { client: { firmId } },
    },
  });

  const status = deriveBasketStatus(
    refreshedOrders.map((order) => order.status),
  );

  const updatedBasket = await prisma.basketOrder.update({
    where: { id: basketOrderId },
    data: { status },
    include: { orders: true },
  });

  return {
    basket: updatedBasket,
    results,
  };
}
