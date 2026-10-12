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

type CallbackResult =
  | {
      mode: "client";
      status:
        | "CONFIRMED"
        | "DECLINED";
    }
  | {
      mode: "connection";
      returnPath: string;
    };

const callbackPromises =
  new Map<
    string,
    Promise<CallbackResult>
  >();

export function ZerodhaCallbackPage() {
  const [searchParams] =
    useSearchParams();
  const navigate = useNavigate();
  const [error, setError] =
    useState("");
  const [clientOutcome, setClientOutcome] =
    useState<
      | "CONFIRMED"
      | "DECLINED"
      | null
    >(null);
  const [isClientCallback] =
    useState(
      () =>
        Boolean(
          sessionStorage.getItem(
            "pendingClientConfirmationToken",
          ),
        ),
    );

  useEffect(() => {
    let cancelled = false;

    const requestToken =
      searchParams.get(
        "request_token",
      );
    const zerodhaStatus =
      searchParams.get(
        "status",
      );
    const clientToken =
      sessionStorage.getItem(
        "pendingClientConfirmationToken",
      );
    const brokerAccountId =
      sessionStorage.getItem(
        "pendingZerodhaBrokerAccountId",
      );
    const storedReturnPath =
      sessionStorage.getItem(
        "pendingZerodhaReturnPath",
      );
    const returnPath =
      storedReturnPath &&
      storedReturnPath.startsWith(
        "/clients/",
      )
        ? storedReturnPath
        : "/clients";
    const callbackKey =
      clientToken
        ? `client:${clientToken}:${zerodhaStatus ?? ""}:${requestToken ?? ""}`
        : `connection:${brokerAccountId ?? ""}:${requestToken ?? ""}`;

    async function completeCallback():
      Promise<CallbackResult> {
      if (clientToken) {
        const response = await apiFetch<{
          data: {
            status:
              | "CONFIRMED"
              | "DECLINED";
          };
        }>(
          "/api/client-order-confirmations/complete",
          {
            method: "POST",
            body: JSON.stringify({
              token: clientToken,
              status:
                zerodhaStatus ?? "",
              requestToken,
            }),
          },
        );

        sessionStorage.removeItem(
          "pendingClientConfirmationToken",
        );

        return {
          mode: "client",
          status:
            response.data.status,
        };
      }

      if (
        zerodhaStatus &&
        zerodhaStatus !== "success"
      ) {
        throw new Error(
          "Zerodha login was not successful.",
        );
      }

      if (!requestToken) {
        throw new Error(
          "Zerodha did not return a request token.",
        );
      }

      if (!brokerAccountId) {
        throw new Error(
          "Broker connection context was lost. Start the Zerodha connection again.",
        );
      }

      await apiFetch<SessionResponse>(
        `/api/broker-connections/${brokerAccountId}/zerodha/session`,
        {
          method: "POST",
          body: JSON.stringify({
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

      return {
        mode: "connection",
        returnPath,
      };
    }

    let callbackPromise =
      callbackPromises.get(
        callbackKey,
      );

    if (!callbackPromise) {
      callbackPromise =
        completeCallback();
      callbackPromises.set(
        callbackKey,
        callbackPromise,
      );
    }

    callbackPromise
      .then((result) => {
        if (cancelled) {
          return;
        }

        if (
          result.mode === "client"
        ) {
          setClientOutcome(
            result.status,
          );
          return;
        }

        navigate(
          result.returnPath,
          {
            replace: true,
          },
        );
      })
      .catch((error) => {
        if (!cancelled) {
          setError(
            error instanceof Error
              ? error.message
              : "Failed to complete Zerodha confirmation",
          );
        }
      })
      .finally(() => {
        callbackPromises.delete(
          callbackKey,
        );
      });

    return () => {
      cancelled = true;
    };
  }, [navigate, searchParams]);

  if (clientOutcome === "CONFIRMED") {
    return (
      <CallbackCard
        title="Order sent successfully"
        message="Zerodha completed the handoff. Check the final order status in your Kite order book; this Publisher-only version cannot read your broker account. You may close this page."
        tone="success"
      />
    );
  }

  if (clientOutcome === "DECLINED") {
    return (
      <CallbackCard
        title="Order not placed"
        message="The Zerodha confirmation was cancelled. No order was recorded as submitted in the PMS. You may close this page."
      />
    );
  }

  if (error) {
    return (
      <CallbackCard
        title={
          isClientCallback
            ? "Order confirmation needs attention"
            : "Zerodha connection failed"
        }
        message={error}
        tone="error"
        action={
          isClientCallback
            ? undefined
            : () =>
                navigate(
                  "/clients",
                  {
                    replace: true,
                  },
                )
        }
      />
    );
  }

  return (
    <CallbackCard
      title={
        isClientCallback
          ? "Confirming your order"
          : "Connecting Zerodha account"
      }
      message="Please wait while Zerodha's response is verified."
    />
  );
}

function CallbackCard({
  title,
  message,
  tone = "neutral",
  action,
}: {
  title: string;
  message: string;
  tone?:
    | "neutral"
    | "success"
    | "error";
  action?: () => void;
}) {
  const color =
    tone === "success"
      ? "text-emerald-700"
      : tone === "error"
        ? "text-red-700"
        : "text-slate-600";

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
      <section className="w-full max-w-md rounded-xl border bg-white p-6 shadow-sm">
        <h1 className="text-lg font-semibold text-slate-900">
          {title}
        </h1>
        <p className={`mt-3 text-sm ${color}`}>
          {message}
        </p>
        {action && (
          <button
            type="button"
            onClick={action}
            className="mt-5 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white"
          >
            Back to clients
          </button>
        )}
      </section>
    </main>
  );
}
