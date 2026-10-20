import { useEffect, useState } from "react";
import { apiFetch } from "../lib/api";
import { Link } from "react-router-dom";
import { currentUserCan } from "../lib/permissions";

type Client = {
    id: string;
    name: string;
    email?: string;
    archivedAt?: string | null;

    brokerAccounts: Array<{
        id: string;
        broker: string;
        accountId: string;
    }>;

    portfolios: Array<{
        id: string;
        name: string;

        holdings: Array<{
            id: string;
            symbol: string;
            quantity: number;
            averagePrice: string;
        }>;
    }>;
};

type ClientsResponse = {
    data: Client[];
};

export function ClientsPage() {
    const [clients, setClients] =
        useState<Client[]>([]);

    const [name, setName] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [creating, setCreating] =
        useState(false);

    const [showArchived, setShowArchived] =
        useState(false);

    const canManage =
        currentUserCan(
            "MANAGE_CLIENTS",
        );

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    async function loadClients() {
        try {
            const response =
                await apiFetch<ClientsResponse>(
                    showArchived
                        ? "/api/clients?archived=true"
                        : "/api/clients",
                );

            setClients(response.data);
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Failed to load clients",
            );
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        let active = true;

        async function load() {
            try {
                const response =
                    await apiFetch<ClientsResponse>(
                        showArchived
                            ? "/api/clients?archived=true"
                            : "/api/clients",
                    );

                if (active) {
                    setClients(
                        response.data,
                    );
                    setError("");
                }
            } catch (error) {
                if (active) {
                    setError(
                        error instanceof Error
                            ? error.message
                            : "Failed to load clients",
                    );
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        }

        void load();

        return () => {
            active = false;
        };
    }, [showArchived]);

    async function createClient() {
        if (!name.trim()) {
            setError(
                "Client name is required.",
            );

            return;
        }

        try {
            setCreating(true);
            setError("");

            await apiFetch(
                "/api/clients",
                {
                    method: "POST",
                    body: JSON.stringify({
                        name:
                            name.trim(),
                        email:
                            email.trim() ||
                            undefined,
                    }),
                },
            );

            setName("");
            setEmail("");

            await loadClients();
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Failed to create client",
            );
        } finally {
            setCreating(false);
        }
    }

    if (loading) {
        return <p>Loading clients...</p>;
    }

    if (error) {
        return (
            <p className="text-red-600">
                {error}
            </p>
        );
    }

    return (
        <div>
            <div>
                <h2 className="text-2xl font-semibold text-slate-900">
                    Clients
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    Manage client portfolios and broker accounts.
                </p>

                {currentUserCan(
                    "ARCHIVE_CLIENT_DATA",
                ) && (
                    <button
                        type="button"
                        onClick={() =>
                            setShowArchived(
                                (current) =>
                                    !current,
                            )
                        }
                        className="mt-3 rounded-lg border px-3 py-1.5 text-sm"
                    >
                        {showArchived
                            ? "Show active clients"
                            : "Show archived clients"}
                    </button>
                )}
            </div>

            {canManage && (
                <div className="mt-6 rounded-xl border bg-white p-5">
                    <h3 className="font-medium text-slate-900">
                        Add client
                    </h3>

                    <div className="mt-4 grid gap-3 md:grid-cols-[1fr_1fr_auto]">
                        <input
                            value={name}
                            onChange={(event) =>
                                setName(
                                    event.target.value,
                                )
                            }
                            placeholder="Client name"
                            className="rounded-lg border px-3 py-2"
                        />

                        <input
                            value={email}
                            onChange={(event) =>
                                setEmail(
                                    event.target.value,
                                )
                            }
                            placeholder="Email (optional)"
                            type="email"
                            className="rounded-lg border px-3 py-2"
                        />

                        <button
                            type="button"
                            disabled={creating}
                            onClick={() =>
                                void createClient()
                            }
                            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
                        >
                            {creating
                                ? "Adding..."
                                : "Add Client"}
                        </button>
                    </div>
                </div>
            )}

            <div className="mt-6 overflow-hidden rounded-xl border bg-white">
                <table className="w-full text-left text-sm">
                    <thead className="border-b bg-slate-50 text-slate-600">
                        <tr>
                            <th className="px-5 py-3">
                                Client
                            </th>

                            <th className="px-5 py-3">
                                Broker
                            </th>

                            <th className="px-5 py-3">
                                Portfolio
                            </th>

                            <th className="px-5 py-3">
                                Holdings
                            </th>

                            <th className="px-5 py-3">
                                Status
                            </th>
                        </tr>
                    </thead>

                    
                    <tbody>
                        {clients.map((client) => (
                            <tr
                                key={client.id}
                                className="border-b last:border-b-0"
                            >
                                <td className="px-5 py-4">
                                    <Link
                                    to={`/clients/${client.id}`} className="font-medium text-slate-900 hover:underline"
                                    >
                                        {client.name}
                                    </Link>

                                    <p className="text-xs text-slate-500">
                                        {client.email ?? "—"}
                                    </p>
                                </td>

                                <td className="px-5 py-4">
                                    {client.brokerAccounts?.length
                                        ? client.brokerAccounts
                                            .map(
                                                (account) =>
                                                    `${account.broker} (${account.accountId})`,
                                            )
                                            .join(", ")
                                        : "—"}
                                </td>

                                <td className="px-5 py-4">
                                    {client.portfolios?.length
                                        ? client.portfolios
                                            .map(
                                                (portfolio) =>
                                                    portfolio.name,
                                            )
                                            .join(", ")
                                        : "—"}
                                </td>

                                <td className="px-5 py-4">
                                    {client.portfolios?.reduce(
                                        (sum, portfolio) =>
                                            sum +
                                            (portfolio.holdings?.length ?? 0),
                                        0,
                                    ) ?? 0}
                                </td>

                                <td className="px-5 py-4">
                                    {client.archivedAt
                                        ? "Archived"
                                        : "Active"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
