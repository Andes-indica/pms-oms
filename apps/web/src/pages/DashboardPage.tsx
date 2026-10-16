import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  apiFetch,
  subscribeToLiveUpdates,
} from "../lib/api";

type DashboardData = {
  totalAum: number | null;

  totalCash: number;

  totalMarketValue: number | null;

  totalUnrealizedPnl: number | null;

  totalRealizedPnl: number;

  clients: number;

  portfolios: number;

  activeOrders: number;

  filledOrders: number;

  totalOrders: number;

  valuationAvailable: boolean;
  marketDataMode:
    | "LIVE"
    | "SIMULATED"
    | "DISABLED";

  clientBreakdown: ClientBreakdown[];

  topHoldings: TopHolding[];
};

type DashboardResponse = {
  data: DashboardData;
};

type ClientBreakdown = {
  clientId: string;
  clientName: string;
  cash: number;
  marketValue: number | null;
  aum: number | null;
};

type TopHolding = {
  symbol: string;
  exchange: string;
  quantity: number;
  marketValue: number;
  allocationPercent: number;
};

export function DashboardPage() {
  const [data, setData] =
    useState<DashboardData | null>(
      null,
    );

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const loadDashboard =
    useCallback(async () => {
      try {
        setError("");

        const response =
          await apiFetch<DashboardResponse>(
            "/api/dashboard",
          );

        setData(response.data);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Failed to load dashboard",
        );
      } finally {
        setLoading(false);
      }
    }, []);

  useEffect(() => {
    void loadDashboard();
  }, [loadDashboard]);

  useEffect(() => {
    const controller =
      new AbortController();

    void subscribeToLiveUpdates(
      (event) => {
        if (
          event.entityType ===
            "ORDER" ||
          event.entityType ===
            "PORTFOLIO" ||
          event.entityType ===
            "HOLDING"
        ) {
          void loadDashboard();
        }
      },
      controller.signal,
    ).catch((error) => {
      if (
        !controller.signal
          .aborted
      ) {
        console.error(
          "Live dashboard updates disconnected:",
          error,
        );
      }
    });

    return () => {
      controller.abort();
    };
  }, [loadDashboard]);

  if (loading) {
    return (
      <p className="text-slate-500">
        Loading dashboard...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-red-600">
        {error}
      </p>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">
          Dashboard
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Firm-wide portfolio and order overview.
        </p>
      </div>

      {!data.valuationAvailable && (
        <p className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          Live valuation is unavailable in limit-only mode. Cash, realized P&amp;L, clients, and order activity remain current; market value, AUM, allocation, and unrealized P&amp;L are intentionally not estimated.
        </p>
      )}

      <div className="grid gap-4 md:grid-cols-4">
        <SummaryCard
          label="Total AUM"
          value={formatOptionalCurrency(data.totalAum)}
        />

        <SummaryCard
          label="Cash"
          value={formatCurrency(data.totalCash)}
        />

        <SummaryCard
          label="Market Value"
          value={formatOptionalCurrency(
            data.totalMarketValue,
          )}
        />

        <SummaryCard
          label="Unrealized P&L"
          value={formatOptionalCurrency(
            data.totalUnrealizedPnl,
          )}
          positive={
            data.totalUnrealizedPnl ===
              null
              ? undefined
              : data.totalUnrealizedPnl >= 0
          }
        />
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <SummaryCard
          label="Realized P&L"
          value={formatCurrency(
            data.totalRealizedPnl,
          )}
          positive={
            data.totalRealizedPnl >= 0
          }
        />

        <SummaryCard
          label="Clients"
          value={String(data.clients)}
        />

        <SummaryCard
          label="Portfolios"
          value={String(data.portfolios)}
        />

        <SummaryCard
          label="Active Orders"
          value={String(data.activeOrders)}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <TopHoldings
          holdings={data.topHoldings}
          valuationAvailable={
            data.valuationAvailable
          }
        />

        <ClientAumBreakdown
          clients={data.clientBreakdown}
        />
      </div>

      <OrderSummary
        activeOrders={data.activeOrders}
        filledOrders={data.filledOrders}
        totalOrders={data.totalOrders}
      />
    </div>
  );
}

