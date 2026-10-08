import type { BrokerAdapter } from "./broker.interface";

import type {
  BrokerOrderRequest,
  BrokerOrderResult,
  BrokerOrderUpdate,
  BrokerCancellationResult,
  BrokerOrderStatus,
  BrokerOrderModification,
  BrokerExecution
} from "./types";

type StoredMockOrder = {
  request: BrokerOrderRequest;
  status: BrokerOrderStatus;
  executedAt?: Date;

  simulatedUpdate?: BrokerOrderUpdate;
  simulatedExecutions?: BrokerExecution[];
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
    brokerOrderId: string,
    request: BrokerOrderRequest,
    status: BrokerOrderStatus = "SUBMITTED",
  ) {
    this.orders.set(
      brokerOrderId, {
      request,
      status,
    }
    );
    this.brokerOrderIdsByClientOrderId.set(
      request.clientOrderId, brokerOrderId,
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
    if (
      storedOrder.simulatedUpdate
    ) {
      return {
        ...storedOrder
          .simulatedUpdate,
      };
    }

    if (storedOrder.status === "CANCELLED") {
      return {
        brokerOrderId,
        status: "CANCELLED",
        filledQuantity: 0,
        averageFillPrice: null,
      };
    }
    if (
      storedOrder.status !==
      "FILLED"
    ) {
      storedOrder.executedAt =
        new Date();
    }

    storedOrder.status = "FILLED";
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

    if (storedOrder.simulatedUpdate) {
      storedOrder.simulatedUpdate = {
        ...storedOrder.simulatedUpdate,
        status: "CANCELLED",
      };
    }

    return {
      brokerOrderId,
      status: "CANCELLED",
    };
  }
  clear() {
    this.orders.clear();

    this.brokerOrderIdsByClientOrderId.clear();
  }

  setOrderSimulation(
    brokerOrderId: string,
    update: BrokerOrderUpdate,
    executions: BrokerExecution[],
  ) {
    const storedOrder =
      this.orders.get(
        brokerOrderId,
      );

    if (!storedOrder) {
      throw new Error(
        "BROKER_ORDER_NOT_FOUND",
      );
    }

    storedOrder.status =
      update.status;

    storedOrder.simulatedUpdate =
      update;

    storedOrder.simulatedExecutions =
      executions;
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
  async findOrderByClientOrderId(
    clientOrderId: string,
  ): Promise<BrokerOrderResult | null> {
    const brokerOrderId =
      this.brokerOrderIdsByClientOrderId.get(
        clientOrderId,
      );

    if (!brokerOrderId) {
      return null;
    }

    const order =
      this.orders.get(
        brokerOrderId,
      );

    if (!order) {
      return null;
    }

    return {
      brokerOrderId,
      status: order.status,
    };
  }
  async getExecutions(
    brokerOrderId: string,
  ): Promise<BrokerExecution[]> {
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
      storedOrder
        .simulatedExecutions
    ) {
      return [
        ...storedOrder
          .simulatedExecutions,
      ];
    }
    if (
      storedOrder.status !==
      "FILLED"
    ) {
      return [];
    }

    const price =
      storedOrder.request
        .orderType ===
        "LIMIT"
        ? storedOrder.request
          .limitPrice
        : this.getMockMarketPrice(
          storedOrder.request
            .symbol,
        );

    if (
      price === null ||
      price === undefined
    ) {
      throw new Error(
        "BROKER_FILL_DETAILS_UNAVAILABLE",
      );
    }

    return [
      {
        brokerExecutionId:
          `${brokerOrderId}:fill:1`,

        brokerOrderId,

        quantity:
          storedOrder.request
            .quantity,

        price,

        executedAt:
          storedOrder.executedAt ??
          new Date(),
      },
    ];
  }
}
