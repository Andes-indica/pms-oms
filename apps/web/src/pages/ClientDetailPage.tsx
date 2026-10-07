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

export function ClientDetailPage() {
  const { id } = useParams();

  const navigate =
    useNavigate();

  const role =
    getCurrentRole();

  const canManage =
    role === "ADMIN" ||
    role ===
      "PORTFOLIO_MANAGER";

  const isAdmin =
    role === "ADMIN";

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
        error instanceof Error
          ? error.message
          : "Failed to delete portfolio",
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

  if (loading) {
    return (
      <p className="text-slate-500">
        Loading client...
      </p>
    );
  }

  if (error) {
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

              {canManage && (
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

              {isAdmin && (
                <button
                  type="button"
                  disabled={saving}
                  onClick={() =>
                    void deleteClient()
                  }
                  className="rounded-lg border border-red-200 px-3 py-1.5 text-sm text-red-700 disabled:opacity-50"
                >
                  Delete
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
      {canManage && (
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

      <BrokerAccountsCard
      clientId={client.id}
        accounts={
          client.brokerAccounts
        } 
        portfolios={client.portfolios}
        onChanged={()=>
          setRefreshKey(
            (current)=> current+1
          )
        }
      />
      {client.portfolios.map(
        (portfolio) => (
          <div
            key={portfolio.id}
            className="space-y-2"
          >
            {isAdmin &&
              portfolio.holdings.length === 0 &&
              portfolio.orders.length === 0 && (
                <div className="flex justify-end">
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
                    Delete empty portfolio
                  </button>
                </div>
              )}

            <PortfolioSection
              portfolio={portfolio}
            />
          </div>
        ),
      )}
    </div>
  );
}