function SummaryCard({
  label,
  value,
  positive,
}: {
  label: string;
  value: string;
  positive?: boolean;
}) {
  return (
    <div className="rounded-xl border bg-white p-5">
      <p className="text-sm text-slate-500">
        {label}
      </p>

      <p
        className={`mt-2 text-2xl font-semibold ${positive === undefined
          ? "text-slate-900"
          : positive
            ? "text-green-700"
            : "text-red-600"
          }`}
      >
        {value}
      </p>
    </div>
  );
}

function OrderSummary({
  activeOrders,
  filledOrders,
  totalOrders,
}: {
  activeOrders: number;
  filledOrders: number;
  totalOrders: number;
}) {
  return (
    <div className="rounded-xl border bg-white p-5">
      <h3 className="font-semibold">
        Order Activity
      </h3>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <Metric
          label="Total Orders"
          value={totalOrders}
        />

        <Metric
          label="Active Orders"
          value={activeOrders}
        />

        <Metric
          label="Filled Orders"
          value={filledOrders}
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
  value: number;
}) {
  return (
    <div>
      <p className="text-sm text-slate-500">
        {label}
      </p>

      <p className="mt-1 text-xl font-semibold">
        {value}
      </p>
    </div>
  );
}

function formatCurrency(
  value: number,
) {
  return new Intl.NumberFormat(
    "en-IN",
    {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    },
  ).format(value);
}

function formatOptionalCurrency(
  value: number | null,
) {
  return value === null
    ? "Unavailable"
    : formatCurrency(value);
}
function TopHoldings({
  holdings,
  valuationAvailable,
}: {
  holdings: TopHolding[];
  valuationAvailable: boolean;
}) {
  return (
    <div className="rounded-xl border bg-white">
      <div className="border-b px-5 py-4">
        <h3 className="font-semibold">
          Top Holdings
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Largest positions across managed portfolios.
        </p>
      </div>

      <div className="overflow-x-auto">
        {!valuationAvailable ? (
          <p className="p-5 text-sm text-slate-500">
            Configure live market data to rank holdings by market value.
          </p>
        ) : (
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-5 py-3">
                Symbol
              </th>

              <th className="px-5 py-3">
                Quantity
              </th>

              <th className="px-5 py-3">
                Market Value
              </th>

              <th className="px-5 py-3">
                Allocation
              </th>
            </tr>
          </thead>

          <tbody>
            {holdings.map(
              (holding) => (
                <tr
                  key={`${holding.exchange}-${holding.symbol}`}
                  className="border-t"
                >
                  <td className="px-5 py-4">
                    <p className="font-medium">
                      {
                        holding.symbol
                      }
                    </p>

                    <p className="text-xs text-slate-500">
                      {
                        holding.exchange
                      }
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    {
                      holding.quantity
                    }
                  </td>

                  <td className="px-5 py-4">
                    {formatCurrency(
                      holding.marketValue,
                    )}
                  </td>

                  <td className="px-5 py-4">
                    {holding.allocationPercent.toFixed(
                      2,
                    )}
                    %
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
        )}
      </div>
    </div>
  );
}
function ClientAumBreakdown({
  clients,
}: {
  clients:
  ClientBreakdown[];
}) {
  return (
    <div className="rounded-xl border bg-white">
      <div className="border-b px-5 py-4">
        <h3 className="font-semibold">
          Client AUM
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Assets managed per client.
        </p>
      </div>

      <div className="divide-y">
        {clients.map(
          (client) => (
            <div
              key={client.clientId}
              className="flex items-center justify-between px-5 py-4"
            >
              <div>
                <p className="font-medium">
                  {
                    client.clientName
                  }
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Cash{" "}
                  {formatCurrency(
                    client.cash,
                  )}
                  {" • "}
                  Holdings{" "}
                  {formatOptionalCurrency(
                    client.marketValue,
                  )}
                </p>
              </div>

              <p className="font-semibold">
                {client.aum === null
                  ? "Valuation unavailable"
                  : formatCurrency(
                      client.aum,
                    )}
              </p>
            </div>
          ),
        )}
      </div>
    </div>
  );
}
