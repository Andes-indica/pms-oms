import {
    useState,
} from "react";

import {
    apiFetch,
} from "../../lib/api";

import type {
    BrokerAccount,
} from "./types";

type Props = {
    clientId: string;
    accounts: BrokerAccount[];
    onChanged?: () => void;
};

type ConfigureResponse = {
    data: {
        brokerAccountId: string;
        status: string;
    };
};

type CredentialsState = {
    apiKey: string;
    apiSecret: string;
};

function formatDate(
    value?: string | null,
) {
    if (!value) {
        return "—";
    }

    const date =
        new Date(value);

    if (
        Number.isNaN(
            date.getTime(),
        )
    ) {
        return "—";
    }

    return date.toLocaleString();
}

function getStatus(
    account: BrokerAccount,
) {
    return (
        account.connection
            ?.status ??
        "DISCONNECTED"
    );
}

function getStatusClasses(
    status: string,
) {
    switch (status) {
        case "CONNECTED":
            return "bg-emerald-50 text-emerald-700";

        case "EXPIRED":
            return "bg-amber-50 text-amber-700";

        case "ERROR":
            return "bg-red-50 text-red-700";

        default:
            return "bg-slate-100 text-slate-600";
    }
}

function canManageBrokerAccounts() {
    const rawUser =
        localStorage.getItem(
            "user",
        );

    if (!rawUser) {
        return false;
    }

    try {
        const user =
            JSON.parse(rawUser);

        return (
            user?.role ===
            "ADMIN" ||
            user?.role ===
            "PORTFOLIO_MANAGER"
        );
    } catch {
        return false;
    }
}

