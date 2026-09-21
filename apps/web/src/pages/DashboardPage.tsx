import {
  useEffect,
  useState,
} from "react";

import {
  apiFetch,
} from "../lib/api";

type DashboardData = {
  totalAum: number;

  totalCash: number;

  totalMarketValue: number;

  totalUnrealizedPnl: number;

  totalRealizedPnl: number;

  clients: number;

  portfolios: number;

  activeOrders: number;

  filledOrders: number;

  totalOrders: number;
};

type DashboardResponse = {
  data: DashboardData;
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

  useEffect(() => {
    async function loadDashboard() {
      try {
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
    }

    loadDashboard();
  }, []);

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

      <div className="grid gap-4 md:grid-cols-4">
        <SummaryCard
          label="Total AUM"
          value={formatCurrency(
            data.totalAum,
          )}
        />

        <SummaryCard
          label="Cash"
          value={formatCurrency(
            data.totalCash,
          )}
        />

        <SummaryCard
          label="Market Value"
          value={formatCurrency(
            data.totalMarketValue,
          )}
        />

        <SummaryCard
          label="Unrealized P&L"
          value={formatCurrency(
            data.totalUnrealizedPnl,
          )}
          positive={
            data.totalUnrealizedPnl >=
            0
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
            data.totalRealizedPnl >=
            0
          }
        />

        <SummaryCard
          label="Clients"
          value={String(
            data.clients,
          )}
        />

        <SummaryCard
          label="Portfolios"
          value={String(
            data.portfolios,
          )}
        />

        <SummaryCard
          label="Active Orders"
          value={String(
            data.activeOrders,
          )}
        />
      </div>

      <OrderSummary
        activeOrders={
          data.activeOrders
        }
        filledOrders={
          data.filledOrders
        }
        totalOrders={
          data.totalOrders
        }
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
        className={`mt-2 text-2xl font-semibold ${
          positive === undefined
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