import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import {
  apiFetch,
} from "../lib/api";

type SessionResponse = {
  data: {
    brokerAccountId: string;
    externalUserId:
      | string
      | null;
    status: string;
    sessionExpiresAt:
      | string
      | null;
  };
};

export function ZerodhaCallbackPage() {
  const [
    searchParams,
  ] =
    useSearchParams();

  const navigate =
    useNavigate();

  const [error, setError] =
    useState("");

  useEffect(() => {
    let cancelled =
      false;

    async function completeLogin() {
      const requestToken =
        searchParams.get(
          "request_token",
        );

      const zerodhaStatus =
        searchParams.get(
          "status",
        );

      const brokerAccountId =
        sessionStorage.getItem(
          "pendingZerodhaBrokerAccountId",
        );

      const storedReturnPath =
        sessionStorage.getItem(
          "pendingZerodhaReturnPath",
        );

      /*
       * Only allow an internal return
       * path from our own application.
       */
      const returnPath =
        storedReturnPath &&
        storedReturnPath.startsWith(
          "/clients/",
        )
          ? storedReturnPath
          : "/clients";

      if (
        zerodhaStatus &&
        zerodhaStatus !==
          "success"
      ) {
        setError(
          "Zerodha login was not successful.",
        );

        return;
      }

      if (!requestToken) {
        setError(
          "Zerodha did not return a request token.",
        );

        return;
      }

      if (!brokerAccountId) {
        setError(
          "Broker connection context was lost. Start the Zerodha connection again.",
        );

        return;
      }

      try {
        await apiFetch<SessionResponse>(
          `/api/broker-connections/${brokerAccountId}/zerodha/session`,
          {
            method: "POST",

            body:
              JSON.stringify({
                requestToken,
              }),
          },
        );

        sessionStorage.removeItem(
          "pendingZerodhaBrokerAccountId",
        );

        sessionStorage.removeItem(
          "pendingZerodhaReturnPath",
        );

        if (!cancelled) {
          navigate(
            returnPath,
            {
              replace: true,
            },
          );
        }
      } catch (error) {
        if (!cancelled) {
          setError(
            error instanceof Error
              ? error.message
              : "Failed to connect Zerodha",
          );
        }
      }
    }

    completeLogin();

    return () => {
      cancelled = true;
    };
  }, [
    navigate,
    searchParams,
  ]);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
        <div className="w-full max-w-md rounded-xl border bg-white p-6">
          <h1 className="text-lg font-semibold text-slate-900">
            Zerodha connection failed
          </h1>

          <p className="mt-3 text-sm text-red-600">
            {error}
          </p>

          <button
            type="button"
            onClick={() =>
              navigate(
                "/clients",
                {
                  replace: true,
                },
              )
            }
            className="mt-5 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white"
          >
            Back to clients
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="rounded-xl border bg-white px-6 py-5">
        <p className="text-sm text-slate-600">
          Connecting Zerodha account...
        </p>
      </div>
    </div>
  );
}