export function BrokerAccountsCard({
    clientId, accounts, onChanged
}: Props) {
    const [editingId, setEditingId] =
        useState<string | null>(
            null,
        );

    const [
        credentials,
        setCredentials,
    ] =
        useState<CredentialsState>({
            apiKey: "",
            apiSecret: "",
        });
    const [
        addingAccount,
        setAddingAccount,
    ] = useState(false);

    const [
        creatingAccount,
        setCreatingAccount,
    ] = useState(false);

    const [
        newAccount,
        setNewAccount,
    ] = useState({
        broker: "ZERODHA",
        accountId: "",
        accountLabel: "",
    });
    const [
        connectingId,
        setConnectingId,
    ] =
        useState<string | null>(
            null,
        );
    const [savingId, setSavingId] =
        useState<string | null>(
            null,
        );

    const [message, setMessage] =
        useState("");

    const [error, setError] =
        useState("");

    const canManage =
        canManageBrokerAccounts();

    function startConfigure(
        brokerAccountId: string,
    ) {
        setEditingId(
            brokerAccountId,
        );

        /*
         * Never pre-populate broker secrets.
         */
        setCredentials({
            apiKey: "",
            apiSecret: "",
        });

        setMessage("");
        setError("");
    }

    function cancelConfigure() {
        setEditingId(null);

        setCredentials({
            apiKey: "",
            apiSecret: "",
        });

        setMessage("");
        setError("");
    }

    async function createBrokerAccount() {
        setError("");
        setMessage("");

        if (!newAccount.accountId.trim()) {
            setError(
                "Broker account ID is required.",
            );

            return;
        }

        try {
            setCreatingAccount(true);

            await apiFetch<{
                data: {
                    id: string;
                    broker: string;
                    accountId: string;
                    accountLabel:
                    | string
                    | null;
                };
            }>(
                `/api/clients/${clientId}/broker-accounts`,
                {
                    method: "POST",

                    body: JSON.stringify({
                        broker:
                            newAccount.broker,

                        accountId:
                            newAccount.accountId.trim(),

                        accountLabel:
                            newAccount.accountLabel.trim() ||
                            undefined,
                    }),
                },
            );

            setNewAccount({
                broker: "ZERODHA",
                accountId: "",
                accountLabel: "",
            });

            setAddingAccount(false);

            setMessage(
                "Broker account added successfully.",
            );

            onChanged?.();
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Failed to add broker account",
            );
        } finally {
            setCreatingAccount(false);
        }
    }
    async function configureZerodha(
        account: BrokerAccount,
    ) {
        setError("");
        setMessage("");

        if (
            !credentials.apiKey.trim() ||
            !credentials.apiSecret.trim()
        ) {
            setError(
                "API key and API secret are required.",
            );

            return;
        }

        try {
            setSavingId(
                account.id,
            );

            await apiFetch<ConfigureResponse>(
                `/api/broker-connections/${account.id}/zerodha/configure`,
                {
                    method: "PUT",

                    body: JSON.stringify({
                        apiKey:
                            credentials.apiKey.trim(),

                        apiSecret:
                            credentials.apiSecret.trim(),
                    }),
                },
            );

            /*
             * Clear secrets immediately after
             * they have been sent.
             */
            setCredentials({
                apiKey: "",
                apiSecret: "",
            });

            setEditingId(null);

            setMessage(
                `${account.accountId} configured successfully.`,
            ); onChanged?.();
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Failed to configure broker account",
            );
        } finally {
            setSavingId(null);
        }
    }

    return (
        <section className="rounded-xl border bg-white">
            <div className="flex items-center justify-between border-b px-5 py-4">
                <div>
                    <h3 className="font-semibold text-slate-900">
                        Broker Accounts
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                        Trading accounts connected to this client.
                    </p>
                </div>

                {canManage && (
                    <button
                        type="button"
                        onClick={() => {
                            setAddingAccount(
                                (current) =>
                                    !current,
                            );

                            setError("");
                            setMessage("");
                        }}
                        className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white"
                    >
                        Add Broker Account
                    </button>
                )}
            </div>
            {addingAccount && (
                <div className="border-b bg-slate-50 p-5">
                    <div className="grid gap-4 sm:grid-cols-3">
                        <label className="text-sm">
                            <span className="text-slate-600">
                                Broker
                            </span>

                            <select
                                value={
                                    newAccount.broker
                                }
                                onChange={(event) =>
                                    setNewAccount(
                                        (current) => ({
                                            ...current,

                                            broker:
                                                event.target
                                                    .value,
                                        }),
                                    )
                                }
                                className="mt-1 w-full rounded-lg border bg-white px-3 py-2"
                            >
                                <option value="ZERODHA">
                                    Zerodha
                                </option>
                            </select>
                        </label>

                        <label className="text-sm">
                            <span className="text-slate-600">
                                Account ID
                            </span>

                            <input
                                value={
                                    newAccount.accountId
                                }
                                onChange={(event) =>
                                    setNewAccount(
                                        (current) => ({
                                            ...current,

                                            accountId:
                                                event.target
                                                    .value,
                                        }),
                                    )
                                }
                                placeholder="e.g. AB1234"
                                autoComplete="off"
                                className="mt-1 w-full rounded-lg border bg-white px-3 py-2"
                            />
                        </label>

                        <label className="text-sm">
                            <span className="text-slate-600">
                                Label
                            </span>

                            <input
                                value={
                                    newAccount.accountLabel
                                }
                                onChange={(event) =>
                                    setNewAccount(
                                        (current) => ({
                                            ...current,

                                            accountLabel:
                                                event.target
                                                    .value,
                                        }),
                                    )
                                }
                                placeholder="Primary"
                                className="mt-1 w-full rounded-lg border bg-white px-3 py-2"
                            />
                        </label>
                    </div>

                    <p className="mt-3 text-xs text-slate-500">
                        Account ID must be the actual Zerodha user ID that will log in to this account.
                    </p>

                    <div className="mt-4 flex gap-2">
                        <button
                            type="button"
                            disabled={
                                creatingAccount
                            }
                            onClick={
                                createBrokerAccount
                            }
                            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
                        >
                            {creatingAccount
                                ? "Adding..."
                                : "Add Account"}
                        </button>

                        <button
                            type="button"
                            disabled={
                                creatingAccount
                            }
                            onClick={() => {
                                setAddingAccount(
                                    false,
                                );

                                setNewAccount({
                                    broker:
                                        "ZERODHA",

                                    accountId: "",

                                    accountLabel:
                                        "",
                                });
                            }}
                            className="rounded-lg border px-4 py-2 text-sm text-slate-700"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
            {message && (
                <div className="mx-5 mt-4 rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                    {message}
                </div>
            )}

            {error && (
                <div className="mx-5 mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                </div>
            )}

            {accounts.length === 0 ? (
                <div className="p-5 text-sm text-slate-500">
                    No broker accounts.
                </div>
            ) : (
                <div className="divide-y">
                    {accounts.map(
                        (account) => {
                            const status =
                                getStatus(
                                    account,
                                );

                            const isZerodha =
                                account.broker
                                    .toUpperCase() ===
                                "ZERODHA";

                            const isMock =
                                account.broker
                                    .toUpperCase() ===
                                "MOCK";

                            const editing =
                                editingId ===
                                account.id;

                            return (
                                <div
                                    key={account.id}
                                    className="p-5"
                                >
                                    <div className="flex flex-wrap items-start justify-between gap-4">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <p className="font-medium text-slate-900">
                                                    {account.broker}
                                                </p>

                                                <span
                                                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${getStatusClasses(
                                                        status,
                                                    )}`}
                                                >
                                                    {status}
                                                </span>
                                            </div>

                                            <p className="mt-1 text-sm text-slate-600">
                                                {account.accountId}
                                            </p>

                                            {account.accountLabel && (
                                                <p className="mt-1 text-xs text-slate-500">
                                                    {
                                                        account.accountLabel
                                                    }
                                                </p>
                                            )}
                                        </div>

                                        {canManage &&
                                            isZerodha &&
                                            !editing && (
                                                <div className="flex gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            startConfigure(
                                                                account.id,
                                                            )
                                                        }
                                                        className="rounded-lg border px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                                                    >
                                                        {account.connection
                                                            ? "Reconfigure"
                                                            : "Configure"}
                                                    </button>

                                                    {account.connection && (
                                                        <button
                                                            type="button"
                                                            disabled={
                                                                connectingId ===
                                                                account.id
                                                            }
                                                            onClick={() =>
                                                                connectZerodha(
                                                                    account,
                                                                )
                                                            }
                                                            className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white disabled:opacity-50"
                                                        >
                                                            {connectingId ===
                                                                account.id
                                                                ? "Connecting..."
                                                                : account.connection
                                                                    .status ===
                                                                    "CONNECTED"
                                                                    ? "Reconnect"
                                                                    : "Connect Zerodha"}
                                                        </button>
                                                    )}
                                                </div>
                                            )}
                                    </div>

                                    {isMock && (
                                        <p className="mt-4 text-sm text-slate-500">
                                            Mock broker requires no external credentials.
                                        </p>
                                    )}

                                    {account.connection && (
                                        <div className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
                                            <div>
                                                <p className="text-xs text-slate-500">
                                                    Broker User
                                                </p>

                                                <p className="mt-1 text-slate-900">
                                                    {account.connection
                                                        .externalUserId ??
                                                        "—"}
                                                </p>
                                            </div>

                                            <div>
                                                <p className="text-xs text-slate-500">
                                                    Last Connected
                                                </p>

                                                <p className="mt-1 text-slate-900">
                                                    {formatDate(
                                                        account.connection
                                                            .lastConnectedAt,
                                                    )}
                                                </p>
                                            </div>

                                            <div>
                                                <p className="text-xs text-slate-500">
                                                    Session Expires
                                                </p>

                                                <p className="mt-1 text-slate-900">
                                                    {formatDate(
                                                        account.connection
                                                            .sessionExpiresAt,
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {editing &&
                                        isZerodha && (
                                            <div className="mt-5 rounded-lg border bg-slate-50 p-4">
                                                <p className="text-sm font-medium text-slate-900">
                                                    Zerodha API credentials
                                                </p>

                                                <p className="mt-1 text-xs text-slate-500">
                                                    Credentials are sent to the backend and stored encrypted. They are not saved in browser storage.
                                                </p>

                                                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                                                    <label className="text-sm">
                                                        <span className="text-slate-600">
                                                            API Key
                                                        </span>

                                                        <input
                                                            type="text"
                                                            value={
                                                                credentials.apiKey
                                                            }
                                                            onChange={(
                                                                event,
                                                            ) =>
                                                                setCredentials(
                                                                    (
                                                                        current,
                                                                    ) => ({
                                                                        ...current,

                                                                        apiKey:
                                                                            event
                                                                                .target
                                                                                .value,
                                                                    }),
                                                                )
                                                            }
                                                            autoComplete="off"
                                                            className="mt-1 w-full rounded-lg border bg-white px-3 py-2 outline-none focus:border-slate-400"
                                                        />
                                                    </label>

                                                    <label className="text-sm">
                                                        <span className="text-slate-600">
                                                            API Secret
                                                        </span>

                                                        <input
                                                            type="password"
                                                            value={
                                                                credentials.apiSecret
                                                            }
                                                            onChange={(
                                                                event,
                                                            ) =>
                                                                setCredentials(
                                                                    (
                                                                        current,
                                                                    ) => ({
                                                                        ...current,

                                                                        apiSecret:
                                                                            event
                                                                                .target
                                                                                .value,
                                                                    }),
                                                                )
                                                            }
                                                            autoComplete="new-password"
                                                            className="mt-1 w-full rounded-lg border bg-white px-3 py-2 outline-none focus:border-slate-400"
                                                        />
                                                    </label>
                                                </div>

                                                <div className="mt-4 flex gap-2">
                                                    <button
                                                        type="button"
                                                        disabled={
                                                            savingId ===
                                                            account.id
                                                        }
                                                        onClick={() =>
                                                            configureZerodha(
                                                                account,
                                                            )
                                                        }
                                                        className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
                                                    >
                                                        {savingId ===
                                                            account.id
                                                            ? "Saving..."
                                                            : "Save Credentials"}
                                                    </button>

                                                    <button
                                                        type="button"
                                                        disabled={
                                                            savingId ===
                                                            account.id
                                                        }
                                                        onClick={
                                                            cancelConfigure
                                                        }
                                                        className="rounded-lg border px-4 py-2 text-sm text-slate-700"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                </div>
                            );
                        },
                    )}
                </div>
            )}
        </section>
    );
    async function connectZerodha(
        account: BrokerAccount,
    ) {
        setError("");
        setMessage("");

        try {
            setConnectingId(
                account.id,
            );

            const response =
                await apiFetch<{
                    data: {
                        loginUrl: string;
                    };
                }>(
                    `/api/broker-connections/${account.id}/zerodha/login-url`,
                );

            /*
             * Only identifiers/navigation state
             * go into sessionStorage.
             *
             * Never API secrets or access tokens.
             */
            sessionStorage.setItem(
                "pendingZerodhaBrokerAccountId",
                account.id,
            );

            sessionStorage.setItem(
                "pendingZerodhaReturnPath",
                window.location.pathname,
            );

            window.location.assign(
                response.data.loginUrl,
            );
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Failed to start Zerodha login",
            );

            setConnectingId(null);
        }
    }
}