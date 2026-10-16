import {
  useCallback,
  useEffect,
  useState,
  type FormEvent,
} from "react";

import { apiFetch } from "../lib/api";
import {
  getCurrentUser,
  type UserRole,
} from "../lib/permissions";

type UserStatus = "INVITED" | "ACTIVE" | "DISABLED";

type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  invitedAt: string | null;
  activatedAt: string | null;
  disabledAt: string | null;
  passwordChangedAt: string | null;
  createdAt: string;
};

type LinkResult = {
  token: string;
  expiresAt: string;
};

function accountSetupUrl(token: string) {
  return `${window.location.origin}/account-setup#token=${encodeURIComponent(token)}`;
}

function readableError(error: unknown) {
  if (!(error instanceof Error)) {
    return "The request failed.";
  }

  const messages: Record<string, string> = {
    LAST_ACTIVE_ADMIN_REQUIRED:
      "At least one active administrator is required.",
    SELF_ROLE_CHANGE_NOT_ALLOWED:
      "You cannot remove your own administrator role.",
    SELF_DISABLE_NOT_ALLOWED:
      "You cannot disable your own account.",
    USER_DISABLED:
      "Reactivate this account before creating a password link.",
  };

  return messages[error.message] ?? error.message;
}

export function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [generatedLink, setGeneratedLink] = useState<{
    url: string;
    expiresAt: string;
    purpose: string;
  } | null>(null);

  const loadUsers = useCallback(async () => {
    try {
      setError("");
      const response = await apiFetch<{ data: User[] }>(
        "/api/users",
      );
      setUsers(response.data);
    } catch (error) {
      setError(readableError(error));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadUsers();
  }, [loadUsers]);

  function showLink(result: LinkResult, purpose: string) {
    setGeneratedLink({
      url: accountSetupUrl(result.token),
      expiresAt: result.expiresAt,
      purpose,
    });
  }

  if (loading) {
    return <p className="text-slate-500">Loading users...</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">
          User Management
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Invite staff, assign roles, and control account access.
        </p>
      </div>

      {error && <Feedback message={error} />}

      {generatedLink && (
        <GeneratedLink
          {...generatedLink}
          onClose={() => setGeneratedLink(null)}
        />
      )}

      <InviteUserForm
        onCreated={async (result) => {
          showLink(result, "Invitation link");
          await loadUsers();
        }}
      />

      <UsersTable
        users={users}
        currentUserId={getCurrentUser()?.id ?? null}
        onError={setError}
        onLink={showLink}
        onUpdated={loadUsers}
      />
    </div>
  );
}

function Feedback({ message }: { message: string }) {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
      {message}
    </div>
  );
}

function GeneratedLink({
  url,
  expiresAt,
  purpose,
  onClose,
}: {
  url: string;
  expiresAt: string;
  purpose: string;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
  }

  return (
    <div className="rounded-xl border border-amber-300 bg-amber-50 p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-semibold text-amber-950">
            {purpose} created
          </h3>
          <p className="mt-1 text-sm text-amber-900">
            Share this once through a secure channel. Generating another link invalidates this one.
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-sm text-amber-900 underline"
        >
          Close
        </button>
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <input
          aria-label={purpose}
          readOnly
          value={url}
          onFocus={(event) => event.currentTarget.select()}
          className="min-w-0 flex-1 rounded-lg border border-amber-300 bg-white px-3 py-2 text-sm"
        />
        <button
          type="button"
          onClick={() => void copyLink()}
          className="rounded-lg bg-amber-900 px-4 py-2 text-sm font-medium text-white"
        >
          {copied ? "Copied" : "Copy link"}
        </button>
      </div>
      <p className="mt-2 text-xs text-amber-800">
        Expires {new Date(expiresAt).toLocaleString("en-IN")}
      </p>
    </div>
  );
}

