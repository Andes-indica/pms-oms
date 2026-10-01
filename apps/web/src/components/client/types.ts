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

  filledQuantity?: number;

  averageFillPrice?:
    string | null;

  realizedPnl?:
    string | null;

  createdAt: string;

  executions?: Execution[];
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
  accountLabel?: string | null;

  connection?: BrokerConnection |null;
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
export type BrokerConnection = {
  status:
    | "DISCONNECTED"
    | "CONNECTED"
    | "EXPIRED"
    | "ERROR";

  externalUserId?:
    string | null;

  sessionExpiresAt?:
    string | null;

  lastConnectedAt?:
    string | null;
};
export type BrokerHolding = {
  symbol: string;
  exchange: string;
  quantity: number;
  averagePrice: number;
};

export type BrokerPosition = {
  symbol: string;
  exchange: string;
  quantity: number;
  averagePrice: number;
  realizedPnl: number;
  unrealizedPnl: number;
};

export type BrokerFunds = {
  availableCash: number;
  netAvailable: number;
  usedMargin: number;
};

export type BrokerSnapshot = {
  brokerAccountId: string;

  holdings:
    BrokerHolding[] | null;

  positions:
    BrokerPosition[] | null;

  funds:
    BrokerFunds | null;

  fetchedAt: string;
};
export type HoldingReconciliationStatus =
  | "MATCH"
  | "MISSING_IN_PMS"
  | "MISSING_AT_BROKER"
  | "QUANTITY_MISMATCH"
  | "AVERAGE_PRICE_MISMATCH";

export type HoldingReconciliationItem = {
  symbol: string;
  exchange: string;

  status:
    HoldingReconciliationStatus;

  brokerQuantity: number;
  pmsQuantity: number;

  brokerAveragePrice:
    number | null;

  pmsAveragePrice:
    number | null;

  quantityDifference: number;

  averagePriceDifference:
    number | null;
};

export type BrokerReconciliation = {
  brokerAccountId: string;
  broker: string;
  accountId: string;

  status:
    | "MATCH"
    | "MISMATCH";

  matchedCount: number;
  mismatchCount: number;

  items:
    HoldingReconciliationItem[];

  fetchedAt: string;
};
export type Execution = {
  id: string;

  brokerExecutionId: string;

  quantity: number;

  price: string;

  executedAt: string;

  createdAt: string;
};