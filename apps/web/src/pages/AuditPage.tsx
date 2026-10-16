import {
  useEffect,
  useState,
} from "react";

import {
  apiFetch,
} from "../lib/api";

type AuditLog = {
  id: string;
  action: string;
  entityType: string;
  entityId: string;
  message?: string | null;
  metadata?: Record<string, unknown> | null;
  createdAt: string;
  actor?: {
    id: string;
    name: string;
    email: string;
  } | null;
};

export function AuditPage() {
  const [logs, setLogs] =
    useState<AuditLog[]>([]);
  const [loading, setLoading] =
    useState(true);
  const [error, setError] =
    useState("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const response =
          await apiFetch<{
            data: AuditLog[];
          }>("/api/audit-logs");

        if (!cancelled) {
          setLogs(response.data);
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Failed to load audit events",
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
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold text-slate-900">
        Audit Log
      </h2>
      <p className="mt-1 text-sm text-slate-500">
        Review trading, reconciliation, broker, and user activity for this firm.
      </p>

      {error && (
        <p className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </p>
      )}

      {loading ? (
        <p className="mt-6 text-sm text-slate-500">
          Loading audit events...
        </p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-xl border bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-3">Time</th>
                <th className="px-4 py-3">Action</th>
                <th className="px-4 py-3">Entity</th>
                <th className="px-4 py-3">Actor</th>
                <th className="px-4 py-3">Details</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr
                  key={log.id}
                  className="border-b align-top last:border-b-0"
                >
                  <td className="whitespace-nowrap px-4 py-3 text-slate-600">
                    {new Date(log.createdAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-900">
                    {formatLabel(log.action)}
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    <p>{formatLabel(log.entityType)}</p>
                    <p className="mt-1 max-w-48 truncate text-xs" title={log.entityId}>
                      {log.entityId}
                    </p>
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {log.actor?.name ?? "System"}
                    {log.actor?.email && (
                      <p className="text-xs text-slate-500">
                        {log.actor.email}
                      </p>
                    )}
                  </td>
                  <td className="max-w-xl px-4 py-3 text-slate-600">
                    <p>{log.message ?? "—"}</p>
                    {log.metadata && (
                      <details className="mt-2 text-xs">
                        <summary className="cursor-pointer text-slate-700">
                          Technical metadata
                        </summary>
                        <pre className="mt-2 overflow-x-auto whitespace-pre-wrap rounded bg-slate-100 p-2">
                          {JSON.stringify(log.metadata, null, 2)}
                        </pre>
                      </details>
                    )}
                  </td>
                </tr>
              ))}
              {logs.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-10 text-center text-slate-500"
                  >
                    No audit events found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function formatLabel(value: string) {
  return value
    .toLowerCase()
    .split("_")
    .map(
      (part) =>
        part.charAt(0).toUpperCase() +
        part.slice(1),
    )
    .join(" ");
}
