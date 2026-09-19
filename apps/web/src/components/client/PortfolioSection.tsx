import type {
  Portfolio,
} from "./types";

import {
  HoldingsTable,
} from "./HoldingsTable";

import {
  RiskLimitCard,
} from "./RiskLimitCard";

import {
  RecentOrdersTable,
} from "./RecentOrdersTable";

import {
  formatCurrency,
} from "./utils";

type Props = {
  portfolio: Portfolio;
};

export function PortfolioSection({
  portfolio,
}: Props) {
  return (
    <section className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            {portfolio.name}
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Cash:{" "}
            {formatCurrency(
              Number(
                portfolio.cashBalance,
              ),
            )}
          </p>
        </div>

        <div className="text-right">
          <p className="text-xs text-slate-500">
            Realized P&L
          </p>

          <p className="font-semibold">
            {formatCurrency(
              portfolio.realizedPnl,
            )}
          </p>
        </div>
      </div>

      <HoldingsTable
        holdings={portfolio.holdings}
      />

      <RiskLimitCard
        riskLimit={portfolio.riskLimit}
      />

      <RecentOrdersTable
        orders={portfolio.orders}
      />
    </section>
  );
}