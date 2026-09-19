import type {
  ClientOverview,
} from "./types";

import {
  formatCurrency,
} from "./utils";

type Props = {
  client: ClientOverview;
};

export function ClientSummaryCards({
  client,
}: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <SummaryCard
        label="Cash Balance"
        value={formatCurrency(
          client.totalCash,
        )}
      />

      <SummaryCard
        label="Realized P&L"
        value={formatCurrency(
          client.totalRealizedPnl,
        )}
      />

      <SummaryCard
        label="Portfolios"
        value={String(
          client.portfolios.length,
        )}
      />

      <SummaryCard
        label="Broker Accounts"
        value={String(
          client.brokerAccounts.length,
        )}
      />
    </div>
  );
}

function SummaryCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border bg-white p-5">
      <p className="text-sm text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-2xl font-semibold text-slate-900">
        {value}
      </p>
    </div>
  );
}