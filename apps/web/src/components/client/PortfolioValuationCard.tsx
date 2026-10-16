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

      {!valuation.valuationAvailable && (
        <p className="mt-3 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
          Live market data is unavailable. Cost and cash are shown, but market value and unrealized P&amp;L are intentionally not estimated.
        </p>
      )}

      <div className="mt-4 grid gap-4 md:grid-cols-4">
        <Metric
          label="Cash"
          value={formatCurrency(
            valuation.cashBalance,
          )}
        />

        <Metric
          label="Market Value"
          value={formatOptionalCurrency(
            valuation.totalMarketValue,
          )}
        />

        <Metric
          label="Unrealized P&L"
          value={formatOptionalCurrency(
            valuation.totalUnrealizedPnl,
          )}
        />

        <Metric
          label="Portfolio Value"
          value={formatOptionalCurrency(
            valuation.portfolioValue,
          )}
        />
      </div>
    </div>
  );
}

function formatOptionalCurrency(
  value: number | null,
) {
  return value === null
    ? "Unavailable"
    : formatCurrency(value);
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
