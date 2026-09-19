import {
  useEffect,
  useMemo,
  useState,
  type FormEvent,
} from "react";

import { apiFetch } from "../../lib/api";

type Client = {
  id: string;
  name: string;

  brokerAccounts: Array<{
    id: string;
    broker: string;
    accountId: string;
  }>;

  portfolios: Array<{
    id: string;
    name: string;
  }>;
};

type ClientsResponse = {
  data: Client[];
};

type AllocationMethod =
  | "EQUAL_QUANTITY"
  | "FIXED_QUANTITY"
  | "PERCENTAGE";

type Target = {
  clientId: string;
  portfolioId: string;
  brokerAccountId: string;
  quantity: string;
  percentage: string;
};

type Props = {
  onCreated?: () => void;
};

export function CreateBasketOrderForm({
  onCreated,
}: Props) {
  const [clients, setClients] =
    useState<Client[]>([]);

  const [name, setName] =
    useState("");

  const [symbol, setSymbol] =
    useState("");

  const [exchange, setExchange] =
    useState("NSE");

  const [side, setSide] =
    useState<"BUY" | "SELL">("BUY");

  const [orderType, setOrderType] =
    useState<"MARKET" | "LIMIT">(
      "MARKET",
    );

  const [limitPrice, setLimitPrice] =
    useState("");

  const [
    totalQuantity,
    setTotalQuantity,
  ] = useState(1);

  const [
    allocationMethod,
    setAllocationMethod,
  ] =
    useState<AllocationMethod>(
      "EQUAL_QUANTITY",
    );

  const [targets, setTargets] =
    useState<Target[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  useEffect(() => {
    async function loadClients() {
      try {
        const response =
          await apiFetch<ClientsResponse>(
            "/api/clients",
          );

        setClients(response.data);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Failed to load clients",
        );
      }
    }

    loadClients();
  }, []);

  const selectedClientIds =
    useMemo(
      () =>
        new Set(
          targets.map(
            (target) =>
              target.clientId,
          ),
        ),
      [targets],
    );

  function toggleClient(
    client: Client,
  ) {
    if (
      selectedClientIds.has(
        client.id,
      )
    ) {
      setTargets((current) =>
        current.filter(
          (target) =>
            target.clientId !==
            client.id,
        ),
      );

      return;
    }

    const portfolio =
      client.portfolios?.[0];

    const brokerAccount =
      client.brokerAccounts?.[0];

    if (
      !portfolio ||
      !brokerAccount
    ) {
      setError(
        `${client.name} does not have a portfolio or broker account`,
      );

      return;
    }

    setTargets((current) => [
      ...current,

      {
        clientId: client.id,
        portfolioId:
          portfolio.id,
        brokerAccountId:
          brokerAccount.id,
        quantity: "",
        percentage: "",
      },
    ]);
  }

  function updateTarget(
    clientId: string,
    field:
      | "quantity"
      | "percentage",
    value: string,
  ) {
    setTargets((current) =>
      current.map((target) =>
        target.clientId ===
        clientId
          ? {
              ...target,
              [field]: value,
            }
          : target,
      ),
    );
  }

  async function handleSubmit(
    event: FormEvent,
  ) {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      if (!symbol) {
        setError(
          "Symbol is required",
        );
        return;
      }

      if (
        totalQuantity <= 0
      ) {
        setError(
          "Total quantity must be greater than zero",
        );
        return;
      }

      if (
        targets.length === 0
      ) {
        setError(
          "Select at least one client",
        );
        return;
      }

      if (
        orderType === "LIMIT" &&
        Number(limitPrice) <= 0
      ) {
        setError(
          "Valid limit price required",
        );
        return;
      }

      const payloadTargets =
        targets.map(
          (target) => ({
            portfolioId:
              target.portfolioId,

            brokerAccountId:
              target.brokerAccountId,

            ...(allocationMethod ===
            "FIXED_QUANTITY"
              ? {
                  quantity:
                    Number(
                      target.quantity,
                    ),
                }
              : {}),

            ...(allocationMethod ===
            "PERCENTAGE"
              ? {
                  percentage:
                    Number(
                      target.percentage,
                    ),
                }
              : {}),
          }),
        );

      await apiFetch(
        "/api/basket-orders",
        {
          method: "POST",

          body: JSON.stringify({
            name:
              name ||
              `${symbol.toUpperCase()} Basket`,

            symbol:
              symbol.toUpperCase(),

            exchange:
              exchange.toUpperCase(),

            side,

            orderType,

            totalQuantity,

            allocationMethod,

            ...(orderType ===
            "LIMIT"
              ? {
                  limitPrice:
                    Number(
                      limitPrice,
                    ),
                }
              : {}),

            targets:
              payloadTargets,
          }),
        },
      );

      setSuccess(
        "Basket order created successfully",
      );

      setName("");
      setSymbol("");
      setTotalQuantity(1);
      setLimitPrice("");
      setTargets([]);

      onCreated?.();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Basket creation failed",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border bg-white p-5"
    >
      <h3 className="text-lg font-semibold">
        Create Basket Order
      </h3>

      <p className="mt-1 text-sm text-slate-500">
        Create one trade instruction
        across multiple client
        portfolios.
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <Field label="Basket Name">
          <input
            value={name}
            onChange={(event) =>
              setName(
                event.target.value,
              )
            }
            placeholder="RELIANCE accumulation"
            className="w-full rounded-lg border px-3 py-2"
          />
        </Field>

        <Field label="Symbol">
          <input
            value={symbol}
            onChange={(event) =>
              setSymbol(
                event.target.value,
              )
            }
            placeholder="RELIANCE"
            className="w-full rounded-lg border px-3 py-2 uppercase"
          />
        </Field>

        <Field label="Exchange">
          <select
            value={exchange}
            onChange={(event) =>
              setExchange(
                event.target.value,
              )
            }
            className="w-full rounded-lg border px-3 py-2"
          >
            <option value="NSE">
              NSE
            </option>

            <option value="BSE">
              BSE
            </option>
          </select>
        </Field>

        <Field label="Side">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() =>
                setSide("BUY")
              }
              className={`flex-1 rounded-lg border px-3 py-2 ${
                side === "BUY"
                  ? "bg-slate-900 text-white"
                  : ""
              }`}
            >
              BUY
            </button>

            <button
              type="button"
              onClick={() =>
                setSide("SELL")
              }
              className={`flex-1 rounded-lg border px-3 py-2 ${
                side === "SELL"
                  ? "bg-slate-900 text-white"
                  : ""
              }`}
            >
              SELL
            </button>
          </div>
        </Field>

        <Field label="Order Type">
          <select
            value={orderType}
            onChange={(event) =>
              setOrderType(
                event.target.value as
                  | "MARKET"
                  | "LIMIT",
              )
            }
            className="w-full rounded-lg border px-3 py-2"
          >
            <option value="MARKET">
              MARKET
            </option>

            <option value="LIMIT">
              LIMIT
            </option>
          </select>
        </Field>

        <Field label="Total Quantity">
          <input
            type="number"
            min="1"
            value={totalQuantity}
            onChange={(event) =>
              setTotalQuantity(
                Number(
                  event.target.value,
                ),
              )
            }
            className="w-full rounded-lg border px-3 py-2"
          />
        </Field>

        {orderType ===
          "LIMIT" && (
          <Field label="Limit Price">
            <input
              type="number"
              min="0"
              step="0.01"
              value={limitPrice}
              onChange={(event) =>
                setLimitPrice(
                  event.target.value,
                )
              }
              className="w-full rounded-lg border px-3 py-2"
            />
          </Field>
        )}

        <Field label="Allocation">
          <select
            value={
              allocationMethod
            }
            onChange={(event) =>
              setAllocationMethod(
                event.target
                  .value as AllocationMethod,
              )
            }
            className="w-full rounded-lg border px-3 py-2"
          >
            <option value="EQUAL_QUANTITY">
              Equal Quantity
            </option>

            <option value="FIXED_QUANTITY">
              Fixed Quantity
            </option>

            <option value="PERCENTAGE">
              Percentage
            </option>
          </select>
        </Field>
      </div>

      <div className="mt-6">
        <h4 className="font-medium">
          Select Clients
        </h4>

        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {clients.map(
            (client) => {
              const selected =
                selectedClientIds.has(
                  client.id,
                );

              const target =
                targets.find(
                  (item) =>
                    item.clientId ===
                    client.id,
                );

              return (
                <div
                  key={client.id}
                  className="rounded-lg border p-4"
                >
                  <label className="flex cursor-pointer items-center gap-3">
                    <input
                      type="checkbox"
                      checked={
                        selected
                      }
                      onChange={() =>
                        toggleClient(
                          client,
                        )
                      }
                    />

                    <div>
                      <p className="font-medium">
                        {
                          client.name
                        }
                      </p>

                      <p className="text-xs text-slate-500">
                        {
                          client
                            .portfolios?.[0]
                            ?.name
                        }
                      </p>
                    </div>
                  </label>

                  {selected &&
                    allocationMethod ===
                      "FIXED_QUANTITY" && (
                      <input
                        type="number"
                        min="1"
                        placeholder="Quantity"
                        value={
                          target?.quantity ??
                          ""
                        }
                        onChange={(
                          event,
                        ) =>
                          updateTarget(
                            client.id,
                            "quantity",
                            event
                              .target
                              .value,
                          )
                        }
                        className="mt-3 w-full rounded-lg border px-3 py-2"
                      />
                    )}

                  {selected &&
                    allocationMethod ===
                      "PERCENTAGE" && (
                      <input
                        type="number"
                        min="0"
                        max="100"
                        step="0.01"
                        placeholder="Percentage"
                        value={
                          target?.percentage ??
                          ""
                        }
                        onChange={(
                          event,
                        ) =>
                          updateTarget(
                            client.id,
                            "percentage",
                            event
                              .target
                              .value,
                          )
                        }
                        className="mt-3 w-full rounded-lg border px-3 py-2"
                      />
                    )}
                </div>
              );
            },
          )}
        </div>
      </div>

      {error && (
        <p className="mt-4 text-sm text-red-600">
          {error}
        </p>
      )}

      {success && (
        <p className="mt-4 text-sm text-green-700">
          {success}
        </p>
      )}

      <button
        disabled={loading}
        className="mt-5 rounded-lg bg-slate-900 px-5 py-2.5 font-medium text-white disabled:opacity-60"
      >
        {loading
          ? "Creating..."
          : "Create Basket"}
      </button>
    </form>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </label>

      {children}
    </div>
  );
}