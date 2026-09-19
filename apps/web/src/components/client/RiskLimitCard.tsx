import type {
  RiskLimit,
} from "./types";

import {
  formatCurrency,
} from "./utils";

type Props = {
  riskLimit?: RiskLimit | null;
};

export function RiskLimitCard({
  riskLimit,
}: Props) {
  if (!riskLimit) {
    return (
      <div className="rounded-xl border bg-white p-5">
        <h4 className="font-medium">
          Risk Limits
        </h4>

        <p className="mt-2 text-sm text-slate-500">
          No portfolio-specific risk limits configured.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-white p-5">
      <h4 className="font-medium">
        Risk Limits
      </h4>

      <div className="mt-4 grid gap-4 md:grid-cols-4">
        <Metric
          label="Max Order Qty"
          value={
            riskLimit.maxOrderQuantity ??
            "—"
          }
        />

        <Metric
          label="Max Order Value"
          value={
            riskLimit.maxOrderValue
              ? formatCurrency(
                  Number(
                    riskLimit.maxOrderValue,
                  ),
                )
              : "—"
          }
        />

        <Metric
          label="Max Position Qty"
          value={
            riskLimit.maxPositionQuantity ??
            "—"
          }
        />

        <Metric
          label="Max Position Value"
          value={
            riskLimit.maxPositionValue
              ? formatCurrency(
                  Number(
                    riskLimit.maxPositionValue,
                  ),
                )
              : "—"
          }
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
  value: string | number;
}) {
  return (
    <div>
      <p className="text-xs text-slate-500">
        {label}
      </p>

      <p className="mt-1 font-medium">
        {value}
      </p>
    </div>
  );
}