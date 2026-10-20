import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import { apiFetch } from "../lib/api";
import { currentUserCan } from "../lib/permissions";

import {
  ClientSummaryCards,
} from "../components/client/ClientSummaryCards";

import {
  PortfolioSection,
} from "../components/client/PortfolioSection";

import type {
  ClientOverview,
} from "../components/client/types";

import {
  BrokerAccountsCard,
} from "../components/client/BrokerAccountsCard";

type Response = {
  data: ClientOverview;
};

const lifecycleErrorMessages:
  Record<string, string> = {
  CLIENT_HAS_OPEN_POSITIONS:
    "Close or reconcile all client holdings before archiving.",
  CLIENT_HAS_ACTIVE_ORDERS:
    "Wait for, cancel, or reconcile all active client orders before archiving.",
  CLIENT_HAS_ALLOCATED_CASH:
    "Reduce all broker cash allocations to zero before archiving.",
  PORTFOLIO_HAS_OPEN_POSITIONS:
    "Close or reconcile this portfolio's holdings before archiving.",
  PORTFOLIO_HAS_ACTIVE_ORDERS:
    "Wait for, cancel, or reconcile this portfolio's active orders before archiving.",
  PORTFOLIO_HAS_ALLOCATED_CASH:
    "Reduce this portfolio's broker cash allocation to zero before archiving.",
  PORTFOLIO_NOT_EMPTY:
    "Only a never-used portfolio can be permanently deleted. Archive it to preserve history.",
};

function readableLifecycleError(
  error: unknown,
  fallback: string,
) {
  if (!(error instanceof Error)) {
    return fallback;
  }

  return lifecycleErrorMessages[
    error.message
  ] ?? error.message;
}

