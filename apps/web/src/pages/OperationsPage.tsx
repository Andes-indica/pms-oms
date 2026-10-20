import {
  useEffect,
  useState,
} from "react";

import {
  apiFetch,
} from "../lib/api";

type OperationsSnapshot = {
  generatedAt: string;
  worker: {
    workerId: string;
    running: boolean;
    active: boolean;
    lastSuccessfulCycleAt:
      string | null;
    lastMaintenanceAt:
      string | null;
    lastError: string | null;
    lastMaintenanceError:
      string | null;
  };
  queue: {
    counts: Record<
      "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED",
      number
    >;
    oldestPendingAgeMs:
      number | null;
    staleLeases: number;
    recentFailures: Array<{
      id: string;
      orderId: string;
      attempts: number;
      lastError: string | null;
      updatedAt: string;
      order: {
        symbol: string;
        exchange: string;
      };
    }>;
  };
  alerts: {
    uncertainOrders: number;
    expiredSessions: number;
    expiringSessions: number;
  };
};

function ageLabel(
  milliseconds: number | null,
) {
  if (milliseconds === null) {
    return "None";
  }

  const seconds =
    Math.floor(
      milliseconds / 1_000,
    );

  if (seconds < 60) {
    return `${seconds}s`;
  }

  const minutes =
    Math.floor(seconds / 60);

  return minutes < 60
    ? `${minutes}m`
    : `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
}

export function OperationsPage() {
  const [snapshot, setSnapshot] =
    useState<OperationsSnapshot | null>(
      null,
    );
  const [error, setError] =
    useState("");

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const response =
          await apiFetch<{
            data: OperationsSnapshot;
          }>("/api/operations");

        if (active) {
          setSnapshot(
            response.data,
          );
          setError("");
        }
      } catch (caught) {
        if (active) {
          setError(
            caught instanceof Error
              ? caught.message
              : "Failed to load operations status",
          );
        }
      }
    }

    void load();
    const timer =
      window.setInterval(
        () => void load(),
        15_000,
      );

    return () => {
      active = false;
      window.clearInterval(
        timer,
      );
    };
  }, []);

  if (
    !snapshot &&
    !error
  ) {
    return <p>Loading operations status...</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">
          Operations
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Execution queue, worker leases and broker-session alerts. Refreshes every 15 seconds.
        </p>
      </div>

      {error && (
        <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </p>
      )}

      {snapshot && (
        <>
          <div className="grid gap-4 md:grid-cols-4">
            {(
              [
                "PENDING",
                "PROCESSING",
                "COMPLETED",
                "FAILED",
              ] as const
            ).map((status) => (
              <div
                key={status}
                className="rounded-xl border bg-white p-5"
              >
                <p className="text-xs font-medium text-slate-500">
                  {status.replaceAll("_", " ")}
                </p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">
                  {snapshot.queue.counts[status]}
                </p>
              </div>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <section className="rounded-xl border bg-white p-5 text-sm">
              <h3 className="font-semibold text-slate-900">
                Worker
              </h3>
              <dl className="mt-4 grid grid-cols-2 gap-3">
                <dt className="text-slate-500">State</dt>
                <dd>{snapshot.worker.running ? snapshot.worker.active ? "Processing" : "Waiting" : "Stopped"}</dd>
                <dt className="text-slate-500">Oldest pending</dt>
                <dd>{ageLabel(snapshot.queue.oldestPendingAgeMs)}</dd>
                <dt className="text-slate-500">Stale leases</dt>
                <dd>{snapshot.queue.staleLeases}</dd>
                <dt className="text-slate-500">Last successful cycle</dt>
                <dd>{snapshot.worker.lastSuccessfulCycleAt ? new Date(snapshot.worker.lastSuccessfulCycleAt).toLocaleString() : "—"}</dd>
              </dl>
              {snapshot.worker.lastError && (
                <p className="mt-4 rounded-lg bg-red-50 p-3 text-red-700">
                  {snapshot.worker.lastError}
                </p>
              )}
              {snapshot.worker.lastMaintenanceError && (
                <p className="mt-4 rounded-lg bg-red-50 p-3 text-red-700">
                  Queue maintenance: {snapshot.worker.lastMaintenanceError}
                </p>
              )}
            </section>

            <section className="rounded-xl border bg-white p-5 text-sm">
              <h3 className="font-semibold text-slate-900">
                Attention required
              </h3>
              <dl className="mt-4 grid grid-cols-2 gap-3">
                <dt className="text-slate-500">Uncertain submissions</dt>
                <dd>{snapshot.alerts.uncertainOrders}</dd>
                <dt className="text-slate-500">Expired sessions</dt>
                <dd>{snapshot.alerts.expiredSessions}</dd>
                <dt className="text-slate-500">Expiring within 1 hour</dt>
                <dd>{snapshot.alerts.expiringSessions}</dd>
              </dl>
            </section>
          </div>

          <section className="overflow-hidden rounded-xl border bg-white">
            <div className="border-b px-5 py-4">
              <h3 className="font-semibold text-slate-900">
                Recent execution failures
              </h3>
            </div>
            {snapshot.queue.recentFailures.length === 0 ? (
              <p className="p-5 text-sm text-slate-500">
                No failed execution jobs.
              </p>
            ) : (
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="px-5 py-3">Order</th>
                    <th className="px-5 py-3">Attempts</th>
                    <th className="px-5 py-3">Reason</th>
                    <th className="px-5 py-3">Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {snapshot.queue.recentFailures.map((failure) => (
                    <tr key={failure.id} className="border-t">
                      <td className="px-5 py-3">{failure.order.exchange}:{failure.order.symbol}</td>
                      <td className="px-5 py-3">{failure.attempts}</td>
                      <td className="max-w-lg break-words px-5 py-3 text-red-700">{failure.lastError ?? "Unknown error"}</td>
                      <td className="px-5 py-3">{new Date(failure.updatedAt).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>
        </>
      )}
    </div>
  );
}
