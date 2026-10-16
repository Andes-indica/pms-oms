export const USER_ROLES = [
  "ADMIN",
  "PORTFOLIO_MANAGER",
  "OPERATIONS",
  "VIEWER",
] as const;

export type UserRole =
  (typeof USER_ROLES)[number];

export type Permission =
  | "VIEW_DASHBOARD"
  | "VIEW_CLIENTS"
  | "MANAGE_CLIENTS"
  | "VIEW_ORDERS"
  | "CREATE_ORDERS"
  | "EXECUTE_ORDERS"
  | "OPERATE_ORDERS"
  | "VIEW_RISK"
  | "MANAGE_RISK"
  | "VIEW_USERS"
  | "MANAGE_USERS"
  | "VIEW_AUDIT"
  | "VIEW_BROKER_DETAILS"
  | "MANAGE_BROKERS"
  | "RECONCILE_BROKERS"
  | "MANAGE_CASH"
  | "DELETE_CLIENT_DATA"
  | "ARCHIVE_BROKERS";

const ALL_PERMISSIONS: readonly Permission[] = [
  "VIEW_DASHBOARD",
  "VIEW_CLIENTS",
  "MANAGE_CLIENTS",
  "VIEW_ORDERS",
  "CREATE_ORDERS",
  "EXECUTE_ORDERS",
  "OPERATE_ORDERS",
  "VIEW_RISK",
  "MANAGE_RISK",
  "VIEW_USERS",
  "MANAGE_USERS",
  "VIEW_AUDIT",
  "VIEW_BROKER_DETAILS",
  "MANAGE_BROKERS",
  "RECONCILE_BROKERS",
  "MANAGE_CASH",
  "DELETE_CLIENT_DATA",
  "ARCHIVE_BROKERS",
];

export const ROLE_PERMISSIONS: Record<
  UserRole,
  readonly Permission[]
> = {
  ADMIN: ALL_PERMISSIONS,
  PORTFOLIO_MANAGER: [
    "VIEW_DASHBOARD",
    "VIEW_CLIENTS",
    "MANAGE_CLIENTS",
    "VIEW_ORDERS",
    "CREATE_ORDERS",
    "EXECUTE_ORDERS",
    "OPERATE_ORDERS",
    "VIEW_RISK",
    "MANAGE_RISK",
    "VIEW_BROKER_DETAILS",
    "MANAGE_BROKERS",
    "RECONCILE_BROKERS",
    "MANAGE_CASH",
  ],
  OPERATIONS: [
    "VIEW_DASHBOARD",
    "VIEW_CLIENTS",
    "VIEW_ORDERS",
    "OPERATE_ORDERS",
    "VIEW_AUDIT",
    "VIEW_BROKER_DETAILS",
    "RECONCILE_BROKERS",
    "MANAGE_CASH",
  ],
  VIEWER: [
    "VIEW_DASHBOARD",
    "VIEW_CLIENTS",
    "VIEW_ORDERS",
    "VIEW_BROKER_DETAILS",
  ],
};

export type StoredUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  firmId: string;
};

export function isUserRole(
  value: unknown,
): value is UserRole {
  return (
    typeof value === "string" &&
    USER_ROLES.includes(
      value as UserRole,
    )
  );
}

export function getCurrentUser(): StoredUser | null {
  const raw =
    localStorage.getItem("user");

  if (!raw) {
    return null;
  }

  try {
    const value = JSON.parse(raw) as Partial<StoredUser>;

    if (
      typeof value.id !== "string" ||
      typeof value.name !== "string" ||
      typeof value.email !== "string" ||
      typeof value.firmId !== "string" ||
      !isUserRole(value.role)
    ) {
      return null;
    }

    return value as StoredUser;
  } catch {
    return null;
  }
}

export function hasPermission(
  role: UserRole | null | undefined,
  permission: Permission,
) {
  return Boolean(
    role &&
      ROLE_PERMISSIONS[role].includes(
        permission,
      ),
  );
}

export function currentUserCan(
  permission: Permission,
) {
  return hasPermission(
    getCurrentUser()?.role,
    permission,
  );
}
