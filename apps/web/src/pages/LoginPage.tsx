import {
  useState,
  type FormEvent,
} from "react";

import { apiFetch } from "../lib/api";

type LoginResponse = {
  data: {
    token: string;

    user: {
      id: string;
      name: string;
      email: string;
      role: string;
      firmId: string;
    };
  };
};

export function LoginPage() {
  const [email, setEmail] =
    useState(
      "manager@alphapms.com",
    );

  const [password, setPassword] =
    useState("demo1234");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit(
    event: FormEvent,
  ) {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");

      const result =
        await apiFetch<LoginResponse>(
          "/api/auth/login",
          {
            method: "POST",

            body: JSON.stringify({
              email,
              password,
            }),
          },
        );

      localStorage.setItem(
        "accessToken",
        result.data.token,
      );

      localStorage.setItem(
        "user",
        JSON.stringify(
          result.data.user,
        ),
      );

      window.location.href = "/";
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Login failed",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            PMS-OMS
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Sign in to your portfolio management workspace.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >
          <div>
            <label className="text-sm font-medium text-slate-700">
              Email
            </label>

            <input
              value={email}
              onChange={(event) =>
                setEmail(
                  event.target.value,
                )
              }
              type="email"
              className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-900"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">
              Password
            </label>

            <input
              value={password}
              onChange={(event) =>
                setPassword(
                  event.target.value,
                )
              }
              type="password"
              className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-900"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            disabled={loading}
            className="w-full rounded-lg bg-slate-900 px-4 py-2.5 font-medium text-white disabled:opacity-60"
          >
            {loading
              ? "Signing in..."
              : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}