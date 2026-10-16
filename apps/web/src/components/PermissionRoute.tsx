import type {
  ReactNode,
} from "react";
import {
  Navigate,
} from "react-router-dom";

import {
  getCurrentUser,
  hasPermission,
  type Permission,
} from "../lib/permissions";

export function PermissionRoute({
  permission,
  children,
}: {
  permission: Permission;
  children: ReactNode;
}) {
  const user = getCurrentUser();

  if (
    !user ||
    !hasPermission(
      user.role,
      permission,
    )
  ) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  return children;
}
