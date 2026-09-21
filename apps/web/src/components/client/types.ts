export type Holding = {
  id: string;
  symbol: string;
  exchange: string;
  quantity: number;
  averagePrice: string;
};

export type Order = {
  id: string;
  symbol: string;
  side: string;
  orderType: string;
  quantity: number;
  status: string;
  averageFillPrice?: string | null;
  realizedPnl?: string | null;
  createdAt: string;
};

export type RiskLimit = {
  maxOrderQuantity?: number | null;
  maxOrderValue?: string | null;
  maxPositionQuantity?: number | null;
  maxPositionValue?: string | null;
};

export type Portfolio = {
  id: string;
  name: string;
  cashBalance: string;
  realizedPnl: number;
  holdings: Holding[];
  orders: Order[];
  riskLimit?: RiskLimit | null;
};

export type BrokerAccount = {
  id: string;
  broker: string;
  accountId: string;
};

export type ClientOverview = {
  id: string;
  name: string;
  email?: string | null;

  totalCash: number;
  totalRealizedPnl: number;

  brokerAccounts: BrokerAccount[];

  portfolios: Portfolio[];
};

export type ValuedHolding = {
  id: string;
  symbol: string;
  exchange: string;
  quantity: number;
  averagePrice: number;
  currentPrice: number;
  costValue: number;
  marketValue: number;
  unrealizedPnl: number;
  unrealizedPnlPercent: number;
};

export type PortfolioValuation = {
  portfolioId: string;
  portfolioName: string;

  cashBalance: number;

  totalCostValue: number;
  totalMarketValue: number;

  totalUnrealizedPnl: number;

  portfolioValue: number;

  holdings: ValuedHolding[];
};