import { useEffect, useState } from "react";
import { apiFetch } from "../lib/api";

type ClientResponse = {
  data: unknown[];
};

type Order = {
  status: string;
  realizedPnl?: string | null;
};

type OrderResponse = {
  data: Order[];
};

export function DashboardPage() {
  const [clientCount, setClientCount] =
    useState(0);

  const [orders, setOrders] =
    useState<Order[]>([]);

  useEffect(() => {
    async function loadDashboard() {
      const [
        clientsResponse,
        ordersResponse,
      ] = await Promise.all([
        apiFetch<ClientResponse>(
          "/api/clients",
        ),

        apiFetch<OrderResponse>(
          "/api/orders",
        ),
      ]);

      setClientCount(
        clientsResponse.data.length,
      );

      setOrders(
        ordersResponse.data,
      );
    }

    loadDashboard();
  }, []);

  const openOrders =
    orders.filter((order) =>
      [
        "PENDING",
        "SUBMITTED",
        "OPEN",
        "PARTIALLY_FILLED",
      ].includes(order.status),
    ).length;

  const filledOrders =
    orders.filter(
      (order) =>
        order.status === "FILLED",
    ).length;

  const realizedPnl =
    orders.reduce(
      (total, order) =>
        total +
        Number(order.realizedPnl ?? 0),
      0,
    );

  return (
    <div>
      <h2 className="text-2xl font-semibold text-slate-900">
        Dashboard
      </h2>

      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <DashboardCard
          label="Clients"
          value={String(clientCount)}
        />

        <DashboardCard
          label="Open Orders"
          value={String(openOrders)}
        />

        <DashboardCard
          label="Filled Orders"
          value={String(filledOrders)}
        />

        <DashboardCard
          label="Realized P&L"
          value={`₹${realizedPnl.toFixed(
            2,
          )}`}
        />
      </div>
    </div>
  );
}

function DashboardCard({
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