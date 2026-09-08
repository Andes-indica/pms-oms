import { prisma } from "@pms-oms/db";

import { mockBroker } from "../brokers/broker-registry";
import { runPreTradeChecks } from "./pre-trade.service";

export async function executeOrderService(orderId: string) {
  const order = await runPreTradeChecks(orderId);

  const brokerResult = await mockBroker.placeOrder({
    symbol: order.symbol,
    exchange: order.exchange,
    side: order.side,
    orderType: order.orderType,
    quantity: order.quantity,
    limitPrice:
      order.limitPrice !== null
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