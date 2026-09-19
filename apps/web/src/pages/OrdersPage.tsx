import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { apiFetch } from "../lib/api";
import { PlaceOrderForm } from "../components/PlaceOrderForm";

type Order = {
  id: string;
  symbol: string;
  exchange: string;
  side: "BUY" | "SELL";
  orderType: string;
  quantity: number;
  status: string;
  averageFillPrice?: string | null;
  realizedPnl?: string | null;

  portfolio: {
    client: {
      name: string;
    };
  };
};

type OrdersResponse = {
  data: Order[];
};

export function OrdersPage() {
  const [orders, setOrders] =
    useState<Order[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const loadOrders =
    useCallback(async () => {
      try {
        setError("");

        const response =
          await apiFetch<OrdersResponse>(
            "/api/orders",
          );

        setOrders(response.data);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Failed to load orders",
        );
      } finally {
        setLoading(false);
      }
    }, []);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  return (
    <div className="space-y-8">
      <PlaceOrderForm
        onCreated={loadOrders}
      />

      <section>
        <h2 className="text-2xl font-semibold text-slate-900">
          Order Blotter
        </h2>

        {error && (
          <p className="mt-4 text-red-600">
            {error}
          </p>
        )}

        {loading ? (
          <p className="mt-4">
            Loading orders...
          </p>
        ) : (
          <OrdersTable
            orders={orders}
            onUpdated={loadOrders}
          />
        )}
      </section>
    </div>
  );
}
function OrdersTable({
  orders,
  onUpdated,
}: {
  orders: Order[];
  onUpdated: () => Promise<void>;
}) {
  const [
    actionOrderId,
    setActionOrderId,
  ] = useState<string | null>(
    null,
  );

  async function runAction(
    orderId: string,
    action:
      | "execute"
      | "sync"
      | "cancel",
  ) {
    try {
      setActionOrderId(orderId);

      await apiFetch(
        `/api/orders/${orderId}/${action}`,
        {
          method: "POST",
        },
      );

      await onUpdated();
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Order action failed",
      );
    } finally {
      setActionOrderId(null);
    }
  }

  return (
    <div className="mt-6 overflow-x-auto rounded-xl border bg-white">
      <table className="w-full text-left text-sm">
        <thead className="border-b bg-slate-50 text-slate-600">
          <tr>
            <th className="px-4 py-3">
              Client
            </th>

            <th className="px-4 py-3">
              Symbol
            </th>

            <th className="px-4 py-3">
              Side
            </th>

            <th className="px-4 py-3">
              Qty
            </th>

            <th className="px-4 py-3">
              Type
            </th>

            <th className="px-4 py-3">
              Status
            </th>

            <th className="px-4 py-3">
              Fill
            </th>

            <th className="px-4 py-3">
              P&L
            </th>

            <th className="px-4 py-3">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => {
            const busy =
              actionOrderId ===
              order.id;

            return (
              <tr
                key={order.id}
                className="border-b last:border-b-0"
              >
                <td className="px-4 py-4">
                  {
                    order.portfolio
                      .client.name
                  }
                </td>

                <td className="px-4 py-4 font-medium">
                  {order.symbol}
                </td>

                <td className="px-4 py-4">
                  {order.side}
                </td>

                <td className="px-4 py-4">
                  {order.quantity}
                </td>

                <td className="px-4 py-4">
                  {order.orderType}
                </td>

                <td className="px-4 py-4">
                  {order.status}
                </td>

                <td className="px-4 py-4">
                  {order.averageFillPrice ??
                    "—"}
                </td>

                <td className="px-4 py-4">
                  {order.realizedPnl ??
                    "—"}
                </td>

                <td className="px-4 py-4">
                  <div className="flex flex-wrap gap-2">
                    {order.status ===
                      "PENDING" && (
                      <button
                        disabled={busy}
                        onClick={() =>
                          runAction(
                            order.id,
                            "execute",
                          )
                        }
                        className="rounded-md bg-slate-900 px-3 py-1.5 text-xs text-white"
                      >
                        Execute
                      </button>
                    )}

                    {[
                      "SUBMITTED",
                      "OPEN",
                      "PARTIALLY_FILLED",
                    ].includes(
                      order.status,
                    ) && (
                      <button
                        disabled={busy}
                        onClick={() =>
                          runAction(
                            order.id,
                            "sync",
                          )
                        }
                        className="rounded-md border px-3 py-1.5 text-xs"
                      >
                        Sync
                      </button>
                    )}

                    {[
                      "PENDING",
                      "SUBMITTED",
                      "OPEN",
                    ].includes(
                      order.status,
                    ) && (
                      <button
                        disabled={busy}
                        onClick={() =>
                          runAction(
                            order.id,
                            "cancel",
                          )
                        }
                        className="rounded-md border px-3 py-1.5 text-xs"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}