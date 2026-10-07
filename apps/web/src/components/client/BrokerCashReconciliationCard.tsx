import {
  useState,
} from "react";

import {
  apiFetch,
} from "../../lib/api";

import type {
  BrokerAccount,
  Portfolio,
} from "./types";

import {
  formatCurrency,
} from "./utils";

type CashReconciliation = {
  brokerAccountId: string;
  broker: string;
  accountId: string;
  status:
    | "MATCH"
    | "MISMATCH"
    | "UNCONFIGURED";

  brokerAvailableCash: number;
  brokerNetAvailable: number;
  brokerUsedMargin: number;

  pmsAllocatedCash: number;
  difference: number;

  allocations: Array<{
    id: string;
    portfolioId: string;
    portfolioName: string;
    portfolioCashBalance: number;
    allocatedCash: number;
  }>;

  fetchedAt: string;
};

type Props = {
  account: BrokerAccount;
  portfolios: Portfolio[];
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

export function BrokerCashReconciliationCard({
  account,
  portfolios,
}: Props) {
  const [data, setData] =
    useState<
      CashReconciliation | null
    >(null);

  const [
    selectedPortfolioId,
    setSelectedPortfolioId,
  ] =
    useState("");

  const [amount, setAmount] =
    useState("");

  const [loading, setLoading] =
    useState(false);

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
    role ===
      "OPERATIONS";

  async function load() {
    try {
      setLoading(true);
      setError("");

      const response =
        await apiFetch<{
          data:
            CashReconciliation;
        }>(
          `/api/broker-accounts/${account.id}/cash-reconciliation`,
        );

      setData(
        response.data,
      );
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to reconcile broker cash",
      );
    } finally {
      setLoading(false);
    }
  }

  async function saveAllocation() {
    if (
      !selectedPortfolioId
    ) {
      setError(
        "Select a portfolio.",
      );

      return;
    }

    const parsed =
      Number(amount);

    if (
      !Number.isFinite(parsed) ||
      parsed < 0
    ) {
      setError(
        "Allocation must be a non-negative number.",
      );

      return;
    }

    try {
      setSaving(true);
      setError("");

      await apiFetch(
        `/api/broker-accounts/${account.id}/cash-allocations`,
        {
          method: "PUT",
          body:
            JSON.stringify({
              portfolioId:
                selectedPortfolioId,
              amount:
                parsed,
            }),
        },
      );

      setAmount("");

      await load();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to save broker cash allocation",
      );
    } finally {
      setSaving(false);
    }
  }

  async function removeAllocation(
    portfolioId: string,
  ) {
    if (
      !window.confirm(
        "Remove this broker cash allocation?",
      )
    ) {
      return;
    }

    try {
      setSaving(true);
      setError("");

      await apiFetch(
        `/api/broker-accounts/${account.id}/cash-allocations/${portfolioId}`,
        {
          method: "DELETE",
        },
      );

      await load();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to remove broker cash allocation",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mt-5 rounded-lg border bg-slate-50 p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-900">
            Broker Cash Reconciliation
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Compare broker available cash with PMS cash explicitly allocated to this broker account.
          </p>
        </div>

        <button
          type="button"
          disabled={loading}
          onClick={() =>
            void load()
          }
          className="rounded-lg border bg-white px-3 py-2 text-xs disabled:opacity-50"
        >
          {loading
            ? "Checking..."
            : data
              ? "Refresh"
              : "Check Cash"}
        </button>
      </div>

      {error && (
        <p className="mt-3 text-sm text-red-600">
          {error}
        </p>
      )}

      {data && (
        <>
          <div className="mt-4 grid gap-3 sm:grid-cols-4">
            <Metric
              label="Status"
              value={
                data.status
              }
            />

            <Metric
              label="Broker Available"
              value={formatCurrency(
                data
                  .brokerAvailableCash,
              )}
            />

            <Metric
              label="PMS Allocated"
              value={formatCurrency(
                data
                  .pmsAllocatedCash,
              )}
            />

            <Metric
              label="Difference"
              value={formatCurrency(
                data.difference,
              )}
            />
          </div>

          {data.allocations.length >
            0 && (
            <div className="mt-4 space-y-2">
              {data.allocations.map(
                (allocation) => (
                  <div
                    key={
                      allocation.id
                    }
                    className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-white px-3 py-2 text-sm"
                  >
                    <div>
                      <p className="font-medium">
                        {
                          allocation
                            .portfolioName
                        }
                      </p>

                      <p className="text-xs text-slate-500">
                        Portfolio cash{" "}
                        {formatCurrency(
                          allocation
                            .portfolioCashBalance,
                        )}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span>
                        {formatCurrency(
                          allocation
                            .allocatedCash,
                        )}
                      </span>

                      {canManage && (
                        <button
                          type="button"
                          disabled={
                            saving
                          }
                          onClick={() =>
                            void removeAllocation(
                              allocation
                                .portfolioId,
                            )
                          }
                          className="text-xs text-red-700 disabled:opacity-50"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                ),
              )}
            </div>
          )}

          {canManage && (
            <div className="mt-4 grid gap-2 sm:grid-cols-[1fr_1fr_auto]">
              <select
                value={
                  selectedPortfolioId
                }
                onChange={(event) => {
                  const portfolioId =
                    event.target.value;

                  setSelectedPortfolioId(
                    portfolioId,
                  );

                  const existing =
                    data.allocations.find(
                      (allocation) =>
                        allocation
                          .portfolioId ===
                        portfolioId,
                    );

                  setAmount(
                    existing
                      ? String(
                          existing
                            .allocatedCash,
                        )
                      : "",
                  );
                }}
                className="rounded-lg border bg-white px-3 py-2 text-sm"
              >
                <option value="">
                  Select portfolio
                </option>

                {portfolios.map(
                  (portfolio) => (
                    <option
                      key={
                        portfolio.id
                      }
                      value={
                        portfolio.id
                      }
                    >
                      {
                        portfolio.name
                      }
                    </option>
                  ),
                )}
              </select>

              <input
                value={amount}
                onChange={(event) =>
                  setAmount(
                    event.target.value,
                  )
                }
                type="number"
                min="0"
                step="0.01"
                placeholder="Allocated cash"
                className="rounded-lg border bg-white px-3 py-2 text-sm"
              />

              <button
                type="button"
                disabled={saving}
                onClick={() =>
                  void saveAllocation()
                }
                className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white disabled:opacity-50"
              >
                {saving
                  ? "Saving..."
                  : "Save Allocation"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function Metric({
  label,
  value,
}: {
  label: string;
  value:
    string | number;
}) {
  return (
    <div>
      <p className="text-xs text-slate-500">
        {label}
      </p>

      <p className="mt-1 font-medium">
        {value}
      </p>
    </div>
  );
}
