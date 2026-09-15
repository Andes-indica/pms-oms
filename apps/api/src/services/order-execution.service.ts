import { prisma } from "@pms-oms/db";
import { createAuditLog } from "./audit.service";
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

const updatedOrder = await prisma.order.update({
  where: {
    id: order.id,
  },
  data: {
    brokerOrderId: brokerResult.brokerOrderId,
    status: brokerResult.status,
  },
});

await createAuditLog({
  action: "ORDER_SUBMITTED",
  entityType: "ORDER",
  entityId: updatedOrder.id,
  message: "Order submitted to broker",
  metadata: {
    brokerOrderId: brokerResult.brokerOrderId,
    status: brokerResult.status,
  },
});

return updatedOrder;
}