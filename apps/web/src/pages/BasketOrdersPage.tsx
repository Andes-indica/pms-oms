import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { apiFetch } from "../lib/api";

import {
  CreateBasketOrderForm,
} from "../components/basket/CreateBasketOrderForm";

type Basket = {
  id: string;
  name?: string;
  symbol: string;
  exchange: string;
  side: string;
  orderType: string;
  totalQuantity: number;
  allocationMethod: string;
  status: string;

  orders: Array<{
    id: string;
    quantity: number;
    status: string;

    portfolio: {
      client: {
        name: string;
      };
    };

    brokerAccount?: {
      broker: string;
      accountId: string;
    };
  }>;
};

type Response = {
  data: Basket[];
};

export function BasketOrdersPage() {
  const [baskets, setBaskets] =
    useState<Basket[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const loadBaskets =
    useCallback(async () => {
      try {
        setError("");

        const response =
          await apiFetch<Response>(
            "/api/basket-orders",
          );

        setBaskets(response.data);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Failed to load baskets",
        );
      } finally {
        setLoading(false);
      }
    }, []);

  useEffect(() => {
    loadBaskets();
  }, [loadBaskets]);

  return (
    <div className="space-y-8">
      <CreateBasketOrderForm
        onCreated={loadBaskets}
      />

      <section>
        <h2 className="text-2xl font-semibold text-slate-900">
          Basket Orders
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Monitor multi-client basket orders
          and their child orders.
        </p>

        {error && (
          <p className="mt-4 text-red-600">
            {error}
          </p>
        )}

        {loading ? (
          <p className="mt-4">
            Loading baskets...
          </p>
        ) : (
          <BasketList
            baskets={baskets}
            onUpdated={loadBaskets}
          />
        )}
      </section>
    </div>
  );
}

function BasketList({
  baskets,
  onUpdated,
}: {
  baskets: Basket[];
  onUpdated: () => Promise<void>;
}) {
  const [busyId, setBusyId] =
    useState<string | null>(null);

  async function runAction(
    basketId: string,
    action:
      | "execute"
      | "sync",
  ) {
    try {
      setBusyId(basketId);

      await apiFetch(
        `/api/basket-orders/${basketId}/${action}`,
        {
          method: "POST",
        },
      );

      await onUpdated();
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Basket action failed",
      );
    } finally {
      setBusyId(null);
    }
  }

  if (baskets.length === 0) {
    return (
      <div className="mt-6 rounded-xl border bg-white p-6 text-sm text-slate-500">
        No basket orders yet.
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-4">
      {baskets.map((basket) => {
        const busy =
          busyId === basket.id;

        return (
          <div
            key={basket.id}
            className="rounded-xl border bg-white p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-semibold">
                  {basket.name ??
                    basket.symbol}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  {basket.side}{" "}
                  {basket.totalQuantity}{" "}
                  {basket.symbol} •{" "}
                  {basket.exchange} •{" "}
                  {
                    basket.allocationMethod
                  }
                </p>
              </div>

              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium">
                {basket.status}
              </span>
            </div>

            <div className="mt-4 space-y-2">
              {basket.orders.map(
                (order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3 text-sm"
                  >
                    <div>
                      <p className="font-medium">
                        {
                          order
                            .portfolio
                            .client
                            .name
                        }
                      </p>

                      {order
                        .brokerAccount && (
                        <p className="text-xs text-slate-500">
                          {
                            order
                              .brokerAccount
                              .broker
                          }{" "}
                          •{" "}
                          {
                            order
                              .brokerAccount
                              .accountId
                          }
                        </p>
                      )}
                    </div>

                    <div className="text-right">
                      <p>
                        Qty{" "}
                        {order.quantity}
                      </p>

                      <p className="text-xs text-slate-500">
                        {order.status}
                      </p>
                    </div>
                  </div>
                ),
              )}
            </div>

            <div className="mt-4 flex gap-2">
              {basket.status ===
                "PENDING" && (
                <button
                  disabled={busy}
                  onClick={() =>
                    runAction(
                      basket.id,
                      "execute",
                    )
                  }
                  className="rounded-lg bg-slate-900 px-4 py-2 text-sm text-white disabled:opacity-60"
                >
                  {busy
                    ? "Executing..."
                    : "Execute Basket"}
                </button>
              )}

              {[
                "SUBMITTED",
                "PARTIALLY_SUBMITTED",
                "PARTIALLY_FILLED",
              ].includes(
                basket.status,
              ) && (
                <button
                  disabled={busy}
                  onClick={() =>
                    runAction(
                      basket.id,
                      "sync",
                    )
                  }
                  className="rounded-lg border px-4 py-2 text-sm disabled:opacity-60"
                >
                  {busy
                    ? "Syncing..."
                    : "Sync Basket"}
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}