export function ClientDetailPage() {
  const { id } = useParams();

  const navigate =
    useNavigate();

  const canManage =
    currentUserCan(
      "MANAGE_CLIENTS",
    );

  const isAdmin =
    currentUserCan(
      "DELETE_CLIENT_DATA",
    );

  const canArchive =
    currentUserCan(
      "ARCHIVE_CLIENT_DATA",
    );

  const [client, setClient] =
    useState<ClientOverview | null>(
      null,
    );

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [editingClient, setEditingClient] =
    useState(false);

  const [clientName, setClientName] =
    useState("");

  const [clientEmail, setClientEmail] =
    useState("");

  const [portfolioName, setPortfolioName] =
    useState("");

  const [initialCash, setInitialCash] =
    useState("");

  const [saving, setSaving] =
    useState(false);
  const [
    refreshKey,
    setRefreshKey,
  ] =
    useState(0);

  useEffect(() => {
    async function loadClient() {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        const response =
          await apiFetch<Response>(
            `/api/clients/${id}/overview`,
          );

        setClient(response.data);
        setClientName(
          response.data.name,
        );
        setClientEmail(
          response.data.email ??
            "",
        );
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Failed to load client",
        );
      } finally {
        setLoading(false);
      }
    }

    loadClient();
  }, [id,refreshKey,]);

  async function saveClient() {
    if (!id) {
      return;
    }

    try {
      setSaving(true);
      setError("");

      await apiFetch(
        `/api/clients/${id}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            name:
              clientName.trim(),
            email:
              clientEmail.trim() ||
              undefined,
          }),
        },
      );

      setEditingClient(false);

      setRefreshKey(
        (current) =>
          current + 1,
      );
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to update client",
      );
    } finally {
      setSaving(false);
    }
  }

  async function addPortfolio() {
    if (
      !id ||
      !portfolioName.trim()
    ) {
      setError(
        "Portfolio name is required.",
      );

      return;
    }

    const parsedCash =
      initialCash.trim()
        ? Number(initialCash)
        : 0;

    if (
      !Number.isFinite(
        parsedCash,
      ) ||
      parsedCash < 0
    ) {
      setError(
        "Initial cash must be a non-negative number.",
      );

      return;
    }

    try {
      setSaving(true);
      setError("");

      await apiFetch(
        `/api/portfolios/clients/${id}`,
        {
          method: "POST",
          body: JSON.stringify({
            name:
              portfolioName.trim(),
            initialCash:
              parsedCash,
          }),
        },
      );

      setPortfolioName("");
      setInitialCash("");

      setRefreshKey(
        (current) =>
          current + 1,
      );
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to create portfolio",
      );
    } finally {
      setSaving(false);
    }
  }

  async function deletePortfolio(
    portfolioId: string,
  ) {
    if (
      !window.confirm(
        "Delete this empty portfolio?",
      )
    ) {
      return;
    }

    try {
      setSaving(true);
      setError("");

      await apiFetch(
        `/api/portfolios/${portfolioId}`,
        {
          method: "DELETE",
        },
      );

      setRefreshKey(
        (current) =>
          current + 1,
      );
    } catch (error) {
      setError(
        readableLifecycleError(
          error,
          "Failed to delete portfolio",
        ),
      );
    } finally {
      setSaving(false);
    }
  }

  async function deleteClient() {
    if (
      !id ||
      !window.confirm(
        "Delete this client? The client must have no portfolios or broker accounts.",
      )
    ) {
      return;
    }

    try {
      setSaving(true);
      setError("");

      await apiFetch(
        `/api/clients/${id}`,
        {
          method: "DELETE",
        },
      );

      navigate(
        "/clients",
        {
          replace: true,
        },
      );
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to delete client",
      );
    } finally {
      setSaving(false);
    }
  }

  async function setClientArchived(
    archived: boolean,
  ) {
    if (
      !id ||
      !window.confirm(
        archived
          ? "Archive this client? Open positions, active orders and allocated broker cash must be cleared first. Broker sessions will be disconnected."
          : "Restore this client? Portfolios and broker accounts remain archived until restored separately.",
      )
    ) {
      return;
    }

    try {
      setSaving(true);
      setError("");

      await apiFetch(
        `/api/clients/${id}/${archived ? "archive" : "restore"}`,
        {
          method: "PATCH",
        },
      );

      setRefreshKey(
        (current) =>
          current + 1,
      );
    } catch (error) {
      setError(
        readableLifecycleError(
          error,
          "Failed to update client lifecycle",
        ),
      );
    } finally {
      setSaving(false);
    }
  }

  async function setPortfolioArchived(
    portfolioId: string,
    archived: boolean,
  ) {
    if (
      !window.confirm(
        archived
          ? "Archive this portfolio? It must have no open positions, active orders or allocated broker cash."
          : "Restore this portfolio?",
      )
    ) {
      return;
    }

    try {
      setSaving(true);
      setError("");

      await apiFetch(
        `/api/portfolios/${portfolioId}/${archived ? "archive" : "restore"}`,
        {
          method: "PATCH",
        },
      );

      setRefreshKey(
        (current) =>
          current + 1,
      );
    } catch (error) {
      setError(
        readableLifecycleError(
          error,
          "Failed to update portfolio lifecycle",
        ),
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <p className="text-slate-500">
        Loading client...
      </p>
    );
  }

  if (error && !client) {
    return (
      <p className="text-red-600">
        {error}
      </p>
    );
  }

  if (!client) {
    return (
      <p className="text-slate-500">
        Client not found.
      </p>
    );
  }

  return (
    <div className="space-y-8">
      {error && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      <div>
        <Link
          to="/clients"
          className="text-sm text-slate-500 hover:text-slate-900"
        >
          ← Clients
        </Link>

        {editingClient ? (
          <div className="mt-3 grid max-w-2xl gap-3 rounded-xl border bg-white p-4 md:grid-cols-2">
            <input
              value={clientName}
              onChange={(event) =>
                setClientName(
                  event.target.value,
                )
              }
              className="rounded-lg border px-3 py-2"
              placeholder="Client name"
            />

            <input
              value={clientEmail}
              onChange={(event) =>
                setClientEmail(
                  event.target.value,
                )
              }
              className="rounded-lg border px-3 py-2"
              placeholder="Email"
              type="email"
            />

            <div className="flex gap-2 md:col-span-2">
              <button
                type="button"
                disabled={saving}
                onClick={() =>
                  void saveClient()
                }
                className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
              >
                Save
              </button>

              <button
                type="button"
                onClick={() =>
                  setEditingClient(
                    false,
                  )
                }
                className="rounded-lg border px-4 py-2 text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <h2 className="text-2xl font-semibold text-slate-900">
                {client.name}
              </h2>

              {client.archivedAt && (
                <span className="rounded-full bg-slate-200 px-2.5 py-1 text-xs font-medium text-slate-700">
                  Archived
                </span>
              )}

              {canManage &&
                !client.archivedAt && (
                <button
                  type="button"
                  onClick={() =>
                    setEditingClient(
                      true,
                    )
                  }
                  className="rounded-lg border px-3 py-1.5 text-sm"
                >
                  Edit
                </button>
              )}

              {isAdmin &&
                client.canDeletePermanently && (
                <button
                  type="button"
                  disabled={saving}
                  onClick={() =>
                    void deleteClient()
                  }
                  className="rounded-lg border border-red-200 px-3 py-1.5 text-sm text-red-700 disabled:opacity-50"
                >
                  Delete unused client
                </button>
              )}

              {canArchive && (
                <button
                  type="button"
                  disabled={saving}
                  onClick={() =>
                    void setClientArchived(
                      !client.archivedAt,
                    )
                  }
                  className="rounded-lg border border-amber-300 px-3 py-1.5 text-sm text-amber-800 disabled:opacity-50"
                >
                  {client.archivedAt
                    ? "Restore client"
                    : "Archive client"}
                </button>
              )}
            </div>

            <p className="mt-1 text-sm text-slate-500">
              {client.email ?? "No email"}
            </p>
          </>
        )}
      </div>

      <ClientSummaryCards
        client={client}
      />
      {canManage &&
        !client.archivedAt && (
        <section className="rounded-xl border bg-white p-5">
          <h3 className="font-semibold text-slate-900">
            Add Portfolio
          </h3>

          <div className="mt-4 grid gap-3 md:grid-cols-[1fr_1fr_auto]">
            <input
              value={portfolioName}
              onChange={(event) =>
                setPortfolioName(
                  event.target.value,
                )
              }
              placeholder="Portfolio name"
              className="rounded-lg border px-3 py-2"
            />

            <input
              value={initialCash}
              onChange={(event) =>
                setInitialCash(
                  event.target.value,
                )
              }
              placeholder="Opening cash"
              type="number"
              min="0"
              step="0.01"
              className="rounded-lg border px-3 py-2"
            />

            <button
              type="button"
              disabled={saving}
              onClick={() =>
                void addPortfolio()
              }
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
            >
              Add Portfolio
            </button>
          </div>
        </section>
      )}

      {!client.archivedAt && (
        <BrokerAccountsCard
          clientId={client.id}
          accounts={
            client.brokerAccounts
          }
          portfolios={client.portfolios.filter(
            (portfolio) =>
              !portfolio.archivedAt,
          )}
          onChanged={() =>
            setRefreshKey(
              (current) =>
                current + 1,
            )
          }
        />
      )}
      {client.portfolios
        .filter(
          (portfolio) =>
            !portfolio.archivedAt,
        )
        .map(
        (portfolio) => (
          <div
            key={portfolio.id}
            className="space-y-2"
          >
            {(isAdmin || canArchive) && (
                <div className="flex justify-end gap-2">
                  {canArchive && (
                    <button
                      type="button"
                      disabled={saving}
                      onClick={() =>
                        void setPortfolioArchived(
                          portfolio.id,
                          true,
                        )
                      }
                      className="rounded-lg border border-amber-300 px-3 py-1.5 text-xs text-amber-800 disabled:opacity-50"
                    >
                      Archive portfolio
                    </button>
                  )}

                  {isAdmin &&
                    portfolio.canDeletePermanently && (
                  <button
                    type="button"
                    disabled={saving}
                    onClick={() =>
                      void deletePortfolio(
                        portfolio.id,
                      )
                    }
                    className="rounded-lg border border-red-200 px-3 py-1.5 text-xs text-red-700 disabled:opacity-50"
                  >
                    Delete unused portfolio
                  </button>
                    )}
                </div>
              )}

            <PortfolioSection
              portfolio={portfolio}
            />
          </div>
        ),
      )}

      {client.portfolios.some(
        (portfolio) =>
          Boolean(
            portfolio.archivedAt,
          ),
      ) && (
        <section className="rounded-xl border bg-white p-5">
          <h3 className="font-semibold text-slate-900">
            Archived portfolios
          </h3>
          <div className="mt-4 space-y-3">
            {client.portfolios
              .filter(
                (portfolio) =>
                  Boolean(
                    portfolio.archivedAt,
                  ),
              )
              .map((portfolio) => (
                <div
                  key={portfolio.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div>
                    <p className="font-medium text-slate-900">
                      {portfolio.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      Archived {new Date(portfolio.archivedAt!).toLocaleString()}
                    </p>
                  </div>
                  {canArchive &&
                    !client.archivedAt && (
                      <button
                        type="button"
                        disabled={saving}
                        onClick={() =>
                          void setPortfolioArchived(
                            portfolio.id,
                            false,
                          )
                        }
                        className="rounded-lg border px-3 py-1.5 text-sm disabled:opacity-50"
                      >
                        Restore
                      </button>
                    )}
                </div>
              ))}
          </div>
        </section>
      )}
    </div>
  );
}
