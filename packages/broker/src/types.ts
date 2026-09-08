export type BrokerOrderSide = "BUY" | "SELL";

export type BrokerOrderType = "MARKET" | "LIMIT";

export type BrokerOrderStatus =
  | "SUBMITTED"
  | "OPEN"
  | "PARTIALLY_FILLED"
  | "FILLED"
  | "REJECTED";

export type BrokerOrderRequest = {
  symbol: string;
  exchange: string;
  side: BrokerOrderSide;
  orderType: BrokerOrderType;
  quantity: number;
  limitPrice?: number | null;
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