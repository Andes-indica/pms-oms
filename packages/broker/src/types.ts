export type BrokerOrderSide = "BUY" | "SELL";

export type BrokerOrderType = "MARKET" | "LIMIT";

export type BrokerOrderStatus =
  | "SUBMITTED"
  | "OPEN"
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