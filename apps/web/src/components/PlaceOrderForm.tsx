import { useEffect, useMemo, useState, type FormEvent } from "react";
import { apiFetch } from "../lib/api";

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

type CreateOrderResponse = {
  data: {
    id: string;
    symbol: string;
    side: string;
    quantity: number;
    status: string;
  };
};

type Props = {
  onCreated?: () => void;
};

export function PlaceOrderForm({
  onCreated,
}: Props) {
  const [clients, setClients] =
    useState<Client[]>([]);

  const [clientId, setClientId] =
    useState("");

  const [portfolioId, setPortfolioId] =
    useState("");

  const [
    brokerAccountId,
    setBrokerAccountId,
  ] = useState("");

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

  const [quantity, setQuantity] =
    useState(1);

  const [limitPrice, setLimitPrice] =
    useState("");

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

  const selectedClient = useMemo(
    () =>
      clients.find(
        (client) =>
          client.id === clientId,
      ),
    [clients, clientId],
  );

  function handleClientChange(
    value: string,
  ) {
    setClientId(value);

    const client = clients.find(
      (item) => item.id === value,
    );

    setPortfolioId(
      client?.portfolios?.[0]?.id ?? "",
    );

    setBrokerAccountId(
      client?.brokerAccounts?.[0]?.id ?? "",
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

      if (
        !portfolioId ||
        !brokerAccountId ||
        !symbol ||
        quantity <= 0
      ) {
        setError(
          "Please complete all required fields",
        );
        return;
      }

      const payload = {
        portfolioId,
        brokerAccountId,
        symbol: symbol.toUpperCase(),
        exchange: exchange.toUpperCase(),
        side,
        orderType,
        quantity,
        ...(orderType === "LIMIT"
          ? {
              limitPrice:
                Number(limitPrice),
            }
          : {}),
      };

      const response =
        await apiFetch<CreateOrderResponse>(
          "/api/orders",
          {
            method: "POST",
            body: JSON.stringify(payload),
          },
        );

      setSuccess(
        `Order ${response.data.id} created`,
      );

      setSymbol("");
      setQuantity(1);
      setLimitPrice("");

      onCreated?.();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Order creation failed",
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
      <div>
        <h3 className="text-lg font-semibold">
          Place Order
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Create a new order for a client portfolio.
        </p>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <Field label="Client">
          <select
            value={clientId}
            onChange={(event) =>
              handleClientChange(
                event.target.value,
              )
            }
            className="w-full rounded-lg border px-3 py-2"
          >
            <option value="">
              Select client
            </option>

            {clients.map((client) => (
              <option
                key={client.id}
                value={client.id}
              >
                {client.name}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Portfolio">
          <select
            value={portfolioId}
            onChange={(event) =>
              setPortfolioId(
                event.target.value,
              )
            }
            className="w-full rounded-lg border px-3 py-2"
          >
            <option value="">
              Select portfolio
            </option>

            {selectedClient?.portfolios?.map(
              (portfolio) => (
                <option
                  key={portfolio.id}
                  value={portfolio.id}
                >
                  {portfolio.name}
                </option>
              ),
            )}
          </select>
        </Field>

        <Field label="Broker Account">
          <select
            value={brokerAccountId}
            onChange={(event) =>
              setBrokerAccountId(
                event.target.value,
              )
            }
            className="w-full rounded-lg border px-3 py-2"
          >
            <option value="">
              Select broker account
            </option>

            {selectedClient?.brokerAccounts?.map(
              (account) => (
                <option
                  key={account.id}
                  value={account.id}
                >
                  {account.broker} (
                  {account.accountId})
                </option>
              ),
            )}
          </select>
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
                  : "bg-white"
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
                  : "bg-white"
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

        <Field label="Quantity">
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(event) =>
              setQuantity(
                Number(
                  event.target.value,
                ),
              )
            }
            className="w-full rounded-lg border px-3 py-2"
          />
        </Field>

        {orderType === "LIMIT" && (
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
          : "Create Order"}
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