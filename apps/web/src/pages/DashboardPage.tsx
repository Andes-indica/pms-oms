export function DashboardPage() {
  const rawUser =
    localStorage.getItem("user");

  const user = rawUser
    ? JSON.parse(rawUser)
    : null;

  function logout() {
    localStorage.removeItem(
      "accessToken",
    );

    localStorage.removeItem(
      "user",
    );

    window.location.href = "/";
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="border-b bg-white">
        <div className="flex h-16 items-center justify-between px-8">
          <div>
            <h1 className="font-bold text-slate-900">
              PMS-OMS
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium">
                {user?.name}
              </p>

              <p className="text-xs text-slate-500">
                {user?.role}
              </p>
            </div>

            <button
              onClick={logout}
              className="rounded-md border px-3 py-1.5 text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="p-8">
        <h2 className="text-2xl font-semibold text-slate-900">
          Dashboard
        </h2>

        <div className="mt-6 grid gap-4 md:grid-cols-4">
          <DashboardCard
            label="Clients"
            value="—"
          />

          <DashboardCard
            label="Open Orders"
            value="—"
          />

          <DashboardCard
            label="Today's Fills"
            value="—"
          />

          <DashboardCard
            label="Realized P&L"
            value="—"
          />
        </div>
      </main>
    </div>
  );
}

function DashboardCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border bg-white p-5">
      <p className="text-sm text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-2xl font-semibold text-slate-900">
        {value}
      </p>
    </div>
  );
}