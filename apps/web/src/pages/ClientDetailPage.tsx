import {
  useEffect,
  useState,
} from "react";

import {
  Link,
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

export function ClientDetailPage() {
  const { id } = useParams();

  const [client, setClient] =
    useState<ClientOverview | null>(
      null,
    );

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");
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

        <h2 className="mt-3 text-2xl font-semibold text-slate-900">
          {client.name}
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          {client.email ?? "No email"}
        </p>
      </div>

      <ClientSummaryCards
        client={client}
      />
      <BrokerAccountsCard
      clientId={client.id}
        accounts={
          client.brokerAccounts
        } onChanged={()=>
          setRefreshKey(
            (current)=> current+1
          )
        }
      />
      {client.portfolios.map(
        (portfolio) => (
          <PortfolioSection
            key={portfolio.id}
            portfolio={portfolio}
          />
        ),
      )}
    </div>
  );
}