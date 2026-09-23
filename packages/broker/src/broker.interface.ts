import type {
  BrokerOrderRequest,
  BrokerOrderResult,
  BrokerOrderUpdate,
  BrokerCancellationResult,
  BrokerOrderModification
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

  modifyOrder(
  brokerOrderId: string,
  changes: BrokerOrderModification
): Promise<BrokerOrderResult>;

}

export interface BrokerOrderRecovery {
  findOrderByClientOrderId(
    clientOrderId: string,
  ): Promise<BrokerOrderResult | null>;
}