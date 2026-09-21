import {
  useEffect,
  useState,
} from "react";

import { apiFetch } from "../../lib/api";

import type {
  Portfolio,
  PortfolioValuation,
} from "./types";

import {
  HoldingsTable,
} from "./HoldingsTable";

import {
  PortfolioValuationCard,
} from "./PortfolioValuationCard";

import {
  RiskLimitCard,
} from "./RiskLimitCard";

import {
  RecentOrdersTable,
} from "./RecentOrdersTable";

type Props = {
  portfolio: Portfolio;
};

type ValuationResponse = {
  data: PortfolioValuation;
};

export function PortfolioSection({
  portfolio,
}: Props) {
  const [valuation, setValuation] =
    useState<PortfolioValuation | null>(
      null,
    );

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    async function loadValuation() {
      try {
        const response =
          await apiFetch<ValuationResponse>(
            `/api/portfolios/${portfolio.id}/valuation`,
          );

        setValuation(response.data);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Failed to load valuation",
        );
      } finally {
        setLoading(false);
      }
    }

    loadValuation();
  }, [portfolio.id]);

  return (
    <section className="space-y-5">
      <div>
        <h3 className="text-lg font-semibold text-slate-900">
          {portfolio.name}
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Portfolio ID: {portfolio.id}
        </p>
      </div>

      {loading && (
        <div className="rounded-xl border bg-white p-5 text-sm text-slate-500">
          Loading valuation...
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {valuation && (
        <>
          <PortfolioValuationCard
            valuation={valuation}
          />

          <HoldingsTable
            holdings={valuation.holdings}
          />
        </>
      )}

      <RiskLimitCard
        riskLimit={portfolio.riskLimit}
      />

      <RecentOrdersTable
        orders={portfolio.orders}
      />
    </section>
  );
}