import { NavLink, Outlet } from "react-router-dom";

export function AppLayout() {
  const rawUser = localStorage.getItem("user");
  const user = rawUser ? JSON.parse(rawUser) : null;

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
          <NavLink to="/" className={navClass}>
            Dashboard
          </NavLink>

          <NavLink to="/clients" className={navClass}>
            Clients
          </NavLink>

          <NavLink to="/orders" className={navClass}>
            Orders
          </NavLink>

          <NavLink to="/basket-orders" className={navClass}>
            Basket Orders
          </NavLink>
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
          <Outlet />
        </main>
      </div>
    </div>
  );
}