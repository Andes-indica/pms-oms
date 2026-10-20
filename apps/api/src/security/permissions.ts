import type {
  NextFunction,
  Response,
} from "express";

import type {
  AuthenticatedRequest,
  AuthUser,
} from "../middleware/auth.middleware";

export type UserRole =
  AuthUser["role"];

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
  | "VIEW_OPERATIONS"
  | "VIEW_BROKER_DETAILS"
  | "MANAGE_BROKERS"
  | "RECONCILE_BROKERS"
  | "MANAGE_CASH"
  | "MANAGE_INSTRUMENTS"
  | "DELETE_CLIENT_DATA"
  | "ARCHIVE_CLIENT_DATA"
  | "ARCHIVE_BROKERS"
  | "IMPORT_INSTRUMENTS";

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
  "VIEW_OPERATIONS",
  "VIEW_BROKER_DETAILS",
  "MANAGE_BROKERS",
  "RECONCILE_BROKERS",
  "MANAGE_CASH",
  "MANAGE_INSTRUMENTS",
  "DELETE_CLIENT_DATA",
  "ARCHIVE_CLIENT_DATA",
  "ARCHIVE_BROKERS",
  "IMPORT_INSTRUMENTS",
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
    "MANAGE_INSTRUMENTS",
  ],
  OPERATIONS: [
    "VIEW_DASHBOARD",
    "VIEW_CLIENTS",
    "VIEW_ORDERS",
    "OPERATE_ORDERS",
    "VIEW_AUDIT",
    "VIEW_OPERATIONS",
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

export function hasPermission(
  role: UserRole,
  permission: Permission,
) {
  return ROLE_PERMISSIONS[
    role
  ].includes(permission);
}

export function requirePermission(
  permission: Permission,
) {
  return (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ) => {
    if (!req.user) {
      return res.status(401).json({
        error:
          "Authentication required",
      });
    }

    if (
      !hasPermission(
        req.user.role,
        permission,
      )
    ) {
      return res.status(403).json({
        error:
          "Insufficient permissions",
      });
    }

    next();
  };
}
