import { prisma } from "@pms-oms/db";
import { MockBroker } from "@pms-oms/broker";

const broker = new MockBroker();

export async function executeOrderService(orderId: string) {
  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
    include: {
      brokerAccount: true,
    },
  });

  if (!order) {
    throw new Error("ORDER_NOT_FOUND");
  }

  if (order.status !== "PENDING") {
    throw new Error("ORDER_NOT_PENDING");
  }

  const result = await broker.placeOrder({
    symbol: order.symbol,
    exchange: order.exchange,
    side: order.side,
    orderType: order.orderType,
    quantity: order.quantity,
    limitPrice: order.limitPrice
      ? Number(order.limitPrice)
      : null,
  });

  const updatedOrder = await prisma.order.update({
    where: {
      id: order.id,
    },
    data: {
      brokerOrderId: result.brokerOrderId,
      status: result.status,
    },
  });

  return updatedOrder;
}