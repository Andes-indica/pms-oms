import type {
  BrokerOrderStatus,
} from "@pms-oms/broker";

import {
  mockBroker,
} from "./broker-registry";

type RehydratableOrder = {
  id: string;
  brokerOrderId: string | null;

  symbol: string;
  exchange: string;

  side: "BUY" | "SELL";
  orderType: "MARKET" | "LIMIT";

  quantity: number;

  limitPrice: unknown;

  status: string;
};

export function ensureMockBrokerOrder(
  order: RehydratableOrder,
) {
  if (!order.brokerOrderId) {
    throw new Error(
      "BROKER_ORDER_ID_MISSING",
    );
  }

  if (
    mockBroker.hasOrder(
      order.brokerOrderId,
    )
  ) {
    return;
  }

  mockBroker.restoreOrder(
    order.brokerOrderId,
    {
      clientOrderId:
        order.id,

      symbol:
        order.symbol,

      exchange:
        order.exchange,

      side:
        order.side,

      orderType:
        order.orderType,

      quantity:
        order.quantity,

      limitPrice:
        order.limitPrice
          ? Number(
              order.limitPrice,
            )
          : undefined,
    },

    order.status as BrokerOrderStatus,
  );
}