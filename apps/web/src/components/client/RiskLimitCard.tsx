import {
  useState,
} from "react";

import {
  apiFetch,
} from "../../lib/api";

import type {
  RiskLimit,
} from "./types";

import {
  formatCurrency,
} from "./utils";

type Props = {
  portfolioId: string;
  riskLimit?: RiskLimit | null;
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

function toInputValue(
  value:
    | number
    | string
    | null
    | undefined,
) {
  if (
    value === null ||
    value === undefined
  ) {
    return "";
  }

  return String(value);
}

function parseOptionalNumber(
  value: string,
) {
  if (!value.trim()) {
    return null;
  }

  const parsed =
    Number(value);

  if (
    !Number.isFinite(parsed) ||
    parsed <= 0
  ) {
    throw new Error(
      "Risk limits must be positive numbers.",
    );
  }

  return parsed;
}

export function RiskLimitCard({
  portfolioId,
  riskLimit,
}: Props) {
  const [current, setCurrent] =
    useState<RiskLimit | null>(
      riskLimit ?? null,
    );

  const [editing, setEditing] =
    useState(false);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const [
    maxOrderQuantity,
    setMaxOrderQuantity,
  ] =
    useState(
      toInputValue(
        riskLimit
          ?.maxOrderQuantity,
      ),
    );

  const [
    maxOrderValue,
    setMaxOrderValue,
  ] =
    useState(
      toInputValue(
        riskLimit
          ?.maxOrderValue,
      ),
    );

  const [
    maxPositionQuantity,
    setMaxPositionQuantity,
  ] =
    useState(
      toInputValue(
        riskLimit
          ?.maxPositionQuantity,
      ),
    );

  const [
    maxPositionValue,
    setMaxPositionValue,
  ] =
    useState(
      toInputValue(
        riskLimit
          ?.maxPositionValue,
      ),
    );

  const role =
    getCurrentRole();

  const canManage =
    role === "ADMIN" ||
    role ===
      "PORTFOLIO_MANAGER";

  function resetForm(
    next:
      RiskLimit | null,
  ) {
    setMaxOrderQuantity(
      toInputValue(
        next
          ?.maxOrderQuantity,
      ),
    );

    setMaxOrderValue(
      toInputValue(
        next
          ?.maxOrderValue,
      ),
    );

    setMaxPositionQuantity(
      toInputValue(
        next
          ?.maxPositionQuantity,
      ),
    );

    setMaxPositionValue(
      toInputValue(
        next
          ?.maxPositionValue,
      ),
    );
  }

  async function save() {
    try {
      setSaving(true);
      setError("");

      const response =
        await apiFetch<{
          data: RiskLimit;
        }>(
          `/api/risk/portfolios/${portfolioId}/limits`,
          {
            method: "PUT",
            body:
              JSON.stringify({
                maxOrderQuantity:
                  parseOptionalNumber(
                    maxOrderQuantity,
                  ),
                maxOrderValue:
                  parseOptionalNumber(
                    maxOrderValue,
                  ),
                maxPositionQuantity:
                  parseOptionalNumber(
                    maxPositionQuantity,
                  ),
                maxPositionValue:
                  parseOptionalNumber(
                    maxPositionValue,
                  ),
              }),
          },
        );

      setCurrent(
        response.data,
      );

      resetForm(
        response.data,
      );

      setEditing(false);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to save risk limits",
      );
    } finally {
      setSaving(false);
    }
  }

  async function clear() {
    if (
      !window.confirm(
        "Clear all portfolio-specific risk limits?",
      )
    ) {
      return;
    }

    try {
      setSaving(true);
      setError("");

      await apiFetch(
        `/api/risk/portfolios/${portfolioId}/limits`,
        {
          method:
            "DELETE",
        },
      );

      setCurrent(null);
      resetForm(null);
      setEditing(false);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to clear risk limits",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="rounded-xl border bg-white p-5">
      <div className="flex items-center justify-between gap-3">
        <h4 className="font-medium">
          Risk Limits
        </h4>

        {canManage && (
          <button
            type="button"
            onClick={() => {
              resetForm(
                current,
              );

              setEditing(
                (value) =>
                  !value,
              );

              setError("");
            }}
            className="rounded-lg border px-3 py-1.5 text-xs"
          >
            {editing
              ? "Close"
              : "Configure"}
          </button>
        )}
      </div>

      {error && (
        <p className="mt-3 text-sm text-red-600">
          {error}
        </p>
      )}

      {editing ? (
        <div className="mt-4">
          <div className="grid gap-3 md:grid-cols-4">
            <RiskInput
              label="Max Order Qty"
              value={
                maxOrderQuantity
              }
              onChange={
                setMaxOrderQuantity
              }
            />

            <RiskInput
              label="Max Order Value"
              value={
                maxOrderValue
              }
              onChange={
                setMaxOrderValue
              }
            />

            <RiskInput
              label="Max Position Qty"
              value={
                maxPositionQuantity
              }
              onChange={
                setMaxPositionQuantity
              }
            />

            <RiskInput
              label="Max Position Value"
              value={
                maxPositionValue
              }
              onChange={
                setMaxPositionValue
              }
            />
          </div>

          <div className="mt-4 flex gap-2">
            <button
              type="button"
              disabled={saving}
              onClick={() =>
                void save()
              }
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
            >
              {saving
                ? "Saving..."
                : "Save"}
            </button>

            {current && (
              <button
                type="button"
                disabled={saving}
                onClick={() =>
                  void clear()
                }
                className="rounded-lg border border-red-200 px-4 py-2 text-sm text-red-700 disabled:opacity-50"
              >
                Clear Limits
              </button>
            )}
          </div>
        </div>
      ) : current ? (
        <div className="mt-4 grid gap-4 md:grid-cols-4">
          <Metric
            label="Max Order Qty"
            value={
              current
                .maxOrderQuantity ??
              "—"
            }
          />

          <Metric
            label="Max Order Value"
            value={
              current
                .maxOrderValue
                ? formatCurrency(
                    Number(
                      current
                        .maxOrderValue,
                    ),
                  )
                : "—"
            }
          />

          <Metric
            label="Max Position Qty"
            value={
              current
                .maxPositionQuantity ??
              "—"
            }
          />

          <Metric
            label="Max Position Value"
            value={
              current
                .maxPositionValue
                ? formatCurrency(
                    Number(
                      current
                        .maxPositionValue,
                    ),
                  )
                : "—"
            }
          />
        </div>
      ) : (
        <p className="mt-2 text-sm text-slate-500">
          No portfolio-specific risk limits configured.
        </p>
      )}
    </div>
  );
}

function RiskInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange:
    (value: string) => void;
}) {
  return (
    <label className="text-sm">
      <span className="text-slate-600">
        {label}
      </span>

      <input
        value={value}
        onChange={(event) =>
          onChange(
            event.target.value,
          )
        }
        type="number"
        min="0"
        step="0.01"
        className="mt-1 w-full rounded-lg border px-3 py-2"
      />
    </label>
  );
}

function Metric({
  label,
  value,
}: {
  label: string;
  value: string | number;
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
