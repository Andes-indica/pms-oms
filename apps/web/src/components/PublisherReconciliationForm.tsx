import {
  useState,
  type FormEvent,
} from "react";

import {
  apiFetch,
} from "../lib/api";

type ReconciliationStatus =
  | "SUBMITTED"
  | "OPEN"
  | "PARTIALLY_FILLED"
  | "FILLED"
  | "CANCELLED"
  | "REJECTED";

type Props = {
  order: {
    id: string;
    symbol: string;
    side: "BUY" | "SELL";
    quantity: number;
    status: string;
    brokerOrderId?: string | null;
    filledQuantity?: number;
    averageFillPrice?: string | null;
  };
  onClose: () => void;
  onReconciled: () => Promise<void>;
};

export function PublisherReconciliationForm({
  order,
  onClose,
  onReconciled,
}: Props) {
  const [brokerOrderId, setBrokerOrderId] =
    useState(
      order.brokerOrderId ?? "",
    );
  const [status, setStatus] =
    useState<ReconciliationStatus>(
      order.status ===
        "PARTIALLY_FILLED" ||
      order.status === "OPEN"
        ? order.status
        : "OPEN",
    );
  const [filledQuantity, setFilledQuantity] =
    useState(
      order.filledQuantity ?? 0,
    );
  const [averageFillPrice, setAverageFillPrice] =
    useState(
      order.averageFillPrice ?? "",
    );
  const [rejectionReason, setRejectionReason] =
    useState("");
  const [notes, setNotes] =
    useState("");
  const [saving, setSaving] =
    useState(false);
  const [error, setError] =
    useState("");

  function changeStatus(
    next: ReconciliationStatus,
  ) {
    setStatus(next);

    if (next === "FILLED") {
      setFilledQuantity(
        order.quantity,
      );
    } else if (
      next === "SUBMITTED" ||
      next === "OPEN"
    ) {
      setFilledQuantity(0);
      setAverageFillPrice("");
    }
  }

  async function submit(
    event: FormEvent,
  ) {
    event.preventDefault();

    if (
      !window.confirm(
        "Confirm that these values were checked in the intended client's Kite order book. This can update PMS cash and holdings.",
      )
    ) {
      return;
    }

    try {
      setSaving(true);
      setError("");

      await apiFetch(
        `/api/orders/${order.id}/client-confirmation/reconcile`,
        {
          method: "POST",
          body: JSON.stringify({
            brokerOrderId:
              brokerOrderId.trim(),
            status,
            filledQuantity,
            averageFillPrice:
              filledQuantity > 0
                ? Number(
                    averageFillPrice,
                  )
                : null,
            rejectionReason:
              rejectionReason.trim() ||
              undefined,
            notes:
              notes.trim() ||
              undefined,
          }),
        },
      );

      await onReconciled();
      onClose();
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Failed to reconcile Publisher order",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <form
        onSubmit={submit}
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-6 shadow-xl"
      >
        <h3 className="text-lg font-semibold text-slate-900">
          Reconcile Publisher order
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          Record the final Kite outcome for {order.side} {order.quantity} {order.symbol}. Use only values verified in the client’s broker account.
        </p>

        <div className="mt-5 space-y-4">
          <Field label="Zerodha order ID">
            <input
              required
              maxLength={100}
              value={brokerOrderId}
              onChange={(event) =>
                setBrokerOrderId(
                  event.target.value,
                )
              }
              className="w-full rounded-lg border px-3 py-2"
            />
          </Field>

          <Field label="Broker status">
            <select
              value={status}
              onChange={(event) =>
                changeStatus(
                  event.target.value as ReconciliationStatus,
                )
              }
              className="w-full rounded-lg border px-3 py-2"
            >
              <option value="SUBMITTED">Submitted</option>
              <option value="OPEN">Open</option>
              <option value="PARTIALLY_FILLED">Partially filled</option>
              <option value="FILLED">Filled</option>
              <option value="CANCELLED">Cancelled</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </Field>

          <Field label="Cumulative filled quantity">
            <input
              required
              type="number"
              min={0}
              max={order.quantity}
              value={filledQuantity}
              onChange={(event) =>
                setFilledQuantity(
                  Number(
                    event.target.value,
                  ),
                )
              }
              className="w-full rounded-lg border px-3 py-2"
            />
          </Field>

          {filledQuantity > 0 && (
            <Field label="Cumulative average fill price">
              <input
                required
                type="number"
                min="0.01"
                step="0.01"
                value={averageFillPrice}
                onChange={(event) =>
                  setAverageFillPrice(
                    event.target.value,
                  )
                }
                className="w-full rounded-lg border px-3 py-2"
              />
            </Field>
          )}

          {status === "REJECTED" && (
            <Field label="Broker rejection reason">
              <textarea
                required
                maxLength={1_000}
                value={rejectionReason}
                onChange={(event) =>
                  setRejectionReason(
                    event.target.value,
                  )
                }
                className="min-h-24 w-full rounded-lg border px-3 py-2"
              />
            </Field>
          )}

          <Field label="Verification notes (optional)">
            <textarea
              maxLength={2_000}
              value={notes}
              onChange={(event) =>
                setNotes(
                  event.target.value,
                )
              }
              placeholder="For example: verified in Kite order book at 10:42 AM"
              className="min-h-20 w-full rounded-lg border px-3 py-2"
            />
          </Field>
        </div>

        {error && (
          <p className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </p>
        )}

        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            disabled={saving}
            onClick={onClose}
            className="rounded-lg border px-4 py-2 text-sm"
          >
            Close
          </button>
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm text-white disabled:opacity-60"
          >
            {saving
              ? "Saving..."
              : "Save verified outcome"}
          </button>
        </div>
      </form>
    </div>
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
    <label className="block text-sm font-medium text-slate-700">
      {label}
      <div className="mt-1.5">
        {children}
      </div>
    </label>
  );
}
