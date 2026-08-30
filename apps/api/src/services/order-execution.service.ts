import { prisma } from "@pms-oms/db";
import { MockBroker } from "@pms-oms/broker";
import { runPreTradeChecks } from "./pre-trade.service";

const mockBroker = new MockBroker();

export async function executeOrderService(orderId: string) {
  const order = await runPreTradeChecks(orderId);

  const brokerResult = await mockBroker.placeOrder({
    symbol: order.symbol,
    exchange: order.exchange,
    side: order.side,
    orderType: order.orderType,
    quantity: order.quantity,
    limitPrice: order.limitPrice
      ? Number(order.limitPrice)
      : null,
  });

  return prisma.order.update({
    where: {
      id: order.id,
    },
    data: {
      brokerOrderId: brokerResult.brokerOrderId,
      status: brokerResult.status,
    },
  });
}