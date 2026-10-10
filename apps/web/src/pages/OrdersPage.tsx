import {
  Fragment,
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  apiFetch,
  subscribeToLiveUpdates,
} from "../lib/api";
import { PlaceOrderForm } from "../components/PlaceOrderForm";
import {
  formatOrderStatusLabel,
  getBasketErrorGuidance,
} from "../components/basket/basket-error-guidance";

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

  executionJob?: {
    status:
      | "PENDING"
      | "PROCESSING"
      | "COMPLETED"
      | "FAILED";
    attempts: number;
    lastError?: string | null;
  } | null;

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

  useEffect(() => {
    const controller =
      new AbortController();

    void subscribeToLiveUpdates(
      (event) => {
        if (
          event.entityType ===
          "ORDER"
        ) {
          void loadOrders();
        }
      },
      controller.signal,
    ).catch((error) => {
      if (
        !controller.signal
          .aborted
      ) {
        console.error(
          "Live order updates disconnected:",
          error,
        );
      }
    });

    return () => {
      controller.abort();
    };
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

        <p className="mt-1 text-sm text-slate-500">
          Select an order to view its execution status and broker details.
        </p>

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
    expandedOrderId,
    setExpandedOrderId,
  ] = useState<string | null>(
    null,
  );

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

  function toggleOrderDetails(
    orderId: string,
  ) {
    setExpandedOrderId(
      (currentOrderId) =>
        currentOrderId === orderId
          ? null
          : orderId,
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

            const jobStatus =
              order.executionJob
                ?.status;

            const displayStatus =
              order.status ===
                "PENDING" &&
              jobStatus ===
                "PENDING"
                ? "QUEUED"
                : order.status ===
                    "PENDING" &&
                  jobStatus ===
                    "PROCESSING"
                  ? "PROCESSING"
                  : order.status ===
                      "PENDING" &&
                    jobStatus ===
                      "FAILED"
                    ? "EXECUTION_FAILED"
                    : order.status;

            const canExecute =
              order.status ===
                "PENDING" &&
              (
                !jobStatus ||
                jobStatus ===
                  "FAILED"
              );

            const statusError =
              order.executionJob
                ?.lastError ??
              (order.status ===
                "REJECTED"
                ? "ORDER_REJECTION_REASON_UNAVAILABLE"
                : null);

            const statusGuidance =
              statusError
                ? getBasketErrorGuidance(
                    statusError,
                  )
                : null;

            const expanded =
              expandedOrderId ===
              order.id;

            const detailsId =
              `order-details-${order.id}`;

            return (
              <Fragment key={order.id}>
                <tr
                  data-order-id={order.id}
                  onClick={(event) => {
                    const target =
                      event.target as HTMLElement;

                    if (
                      target.closest?.(
                        "button, a, input, select, textarea",
                      )
                    ) {
                      return;
                    }

                    toggleOrderDetails(
                      order.id,
                    );
                  }}
                  className={`cursor-pointer border-b transition-colors hover:bg-slate-50 ${
                    expanded
                      ? "bg-slate-50"
                      : ""
                  }`}
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
                  <button
                    type="button"
                    data-order-details-toggle={order.id}
                    aria-expanded={expanded}
                    aria-controls={detailsId}
                    aria-label={`View status details for ${order.symbol} ${order.side} order`}
                    onClick={() =>
                      toggleOrderDetails(
                        order.id,
                      )
                    }
                    className="flex min-w-32 items-center justify-between gap-3 rounded-sm text-left outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
                  >
                    <span>
                      {formatOrderStatusLabel(
                        displayStatus,
                      )}
                    </span>

                    <svg
                      aria-hidden="true"
                      viewBox="0 0 20 20"
                      fill="none"
                      className={`h-4 w-4 shrink-0 text-slate-500 transition-transform ${
                        expanded
                          ? "rotate-180"
                          : ""
                      }`}
                    >
                      <path
                        d="m5 7.5 5 5 5-5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
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
                    {canExecute && (
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
                          {jobStatus ===
                            "FAILED"
                            ? "Retry"
                            : "Execute"}
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

                {expanded && (
                  <tr
                    id={detailsId}
                    className="border-b bg-slate-50/70"
                  >
                    <td
                      colSpan={9}
                      className="px-4 pb-5 pt-1"
                    >
                      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                      <h3 className="font-semibold text-slate-900">
                        Order status details
                      </h3>

                      <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-3">
                        <div>
                          <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
                            Order status
                          </dt>
                          <dd className="mt-1 text-slate-900">
                            {formatOrderStatusLabel(
                              displayStatus,
                            )}
                          </dd>
                        </div>

                        <div>
                          <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
                            Execution status
                          </dt>
                          <dd className="mt-1 text-slate-900">
                            {jobStatus
                              ? formatOrderStatusLabel(
                                  jobStatus,
                                )
                              : "Not started"}
                          </dd>
                        </div>

                        <div>
                          <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
                            Attempts
                          </dt>
                          <dd className="mt-1 text-slate-900">
                            {order.executionJob
                              ?.attempts ?? 0}
                          </dd>
                        </div>
                      </dl>

                      {statusGuidance && (
                        <div
                          role="alert"
                          className="mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-900"
                        >
                          <p className="font-semibold">
                            {statusGuidance.title}
                          </p>

                          {statusGuidance.detail && (
                            <p className="mt-1 break-words">
                              Broker detail: {statusGuidance.detail}
                            </p>
                          )}

                          <p className="mt-1 text-red-700">
                            Next: {statusGuidance.action}
                          </p>
                        </div>
                      )}
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
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
