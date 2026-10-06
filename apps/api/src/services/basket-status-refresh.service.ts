import {
  prisma,
} from "@pms-oms/db";

import {
  deriveBasketStatus,
} from "./basket-status";

export async function refreshBasketOrderStatus(
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
    return null;
  }

  if (
    basket.orders.length ===
    0
  ) {
    return basket;
  }

  const status =
    deriveBasketStatus(
      basket.orders.map(
        (order) =>
          order.status,
      ),
    );

  if (
    status ===
    basket.status
  ) {
    return basket;
  }

  return prisma.basketOrder
    .update({
      where: {
        id: basket.id,
      },

      data: {
        status,
      },

      include: {
        orders: true,
      },
    });
}