function InviteUserForm({
  onCreated,
}: {
  onCreated: (result: LinkResult) => Promise<void>;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<UserRole>(
    "PORTFOLIO_MANAGER",
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setSubmitting(true);
      setError("");
      const response = await apiFetch<{
        data: LinkResult & { user: User };
      }>("/api/users", {
        method: "POST",
        body: JSON.stringify({ name, email, role }),
      });

      setName("");
      setEmail("");
      setRole("PORTFOLIO_MANAGER");
      await onCreated(response.data);
    } catch (error) {
      setError(readableError(error));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border bg-white p-5"
    >
      <h3 className="font-semibold">Invite staff member</h3>
      <p className="mt-1 text-sm text-slate-500">
        The user sets their own password through a one-time link.
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <input
          autoComplete="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Name"
          required
          className="rounded-lg border px-3 py-2"
        />
        <input
          autoComplete="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email"
          required
          className="rounded-lg border px-3 py-2"
        />
        <RoleSelect value={role} onChange={setRole} />
      </div>

      {error && (
        <p className="mt-3 text-sm text-red-600">{error}</p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="mt-4 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
      >
        {submitting ? "Inviting..." : "Create invitation"}
      </button>
    </form>
  );
}

function RoleSelect({
  value,
  disabled = false,
  onChange,
}: {
  value: UserRole;
  disabled?: boolean;
  onChange: (role: UserRole) => void;
}) {
  return (
    <select
      value={value}
      disabled={disabled}
      onChange={(event) => onChange(event.target.value as UserRole)}
      className="rounded-lg border px-3 py-2"
    >
      <option value="ADMIN">Admin</option>
      <option value="PORTFOLIO_MANAGER">Portfolio Manager</option>
      <option value="OPERATIONS">Operations</option>
      <option value="VIEWER">Viewer</option>
    </select>
  );
}

function UsersTable({
  users,
  currentUserId,
  onUpdated,
  onLink,
  onError,
}: {
  users: User[];
  currentUserId: string | null;
  onUpdated: () => Promise<void>;
  onLink: (result: LinkResult, purpose: string) => void;
  onError: (message: string) => void;
}) {
  if (users.length === 0) {
    return (
      <div className="rounded-xl border bg-white p-5 text-sm text-slate-500">
        No users found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border bg-white">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 text-slate-600">
          <tr>
            <th className="px-5 py-3">User</th>
            <th className="px-5 py-3">Status</th>
            <th className="px-5 py-3">Role</th>
            <th className="px-5 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UserRow
              key={user.id}
              user={user}
              isCurrentUser={user.id === currentUserId}
              onUpdated={onUpdated}
              onLink={onLink}
              onError={onError}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function UserRow({
  user,
  isCurrentUser,
  onUpdated,
  onLink,
  onError,
}: {
  user: User;
  isCurrentUser: boolean;
  onUpdated: () => Promise<void>;
  onLink: (result: LinkResult, purpose: string) => void;
  onError: (message: string) => void;
}) {
  const [role, setRole] = useState<UserRole>(user.role);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setRole(user.role);
  }, [user.role]);

  async function perform(action: () => Promise<void>) {
    try {
      setSaving(true);
      onError("");
      await action();
      await onUpdated();
    } catch (error) {
      setRole(user.role);
      onError(readableError(error));
    } finally {
      setSaving(false);
    }
  }

  async function updateRole(newRole: UserRole) {
    const previousRole = role;
    setRole(newRole);
    await perform(async () => {
      try {
        await apiFetch(`/api/users/${user.id}/role`, {
          method: "PATCH",
          body: JSON.stringify({ role: newRole }),
        });
      } catch (error) {
        setRole(previousRole);
        throw error;
      }
    });
  }

  async function generateLink() {
    await perform(async () => {
      const response = await apiFetch<{ data: LinkResult }>(
        `/api/users/${user.id}/password-link`,
        { method: "POST" },
      );
      onLink(
        response.data,
        user.status === "INVITED"
          ? "Invitation link"
          : "Password reset link",
      );
    });
  }

  async function setEnabled(enabled: boolean) {
    await perform(async () => {
      await apiFetch(`/api/users/${user.id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ enabled }),
      });
    });
  }

  async function revokeSessions() {
    await perform(async () => {
      await apiFetch(`/api/users/${user.id}/revoke-sessions`, {
        method: "POST",
      });
    });
  }

  const statusClasses: Record<UserStatus, string> = {
    ACTIVE: "bg-emerald-100 text-emerald-800",
    INVITED: "bg-amber-100 text-amber-800",
    DISABLED: "bg-slate-200 text-slate-700",
  };

  return (
    <tr className="border-t align-top">
      <td className="px-5 py-4">
        <div className="font-medium text-slate-900">
          {user.name}{isCurrentUser ? " (you)" : ""}
        </div>
        <div className="mt-1 text-slate-500">{user.email}</div>
      </td>
      <td className="px-5 py-4">
        <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusClasses[user.status]}`}>
          {user.status}
        </span>
      </td>
      <td className="px-5 py-4">
        <RoleSelect
          value={role}
          disabled={
            saving ||
            user.status === "DISABLED" ||
            isCurrentUser
          }
          onChange={(nextRole) => void updateRole(nextRole)}
        />
      </td>
      <td className="px-5 py-4">
        <div className="flex min-w-64 flex-wrap gap-2">
          {user.status !== "DISABLED" && (
            <button
              type="button"
              disabled={saving}
              onClick={() => void generateLink()}
              className="rounded-lg border px-3 py-2 text-xs font-medium disabled:opacity-50"
            >
              {user.status === "INVITED"
                ? "Regenerate invite"
                : "Password reset link"}
            </button>
          )}
          {user.status === "ACTIVE" && (
            <button
              type="button"
              disabled={saving || isCurrentUser}
              onClick={() => void revokeSessions()}
              className="rounded-lg border px-3 py-2 text-xs font-medium disabled:opacity-50"
            >
              Revoke sessions
            </button>
          )}
          <button
            type="button"
            disabled={saving || isCurrentUser}
            onClick={() => void setEnabled(user.status === "DISABLED")}
            className="rounded-lg border px-3 py-2 text-xs font-medium disabled:opacity-50"
          >
            {user.status === "DISABLED" ? "Reactivate" : "Disable"}
          </button>
        </div>
      </td>
    </tr>
  );
}
