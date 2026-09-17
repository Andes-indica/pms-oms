import type {
  NextFunction,
  Response,
} from "express";

import type {
  AuthenticatedRequest,
  AuthUser,
} from "./auth.middleware";

type UserRole =
  AuthUser["role"];

export function requireRole(
  ...allowedRoles: UserRole[]
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
      !allowedRoles.includes(
        req.user.role,
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