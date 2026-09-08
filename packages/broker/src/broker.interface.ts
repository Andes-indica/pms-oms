import type {
  BrokerOrderRequest,
  BrokerOrderResult,
  BrokerOrderUpdate,
} from "./types";

export interface BrokerAdapter {
  placeOrder(
    order: BrokerOrderRequest,
  ): Promise<BrokerOrderResult>;

  getOrderStatus(
    brokerOrderId: string,
  ): Promise<BrokerOrderUpdate>;
}