import {
  useEffect,
  useState,
  type FormEvent,
} from "react";

import { apiFetch } from "../lib/api";

type OnboardingSummary = {
  type:
    | "INVITATION"
    | "PASSWORD_RESET";
  name: string;
  email: string;
  expiresAt: string;
};

function readToken() {
  const parameters =
    new URLSearchParams(
      window.location.hash.slice(1),
    );

  return parameters.get("token") ?? "";
}

export function AccountSetupPage() {
  const [token] = useState(readToken);
  const [summary, setSummary] =
    useState<OnboardingSummary | null>(null);
  const [password, setPassword] =
    useState("");
  const [confirmation, setConfirmation] =
    useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] =
    useState(true);
  const [submitting, setSubmitting] =
    useState(false);
  const [completed, setCompleted] =
    useState(false);

  useEffect(() => {
    if (!token) {
      setError(
        "This account setup link is invalid.",
      );
      setLoading(false);
      return;
    }

    apiFetch<{
      data: OnboardingSummary;
    }>("/api/auth/onboarding/lookup", {
      method: "POST",
      body: JSON.stringify({ token }),
    })
      .then((response) => {
        setSummary(response.data);
      })
      .catch((error: unknown) => {
        setError(
          error instanceof Error
            ? error.message
            : "Unable to verify this link.",
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token]);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (password !== confirmation) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      await apiFetch(
        "/api/auth/onboarding/complete",
        {
          method: "POST",
          body: JSON.stringify({
            token,
            password,
          }),
        },
      );

      window.history.replaceState(
        null,
        "",
        "/account-setup",
      );
      setCompleted(true);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Account setup failed.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <h1 className="text-2xl font-bold text-slate-900">
          PMS-OMS
        </h1>

        {loading ? (
          <p className="mt-6 text-sm text-slate-500">
            Verifying your secure link...
          </p>
        ) : completed ? (
          <div className="mt-6 space-y-4">
            <h2 className="text-lg font-semibold text-emerald-700">
              Password saved
            </h2>
            <p className="text-sm text-slate-600">
              Your account is ready. You can now sign in.
            </p>
            <a
              href="/"
              className="inline-flex rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white"
            >
              Continue to sign in
            </a>
          </div>
        ) : summary ? (
          <>
            <div className="mt-5">
              <h2 className="text-lg font-semibold text-slate-900">
                {summary.type === "INVITATION"
                  ? "Set up your account"
                  : "Reset your password"}
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                {summary.name} · {summary.email}
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-6 space-y-4"
            >
              <div>
                <label className="text-sm font-medium text-slate-700">
                  New password
                </label>
                <input
                  autoComplete="new-password"
                  minLength={12}
                  maxLength={128}
                  required
                  type="password"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-900"
                />
                <p className="mt-1 text-xs text-slate-500">
                  Use 12 to 128 characters.
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Confirm password
                </label>
                <input
                  autoComplete="new-password"
                  minLength={12}
                  maxLength={128}
                  required
                  type="password"
                  value={confirmation}
                  onChange={(event) =>
                    setConfirmation(event.target.value)
                  }
                  className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-900"
                />
              </div>

              {error && (
                <p className="text-sm text-red-600">
                  {error}
                </p>
              )}

              <button
                disabled={submitting}
                className="w-full rounded-lg bg-slate-900 px-4 py-2.5 font-medium text-white disabled:opacity-60"
              >
                {submitting
                  ? "Saving..."
                  : "Save password"}
              </button>
            </form>
          </>
        ) : (
          <div className="mt-6 space-y-4">
            <p className="text-sm text-red-600">
              {error}
            </p>
            <a
              href="/"
              className="text-sm font-medium text-slate-900 underline"
            >
              Return to sign in
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
