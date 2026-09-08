import type { BrokerAdapter } from "./broker.interface";

import type {
  BrokerOrderRequest,
  BrokerOrderResult,
  BrokerOrderUpdate,
} from "./types";

type StoredMockOrder = {
  request: BrokerOrderRequest;
};

export class MockBroker implements BrokerAdapter {
  private orders = new Map<string, StoredMockOrder>();

  async placeOrder(
    order: BrokerOrderRequest,
  ): Promise<BrokerOrderResult> {
    const brokerOrderId = `MOCK-${crypto.randomUUID()}`;

    this.orders.set(brokerOrderId, {
      request: order,
    });

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

    const averageFillPrice =
      request.orderType === "LIMIT"
        ? request.limitPrice ?? null
        : this.getMockMarketPrice(request.symbol);

    return {
      brokerOrderId,
      status: "FILLED",
      filledQuantity: request.quantity,
      averageFillPrice,
    };
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
}