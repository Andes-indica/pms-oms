import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  apiFetch,
} from "../lib/api";

type UserRole =
  | "ADMIN"
  | "PORTFOLIO_MANAGER"
  | "OPERATIONS"
  | "VIEWER";

type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
};

type UsersResponse = {
  data: User[];
};

export function UsersPage() {
  const [users, setUsers] =
    useState<User[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const loadUsers =
    useCallback(async () => {
      try {
        setError("");

        const response =
          await apiFetch<UsersResponse>(
            "/api/users",
          );

        setUsers(response.data);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Failed to load users",
        );
      } finally {
        setLoading(false);
      }
    }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  if (loading) {
    return (
      <p className="text-slate-500">
        Loading users...
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">
          User Management
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Manage firm users and access roles.
        </p>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      <CreateUserForm
        onCreated={loadUsers}
      />

      <UsersTable
        users={users}
        onUpdated={loadUsers}
      />
    </div>
  );
}

function CreateUserForm({
  onCreated,
}: {
  onCreated: () => Promise<void>;
}) {
  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [role, setRole] =
    useState<UserRole>(
      "PORTFOLIO_MANAGER",
    );

  const [submitting, setSubmitting] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleSubmit(
    event:
      React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    try {
      setSubmitting(true);
      setError("");

      await apiFetch(
        "/api/users",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            name,
            email,
            password,
            role,
          }),
        },
      );

      setName("");
      setEmail("");
      setPassword("");

      setRole(
        "PORTFOLIO_MANAGER",
      );

      await onCreated();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to create user",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border bg-white p-5"
    >
      <h3 className="font-semibold">
        Add User
      </h3>

      <div className="mt-5 grid gap-4 md:grid-cols-4">
        <input
          value={name}
          onChange={(event) =>
            setName(
              event.target.value,
            )
          }
          placeholder="Name"
          required
          className="rounded-lg border px-3 py-2"
        />

        <input
          type="email"
          value={email}
          onChange={(event) =>
            setEmail(
              event.target.value,
            )
          }
          placeholder="Email"
          required
          className="rounded-lg border px-3 py-2"
        />

        <input
          type="password"
          value={password}
          onChange={(event) =>
            setPassword(
              event.target.value,
            )
          }
          placeholder="Password"
          required
          className="rounded-lg border px-3 py-2"
        />

        <select
          value={role}
          onChange={(event) =>
            setRole(
              event.target
                .value as UserRole,
            )
          }
          className="rounded-lg border px-3 py-2"
        >
          <option value="ADMIN">
            Admin
          </option>

          <option value="PORTFOLIO_MANAGER">
            Portfolio Manager
          </option>

          <option value="OPERATIONS">
            Operations
          </option>

          <option value="VIEWER">
            Viewer
          </option>
        </select>
      </div>

      {error && (
        <p className="mt-3 text-sm text-red-600">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="mt-4 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
      >
        {submitting
          ? "Creating..."
          : "Create User"}
      </button>
    </form>
  );
}

function UsersTable({
  users,
  onUpdated,
}: {
  users: User[];
  onUpdated: () => Promise<void>;
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
            <th className="px-5 py-3">
              User
            </th>

            <th className="px-5 py-3">
              Email
            </th>

            <th className="px-5 py-3">
              Role
            </th>

            <th className="px-5 py-3">
              Created
            </th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <UserRow
              key={user.id}
              user={user}
              onUpdated={onUpdated}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function UserRow({
  user,
  onUpdated,
}: {
  user: User;
  onUpdated: () => Promise<void>;
}) {
  const [role, setRole] =
    useState<UserRole>(
      user.role,
    );

  const [saving, setSaving] =
    useState(false);

  async function updateRole(
    newRole: UserRole,
  ) {
    const previousRole = role;

    setRole(newRole);

    try {
      setSaving(true);

      await apiFetch(
        `/api/users/${user.id}/role`,
        {
          method: "PATCH",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            role: newRole,
          }),
        },
      );

      await onUpdated();
    } catch (error) {
      setRole(previousRole);

      console.error(
        "Role update failed:",
        error,
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <tr className="border-t">
      <td className="px-5 py-4 font-medium">
        {user.name}
      </td>

      <td className="px-5 py-4 text-slate-600">
        {user.email}
      </td>

      <td className="px-5 py-4">
        <select
          value={role}
          disabled={saving}
          onChange={(event) =>
            updateRole(
              event.target
                .value as UserRole,
            )
          }
          className="rounded-lg border px-3 py-2"
        >
          <option value="ADMIN">
            Admin
          </option>

          <option value="PORTFOLIO_MANAGER">
            Portfolio Manager
          </option>

          <option value="OPERATIONS">
            Operations
          </option>

          <option value="VIEWER">
            Viewer
          </option>
        </select>
      </td>

      <td className="px-5 py-4 text-slate-500">
        {new Date(
          user.createdAt,
        ).toLocaleDateString(
          "en-IN",
        )}
      </td>
    </tr>
  );
}