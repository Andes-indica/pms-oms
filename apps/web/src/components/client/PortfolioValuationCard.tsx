import type {
  PortfolioValuation,
} from "./types";

import {
  formatCurrency,
} from "./utils";

export function PortfolioValuationCard({
  valuation,
}: {
  valuation: PortfolioValuation;
}) {
  return (
    <div className="rounded-xl border bg-white p-5">
      <h4 className="font-medium">
        Portfolio Valuation
      </h4>

      <div className="mt-4 grid gap-4 md:grid-cols-4">
        <Metric
          label="Cash"
          value={formatCurrency(
            valuation.cashBalance,
          )}
        />

        <Metric
          label="Market Value"
          value={formatCurrency(
            valuation.totalMarketValue,
          )}
        />

        <Metric
          label="Unrealized P&L"
          value={formatCurrency(
            valuation.totalUnrealizedPnl,
          )}
        />

        <Metric
          label="Portfolio Value"
          value={formatCurrency(
            valuation.portfolioValue,
          )}
        />
      </div>
    </div>
  );
}

function Metric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-xs text-slate-500">
        {label}
      </p>

      <p className="mt-1 font-semibold">
        {value}
      </p>
    </div>
  );
}