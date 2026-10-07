import {
  useEffect,
  useState,
} from "react";

import {
  apiFetch,
} from "../../lib/api";

import {
  formatCurrency,
} from "./utils";

type CashTransaction = {
  id: string;
  type:
    | "DEPOSIT"
    | "WITHDRAWAL"
    | "ADJUSTMENT"
    | "BUY_FILL"
    | "SELL_FILL"
    | "BROKER_RECONCILIATION";
  amount: string;
  balanceAfter: string;
  note?: string | null;
  referenceType?: string | null;
  referenceId?: string | null;
  createdAt: string;
};

type Props = {
  portfolioId: string;
  cashBalance:
    | string
    | number;
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

export function CashLedgerCard({
  portfolioId,
  cashBalance,
}: Props) {
  const [items, setItems] =
    useState<
      CashTransaction[]
    >([]);

  const [balance, setBalance] =
    useState(
      Number(cashBalance),
    );

  const [type, setType] =
    useState<
      "DEPOSIT" |
      "WITHDRAWAL" |
      "ADJUSTMENT"
    >("DEPOSIT");

  const [amount, setAmount] =
    useState("");

  const [note, setNote] =
    useState("");

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const role =
    getCurrentRole();

  const canManage =
    role === "ADMIN" ||
    role ===
      "PORTFOLIO_MANAGER" ||
    role === "OPERATIONS";

  async function load() {
    try {
      const response =
        await apiFetch<{
          data:
            CashTransaction[];
        }>(
          `/api/portfolios/${portfolioId}/cash-transactions`,
        );

      setItems(
        response.data,
      );

      if (
        response.data[0]
      ) {
        setBalance(
          Number(
            response.data[0]
              .balanceAfter,
          ),
        );
      } else {
        setBalance(
          Number(
            cashBalance,
          ),
        );
      }
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to load cash ledger",
      );
    }
  }

  useEffect(() => {
    void load();
  }, [
    portfolioId,
    cashBalance,
  ]);

  async function submit() {
    const parsed =
      Number(amount);

    if (
      !Number.isFinite(parsed) ||
      parsed === 0
    ) {
      setError(
        "Enter a non-zero amount.",
      );

      return;
    }

    if (
      type !==
        "ADJUSTMENT" &&
      parsed < 0
    ) {
      setError(
        "Deposit and withdrawal amounts must be positive.",
      );

      return;
    }

    try {
      setSaving(true);
      setError("");

      const response =
        await apiFetch<{
          data: {
            portfolio: {
              cashBalance:
                string;
            };
          };
        }>(
          `/api/portfolios/${portfolioId}/cash-transactions`,
          {
            method: "POST",
            body:
              JSON.stringify({
                type,
                amount:
                  parsed,
                note:
                  note.trim() ||
                  undefined,
              }),
          },
        );

      setBalance(
        Number(
          response.data
            .portfolio
            .cashBalance,
        ),
      );

      setAmount("");
      setNote("");

      await load();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to update cash",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="rounded-xl border bg-white p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h4 className="font-medium">
            Cash Ledger
          </h4>

          <p className="mt-1 text-sm text-slate-500">
            Current balance:{" "}
            <span className="font-medium text-slate-900">
              {formatCurrency(
                balance,
              )}
            </span>
          </p>
        </div>
      </div>

      {error && (
        <p className="mt-3 text-sm text-red-600">
          {error}
        </p>
      )}

      {canManage && (
        <div className="mt-4 grid gap-3 md:grid-cols-[1fr_1fr_2fr_auto]">
          <select
            value={type}
            onChange={(event) =>
              setType(
                event.target.value as
                  | "DEPOSIT"
                  | "WITHDRAWAL"
                  | "ADJUSTMENT",
              )
            }
            className="rounded-lg border bg-white px-3 py-2"
          >
            <option value="DEPOSIT">
              Deposit
            </option>
            <option value="WITHDRAWAL">
              Withdrawal
            </option>
            <option value="ADJUSTMENT">
              Adjustment
            </option>
          </select>

          <input
            value={amount}
            onChange={(event) =>
              setAmount(
                event.target.value,
              )
            }
            type="number"
            step="0.01"
            placeholder={
              type === "ADJUSTMENT"
                ? "Signed amount"
                : "Amount"
            }
            className="rounded-lg border px-3 py-2"
          />

          <input
            value={note}
            onChange={(event) =>
              setNote(
                event.target.value,
              )
            }
            placeholder="Note"
            className="rounded-lg border px-3 py-2"
          />

          <button
            type="button"
            disabled={saving}
            onClick={() =>
              void submit()
            }
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
          >
            {saving
              ? "Saving..."
              : "Apply"}
          </button>
        </div>
      )}

      <div className="mt-5 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b text-slate-500">
            <tr>
              <th className="py-2 pr-3">
                Time
              </th>
              <th className="py-2 pr-3">
                Type
              </th>
              <th className="py-2 pr-3">
                Amount
              </th>
              <th className="py-2 pr-3">
                Balance
              </th>
              <th className="py-2">
                Note
              </th>
            </tr>
          </thead>

          <tbody>
            {items.slice(
              0,
              10,
            ).map(
              (item) => (
                <tr
                  key={item.id}
                  className="border-b last:border-b-0"
                >
                  <td className="py-2 pr-3 text-slate-500">
                    {new Date(
                      item.createdAt,
                    ).toLocaleString()}
                  </td>
                  <td className="py-2 pr-3">
                    {item.type}
                  </td>
                  <td className="py-2 pr-3">
                    {Number(
                      item.amount,
                    ) >= 0
                      ? "+"
                      : ""}
                    {formatCurrency(
                      Number(
                        item.amount,
                      ),
                    )}
                  </td>
                  <td className="py-2 pr-3">
                    {formatCurrency(
                      Number(
                        item.balanceAfter,
                      ),
                    )}
                  </td>
                  <td className="py-2 text-slate-600">
                    {item.note ??
                      "—"}
                  </td>
                </tr>
              ),
            )}

            {items.length ===
              0 && (
              <tr>
                <td
                  colSpan={5}
                  className="py-6 text-center text-slate-500"
                >
                  No cash transactions yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
