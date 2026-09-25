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



  modifyOrder(
  brokerOrderId: string,
  changes: BrokerOrderModification
): Promise<BrokerOrderResult>;

}

