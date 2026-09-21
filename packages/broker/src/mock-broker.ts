import type { BrokerAdapter } from "./broker.interface";

import type {
  BrokerOrderRequest,
  BrokerOrderResult,
  BrokerOrderUpdate,
  BrokerCancellationResult,
  BrokerOrderStatus,
  BrokerOrderModification
} from "./types";

type StoredMockOrder = {
  request: BrokerOrderRequest;
  status: BrokerOrderStatus;
};

export class MockBroker implements BrokerAdapter {
  private orders = new Map<string, StoredMockOrder>();
  private brokerOrderIdsByClientOrderId = new Map<string, string>();

  hasOrder(brokerOrderId: string): boolean {
    return this.orders.has(
      brokerOrderId,
    );
  }
  restoreOrder(
    brokerOrderId:string,
    request:BrokerOrderRequest,
    status:BrokerOrderStatus="SUBMITTED",
  ){
    this.orders.set(
      brokerOrderId,{
        request,
        status,
      }
    );
    this.brokerOrderIdsByClientOrderId.set(
      request.clientOrderId,brokerOrderId,
    );
  }

  async placeOrder(
    order: BrokerOrderRequest,
  ): Promise<BrokerOrderResult> {
    const existingBrokerOrderId =
      this.brokerOrderIdsByClientOrderId.get(order.clientOrderId);

    if (existingBrokerOrderId) {
      const existingOrder = this.orders.get(existingBrokerOrderId);

      if (!existingOrder) {
        throw new Error("BROKER_ORDER_NOT_FOUND");
      }

      return {
        brokerOrderId: existingBrokerOrderId,
        status: existingOrder.status,
      };
    }

    const brokerOrderId = `MOCK-${crypto.randomUUID()}`;

    this.orders.set(brokerOrderId, {
      request: order,
      status: "SUBMITTED",
    });
    this.brokerOrderIdsByClientOrderId.set(
      order.clientOrderId,
      brokerOrderId,
    );

    console.log("MockBroker received order:", {
      brokerOrderId,
      ...order,
    });

    return {
      brokerOrderId,
      status: "SUBMITTED",
    };
  }

  async getOrderStatus(
    brokerOrderId: string,
  ): Promise<BrokerOrderUpdate> {
    const storedOrder = this.orders.get(brokerOrderId);

    if (!storedOrder) {
      throw new Error("BROKER_ORDER_NOT_FOUND");
    }

    const { request } = storedOrder;

    if (storedOrder.status === "CANCELLED") {
      return {
        brokerOrderId,
        status: "CANCELLED",
        filledQuantity: 0,
        averageFillPrice: null,
      };
    }

    const averageFillPrice =
      request.orderType === "LIMIT"
        ? request.limitPrice ?? null
        : this.getMockMarketPrice(request.symbol);

    storedOrder.status = "FILLED";

    return {
      brokerOrderId,
      status: "FILLED",
      filledQuantity: request.quantity,
      averageFillPrice,
    };
  }

  async cancelOrder(
    brokerOrderId: string,
  ): Promise<BrokerCancellationResult> {
    const storedOrder = this.orders.get(brokerOrderId);

    if (!storedOrder) {
      throw new Error("BROKER_ORDER_NOT_FOUND");
    }

    if (storedOrder.status === "FILLED") {
      throw new Error("BROKER_ORDER_ALREADY_FILLED");
    }

    storedOrder.status = "CANCELLED";

    return {
      brokerOrderId,
      status: "CANCELLED",
    };
  }

  async getEstimatedPrice(
    symbol: string,
    _exchange: string,
  ): Promise<number> {
    return this.getMockMarketPrice(symbol);
  }

  private getMockMarketPrice(symbol: string): number {
    const prices: Record<string, number> = {
      RELIANCE: 1450,
      INFY: 1600,
      TCS: 3200,
      HDFCBANK: 1700,
    };

    return prices[symbol] ?? 1000;
  }
  async modifyOrder(
  brokerOrderId: string,
  changes: BrokerOrderModification,
): Promise<BrokerOrderResult> {
  const storedOrder =
    this.orders.get(
      brokerOrderId,
    );

  if (!storedOrder) {
    throw new Error(
      "BROKER_ORDER_NOT_FOUND",
    );
  }

  if (
    storedOrder.status ===
    "FILLED"
  ) {
    throw new Error(
      "BROKER_ORDER_ALREADY_FILLED",
    );
  }

  if (
    storedOrder.status ===
    "CANCELLED"
  ) {
    throw new Error(
      "BROKER_ORDER_ALREADY_CANCELLED",
    );
  }

  if (
    changes.quantity !==
    undefined
  ) {
    if (
      changes.quantity <= 0
    ) {
      throw new Error(
        "INVALID_QUANTITY",
      );
    }

    storedOrder.request.quantity =
      changes.quantity;
  }

  if (
    changes.limitPrice !==
    undefined
  ) {
    if (
      changes.limitPrice <= 0
    ) {
      throw new Error(
        "INVALID_LIMIT_PRICE",
      );
    }

    storedOrder.request.limitPrice =
      changes.limitPrice;
  }

  return {
    brokerOrderId,
    status:
      storedOrder.status,
  };
}
}
