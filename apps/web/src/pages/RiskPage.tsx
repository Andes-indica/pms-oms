import {
  useEffect,
  useState,
} from "react";

import {
  apiFetch,
} from "../lib/api";

type RestrictedSecurity = {
  id: string;
  symbol: string;
  exchange: string;
  reason?: string | null;
  firmId?: string | null;
};

function getCurrentRole() {
  const raw =
    localStorage.getItem(
      "user",
    );

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw)
      ?.role as string | undefined;
  } catch {
    return null;
  }
}

export function RiskPage() {
  const [items, setItems] =
    useState<
      RestrictedSecurity[]
    >([]);

  const [symbol, setSymbol] =
    useState("");

  const [exchange, setExchange] =
    useState("NSE");

  const [reason, setReason] =
    useState("");

  const [error, setError] =
    useState("");

  const [saving, setSaving] =
    useState(false);

  const role =
    getCurrentRole();

  const canManage =
    role === "ADMIN" ||
    role ===
      "PORTFOLIO_MANAGER";

  async function load() {
    try {
      setError("");

      const response =
        await apiFetch<{
          data:
            RestrictedSecurity[];
        }>(
          "/api/risk/restricted-securities",
        );

      setItems(
        response.data,
      );
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to load restrictions",
      );
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function add() {
    if (
      !symbol.trim() ||
      !exchange.trim()
    ) {
      setError(
        "Symbol and exchange are required.",
      );

      return;
    }

    try {
      setSaving(true);
      setError("");

      await apiFetch(
        "/api/risk/restricted-securities",
        {
          method: "POST",
          body: JSON.stringify({
            symbol:
              symbol.trim(),
            exchange:
              exchange.trim(),
            reason:
              reason.trim() ||
              undefined,
          }),
        },
      );

      setSymbol("");
      setReason("");

      await load();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to add restriction",
      );
    } finally {
      setSaving(false);
    }
  }

  async function remove(
    item: RestrictedSecurity,
  ) {
    if (
      item.firmId === null
    ) {
      return;
    }

    if (
      !window.confirm(
        `Remove restriction for ${item.exchange}:${item.symbol}?`,
      )
    ) {
      return;
    }

    try {
      setSaving(true);
      setError("");

      await apiFetch(
        `/api/risk/restricted-securities/${item.id}`,
        {
          method: "DELETE",
        },
      );

      await load();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to remove restriction",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">
          Risk Controls
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Manage firm-wide restricted securities. Portfolio-specific numeric limits are configured from each client portfolio.
        </p>
      </div>

      {error && (
        <div className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {canManage && (
        <section className="mt-6 rounded-xl border bg-white p-5">
          <h3 className="font-medium text-slate-900">
            Restrict Security
          </h3>

          <div className="mt-4 grid gap-3 md:grid-cols-[1fr_1fr_2fr_auto]">
            <input
              value={symbol}
              onChange={(event) =>
                setSymbol(
                  event.target.value,
                )
              }
              placeholder="Symbol"
              className="rounded-lg border px-3 py-2 uppercase"
            />

            <input
              value={exchange}
              onChange={(event) =>
                setExchange(
                  event.target.value,
                )
              }
              placeholder="Exchange"
              className="rounded-lg border px-3 py-2 uppercase"
            />

            <input
              value={reason}
              onChange={(event) =>
                setReason(
                  event.target.value,
                )
              }
              placeholder="Reason (optional)"
              className="rounded-lg border px-3 py-2"
            />

            <button
              type="button"
              disabled={saving}
              onClick={() =>
                void add()
              }
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
            >
              Add
            </button>
          </div>
        </section>
      )}

      <section className="mt-6 overflow-hidden rounded-xl border bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b bg-slate-50 text-slate-600">
            <tr>
              <th className="px-5 py-3">
                Instrument
              </th>
              <th className="px-5 py-3">
                Reason
              </th>
              <th className="px-5 py-3">
                Scope
              </th>
              <th className="px-5 py-3" />
            </tr>
          </thead>

          <tbody>
            {items.map(
              (item) => (
                <tr
                  key={item.id}
                  className="border-b last:border-b-0"
                >
                  <td className="px-5 py-4 font-medium">
                    {item.exchange}:{item.symbol}
                  </td>

                  <td className="px-5 py-4 text-slate-600">
                    {item.reason ?? "—"}
                  </td>

                  <td className="px-5 py-4">
                    {item.firmId
                      ? "Firm"
                      : "Global"}
                  </td>

                  <td className="px-5 py-4 text-right">
                    {canManage &&
                      item.firmId && (
                        <button
                          type="button"
                          disabled={saving}
                          onClick={() =>
                            void remove(
                              item,
                            )
                          }
                          className="text-sm text-red-700 disabled:opacity-50"
                        >
                          Remove
                        </button>
                      )}
                  </td>
                </tr>
              ),
            )}

            {items.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-5 py-8 text-center text-slate-500"
                >
                  No restricted securities.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}
