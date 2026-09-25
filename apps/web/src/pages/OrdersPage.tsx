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
  orderType: "MARKET" | "LIMIT";
  quantity: number;
  status: string;

  limitPrice?: string | null;
  filledQuantity?: number;

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
  const [
    modifyingOrder,
    setModifyingOrder,
  ] = useState<Order | null>(null);

  const [
    modifyQuantity,
    setModifyQuantity,
  ] = useState("");

  const [
    modifyLimitPrice,
    setModifyLimitPrice,
  ] = useState("");

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
  function openModify(
    order: Order,
  ) {
    setModifyingOrder(order);

    setModifyQuantity(
      String(order.quantity),
    );

    setModifyLimitPrice(
      order.limitPrice ?? "",
    );
  }

  async function submitModify() {
    if (!modifyingOrder) {
      return;
    }

    const quantity =
      Number(modifyQuantity);

    if (
      !Number.isInteger(quantity) ||
      quantity <= 0
    ) {
      alert(
        "Quantity must be a positive integer",
      );
      return;
    }

    const body: {
      quantity: number;
      limitPrice?: number;
    } = {
      quantity,
    };

    if (
      modifyingOrder.orderType ===
      "LIMIT"
    ) {
      const limitPrice =
        Number(
          modifyLimitPrice,
        );

      if (
        !Number.isFinite(
          limitPrice,
        ) ||
        limitPrice <= 0
      ) {
        alert(
          "Enter a valid limit price",
        );
        return;
      }

      body.limitPrice =
        limitPrice;
    }

    try {
      setActionOrderId(
        modifyingOrder.id,
      );

      await apiFetch(
        `/api/orders/${modifyingOrder.id}`,
        {
          method: "PATCH",

          body: JSON.stringify(
            body,
          ),
        },
      );

      setModifyingOrder(
        null,
      );

      await onUpdated();
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Failed to modify order",
      );
    } finally {
      setActionOrderId(
        null,
      );
    }
  }

  return (
    <>
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
                    {[
                      "SUBMITTED",
                      "OPEN",
                    ].includes(
                      order.status,
                    ) &&
                      (order.filledQuantity ??
                        0) === 0 && (
                        <button
                          disabled={busy}
                          onClick={() =>
                            openModify(
                              order,
                            )
                          }
                          className="rounded-md border px-3 py-1.5 text-xs"
                        >
                          Modify
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
      {modifyingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-semibold">
              Modify Order
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              {modifyingOrder.symbol}{" "}
              {modifyingOrder.side}{" "}
              {modifyingOrder.orderType}
            </p>

            <div className="mt-5 space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Quantity
                </label>

                <input
                  type="number"
                  min="1"
                  value={
                    modifyQuantity
                  }
                  onChange={(event) =>
                    setModifyQuantity(
                      event.target
                        .value,
                    )
                  }
                  className="w-full rounded-md border px-3 py-2"
                />
              </div>

              {modifyingOrder.orderType ===
                "LIMIT" && (
                  <div>
                    <label className="mb-1 block text-sm font-medium">
                      Limit Price
                    </label>

                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={
                        modifyLimitPrice
                      }
                      onChange={(
                        event,
                      ) =>
                        setModifyLimitPrice(
                          event.target
                            .value,
                        )
                      }
                      className="w-full rounded-md border px-3 py-2"
                    />
                  </div>
                )}
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() =>
                  setModifyingOrder(
                    null,
                  )
                }
                className="rounded-md border px-4 py-2 text-sm"
              >
                Close
              </button>

              <button
                onClick={
                  submitModify
                }
                disabled={
                  actionOrderId ===
                  modifyingOrder.id
                }
                className="rounded-md bg-slate-900 px-4 py-2 text-sm text-white"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}