import type {
  BrokerOrderRequest,
  BrokerOrderResult,
  BrokerOrderStatus
} from "./types";

export interface BrokerAdapter {
  placeOrder(
    order: BrokerOrderRequest,
  ): Promise<BrokerOrderResult>;
  getOrderStatus(brokerorderid:string): Promise<BrokerOrderStatus>;
}