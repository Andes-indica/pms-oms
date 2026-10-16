import {
  useEffect,
  useState,
} from "react";

import {
  apiFetch,
} from "../lib/api";
import {
  getClientConfirmationGuidance,
} from "../components/client-confirmation-guidance";

type Confirmation = {
  status: string;
  expiresAt: string;
  confirmedAt?: string | null;
  lastError?: string | null;
  canHandoff: boolean;
  canDecline: boolean;
  order: {
    id: string;
    symbol: string;
    exchange: string;
    side: "BUY" | "SELL";
    orderType: "MARKET" | "LIMIT";
    quantity: number;
    limitPrice?: string | null;
    clientName: string;
    portfolioName: string;
    broker: string;
    brokerAccountLabel: string;
    maskedBrokerAccountId: string;
    basketName?: string | null;
  };
};

type Handoff = {
  action: string;
  apiKey: string;
  basket: Array<Record<string, unknown>>;
};

function readToken() {
  const fragment =
    new URLSearchParams(
      window.location.hash
        .replace(/^#/, ""),
    );

  return fragment.get("token") ?? "";
}

export function ClientOrderConfirmationPage() {
  const [token] =
    useState(readToken);
  const [confirmation, setConfirmation] =
    useState<Confirmation | null>(null);
  const [loading, setLoading] =
    useState(true);
  const [submitting, setSubmitting] =
    useState(false);
  const [error, setError] =
    useState("");
  const [notice, setNotice] =
    useState("");
  const [accountAcknowledged, setAccountAcknowledged] =
    useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!token) {
        setError(
          "This confirmation link is incomplete.",
        );
        setLoading(false);
        return;
      }

      try {
        const response =
          await apiFetch<{
            data: Confirmation;
          }>(
            "/api/client-order-confirmations/lookup",
            {
              method: "POST",
              body: JSON.stringify({
                token,
              }),
            },
          );

        if (!cancelled) {
          setConfirmation(
            response.data,
          );
        }
      } catch (error) {
        if (!cancelled) {
          setError(
            getClientConfirmationGuidance(
              error,
            ),
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, [token]);

  async function continueToZerodha() {
    try {
      setSubmitting(true);
      setError("");

      const response =
        await apiFetch<{
          data: Handoff;
        }>(
          "/api/client-order-confirmations/handoff",
          {
            method: "POST",
            body: JSON.stringify({
              token,
            }),
          },
        );

      sessionStorage.setItem(
        "pendingClientConfirmationToken",
        token,
      );

      const form =
        document.createElement("form");
      form.method = "POST";
      form.action = response.data.action;

      const apiKey =
        document.createElement("input");
      apiKey.type = "hidden";
      apiKey.name = "api_key";
      apiKey.value = response.data.apiKey;

      const data =
        document.createElement("input");
      data.type = "hidden";
      data.name = "data";
      data.value = JSON.stringify(
        response.data.basket,
      );

      form.append(apiKey, data);
      document.body.appendChild(form);
      form.submit();
    } catch (error) {
      setError(
        getClientConfirmationGuidance(
          error,
        ),
      );
      setSubmitting(false);
    }
  }

  async function decline() {
    try {
      setSubmitting(true);
      setError("");

      await apiFetch(
        "/api/client-order-confirmations/decline",
        {
          method: "POST",
          body: JSON.stringify({
            token,
          }),
        },
      );

      setNotice(
        "The order was declined. Nothing was sent to Zerodha.",
      );
      setConfirmation((current) =>
        current
          ? {
              ...current,
              status: "DECLINED",
              canHandoff: false,
            }
          : current,
      );
    } catch (error) {
      setError(
        getClientConfirmationGuidance(
          error,
        ),
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
      <section className="w-full max-w-xl rounded-2xl border bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Order confirmation
        </p>
        <h1 className="mt-2 text-2xl font-semibold text-slate-900">
          Review before opening Zerodha
        </h1>

        {loading && (
          <p className="mt-5 text-sm text-slate-600">
            Loading order details...
          </p>
        )}

        {confirmation && (
          <>
            <dl className="mt-6 grid gap-4 rounded-xl bg-slate-50 p-4 sm:grid-cols-2">
              <Detail label="Client" value={confirmation.order.clientName} />
              <Detail label="Portfolio" value={confirmation.order.portfolioName} />
              <Detail label="Order" value={`${confirmation.order.side} ${confirmation.order.quantity} ${confirmation.order.symbol}`} />
              <Detail label="Exchange" value={confirmation.order.exchange} />
              <Detail label="Type" value={confirmation.order.orderType} />
              <Detail
                label="Price"
                value={
                  confirmation.order.orderType === "LIMIT"
                    ? confirmation.order.limitPrice ?? "—"
                    : "Market"
                }
              />
              <Detail label="Broker" value={confirmation.order.broker} />
              <Detail label="Account" value={`${confirmation.order.brokerAccountLabel} · ${confirmation.order.maskedBrokerAccountId}`} />
              <Detail label="Status" value={confirmation.status.replaceAll("_", " ")} />
              <Detail label="Link expires" value={new Date(confirmation.expiresAt).toLocaleString()} />
            </dl>

            <p className="mt-4 text-sm text-slate-600">
              Zerodha will ask you to sign in to your own Kite account and show the final order for review. The order cannot be changed from this link.
            </p>

            {confirmation.canHandoff && (
              <label className="mt-4 flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
                <input
                  type="checkbox"
                  checked={accountAcknowledged}
                  onChange={(event) =>
                    setAccountAcknowledged(event.target.checked)
                  }
                  className="mt-0.5"
                />
                <span>
                  I will sign in to the intended Zerodha account ending {confirmation.order.maskedBrokerAccountId.slice(-4)}. This Publisher-only link cannot verify the account after login.
                </span>
              </label>
            )}

            {confirmation.canHandoff && (
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  disabled={
                    submitting ||
                    !accountAcknowledged
                  }
                  onClick={() => void continueToZerodha()}
                  className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white disabled:opacity-60"
                >
                  {submitting
                    ? "Opening Zerodha..."
                    : "Review and place in Zerodha"}
                </button>
                {confirmation.canDecline && (
                  <button
                    type="button"
                    disabled={submitting}
                    onClick={() => void decline()}
                    className="rounded-lg border px-5 py-2.5 text-sm font-medium text-slate-700 disabled:opacity-60"
                  >
                    Decline order
                  </button>
                )}
              </div>
            )}
          </>
        )}

        {notice && (
          <p role="status" className="mt-5 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">
            {notice}
          </p>
        )}

        {error && (
          <p role="alert" className="mt-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </p>
        )}
      </section>
    </main>
  );
}

function Detail({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
        {label}
      </dt>
      <dd className="mt-1 text-sm font-medium text-slate-900">
        {value}
      </dd>
    </div>
  );
}
