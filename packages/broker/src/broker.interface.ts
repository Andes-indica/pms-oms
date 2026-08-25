import type {
  BrokerOrderRequest,
  BrokerOrderResult,
} from "./types";

export interface BrokerAdapter {
  placeOrder(
    order: BrokerOrderRequest,
  ): Promise<BrokerOrderResult>;
}