export type BrokerOrderSide = "BUY" | "SELL";

export type BrokerOrderType = "MARKET" | "LIMIT";

export type BrokerOrderStatus =
  | "SUBMITTED"
  | "OPEN"
  | "PARTIALLY_FILLED"
  | "FILLED"
  | "CANCELLED"
  | "REJECTED";

export type BrokerOrderRequest = {
  clientOrderId: string;
  symbol: string;
  exchange: string;
  side: BrokerOrderSide;
  orderType: BrokerOrderType;
  quantity: number;
  limitPrice?: number | null;
};

export type BrokerCancellationResult = {
  brokerOrderId: string;
  status: "CANCELLED";
};

export type BrokerOrderResult = {
  brokerOrderId: string;
  status: BrokerOrderStatus;
};

export type BrokerOrderUpdate = {
  brokerOrderId: string;
  status: BrokerOrderStatus;
  filledQuantity: number;
  averageFillPrice: number | null;
};
