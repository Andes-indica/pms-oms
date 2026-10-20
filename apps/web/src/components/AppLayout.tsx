import {
  useEffect,
  useState,
} from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  getCurrentUser,
  hasPermission,
  type Permission,
} from "../lib/permissions";
import {
  loadRuntimeCapabilities,
  type RuntimeCapabilities,
} from "../lib/runtime-capabilities";

const NAV_ITEMS: Array<{
  to: string;
  label: string;
  permission: Permission;
}> = [
  {
    to: "/",
    label: "Dashboard",
    permission: "VIEW_DASHBOARD",
  },
  {
    to: "/clients",
    label: "Clients",
    permission: "VIEW_CLIENTS",
  },
  {
    to: "/orders",
    label: "Orders",
    permission: "VIEW_ORDERS",
  },
  {
    to: "/basket-orders",
    label: "Basket Orders",
    permission: "VIEW_ORDERS",
  },
  {
    to: "/risk",
    label: "Risk",
    permission: "VIEW_RISK",
  },
  {
    to: "/audit",
    label: "Audit",
    permission: "VIEW_AUDIT",
  },
  {
    to: "/operations",
    label: "Operations",
    permission:
      "VIEW_OPERATIONS",
  },
  {
    to: "/users",
    label: "Users",
    permission: "VIEW_USERS",
  },
];

export function AppLayout() {
  const user = getCurrentUser();
  const [capabilities, setCapabilities] =
    useState<RuntimeCapabilities | null>(
      null,
    );

  useEffect(() => {
    void loadRuntimeCapabilities()
      .then(setCapabilities)
      .catch(() => {
        // Individual pages still surface request failures.
      });
  }, []);

  function logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");

    window.location.href = "/";
  }

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `block rounded-lg px-3 py-2 text-sm ${
      isActive
        ? "bg-slate-900 text-white"
        : "text-slate-600 hover:bg-slate-100"
    }`;

  return (
    <div className="flex min-h-screen bg-slate-100">
      <aside className="w-64 border-r bg-white p-5">
        <h1 className="text-xl font-bold text-slate-900">
          PMS-OMS
        </h1>

        <nav className="mt-8 space-y-2">
          {NAV_ITEMS
            .filter((item) =>
              hasPermission(
                user?.role,
                item.permission,
              ),
            )
            .map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={navClass}
              >
                {item.label}
              </NavLink>
            ))}
        </nav>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b bg-white px-8">
          <div>
            <p className="text-sm font-medium text-slate-900">
              {user?.name}
            </p>

            <p className="text-xs text-slate-500">
              {user?.role}
            </p>
          </div>

          <button
            onClick={logout}
            className="rounded-lg border px-3 py-1.5 text-sm"
          >
            Logout
          </button>
        </header>

        <main className="flex-1 p-8">
          {capabilities?.marketData
            .mode === "DISABLED" && (
              <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                <p className="font-semibold">
                  Limit-only mode
                </p>
                <p className="mt-1">
                  Live market data is not configured. Market orders and live valuations are unavailable; limit orders remain enabled.
                </p>
              </div>
            )}
          <Outlet />
        </main>
      </div>
    </div>
  );
}
