import type {
  BrokerOrderRequest,
  BrokerOrderResult,
  BrokerOrderUpdate,
  BrokerCancellationResult,
} from "./types";

export interface BrokerAdapter {
  placeOrder(
    order: BrokerOrderRequest,
  ): Promise<BrokerOrderResult>;

  getOrderStatus(
    brokerOrderId: string,
  ): Promise<BrokerOrderUpdate>;

  cancelOrder(
    brokerOrderId: string,
  ): Promise<BrokerCancellationResult>;

  getEstimatedPrice(
    symbol: string,
    exchange: string,
  ): Promise<number>;
}
