import type { BrokerAdapter } from "./broker.interface";
import type {
  BrokerOrderRequest,
  BrokerOrderResult,
} from "./types";

export class MockBroker implements BrokerAdapter {
  async placeOrder(
    order: BrokerOrderRequest,
  ): Promise<BrokerOrderResult> {
    console.log("MockBroker received order:", order);

    const brokerOrderId = `MOCK-${crypto.randomUUID()}`;

    return {
      brokerOrderId,
      status: "SUBMITTED",
    };
  }
}