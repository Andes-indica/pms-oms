import type {
  Response,
} from "express";

import type {
  AuthenticatedRequest,
} from "../middleware/auth.middleware";

import {
  createUserInvitationService,
  createUserPasswordLinkService,
  getUsersService,
  revokeUserSessionsService,
  setUserEnabledService,
  updateUserRoleService,
  type UserRole,
} from "../services/user.service";

const USER_ROLES:
  readonly UserRole[] = [
    "ADMIN",
    "PORTFOLIO_MANAGER",
    "OPERATIONS",
    "VIEWER",
  ];

function handleUserError(
  res: Response,
  error: unknown,
) {
  const message =
    error instanceof Error
      ? error.message
      : "UNKNOWN_ERROR";

  if (
    message === "USER_NOT_FOUND"
  ) {
    return res.status(404).json({
      error: message,
    });
  }

  if (
    message ===
      "EMAIL_ALREADY_EXISTS"
  ) {
    return res.status(409).json({
      error:
        "A user with this email already exists",
    });
  }

  if (
    [
      "LAST_ACTIVE_ADMIN_REQUIRED",
      "SELF_ROLE_CHANGE_NOT_ALLOWED",
      "SELF_DISABLE_NOT_ALLOWED",
      "USER_DISABLED",
    ].includes(message)
  ) {
    return res.status(409).json({
      error: message,
    });
  }

  if (
    [
      "USER_NAME_REQUIRED",
      "USER_EMAIL_INVALID",
      "INVALID_USER_ROLE",
    ].includes(message)
  ) {
    return res.status(400).json({
      error: message,
    });
  }

  console.error(
    "User management failed:",
    error,
  );

  return res.status(500).json({
    error:
      "User management failed",
  });
}

export async function createUser(
  req: AuthenticatedRequest,
  res: Response,
) {
  if (!req.user) {
    return res.status(401).json({
      error:
        "Authentication required",
    });
  }

  const role =
    req.body?.role as
      | UserRole
      | undefined;

  if (
    !role ||
    !USER_ROLES.includes(role)
  ) {
    return res.status(400).json({
      error:
        "INVALID_USER_ROLE",
    });
  }

  try {
    const invitation =
      await createUserInvitationService({
        firmId: req.user.firmId,
        actorUserId:
          req.user.userId,
        name: req.body?.name ?? "",
        email:
          req.body?.email ?? "",
        role,
      });

    return res.status(201).json({
      data: invitation,
    });
  } catch (error) {
    return handleUserError(
      res,
      error,
    );
  }
}

export async function getUsers(
  req: AuthenticatedRequest,
  res: Response,
) {
  if (!req.user) {
    return res.status(401).json({
      error:
        "Authentication required",
    });
  }

  try {
    const users =
      await getUsersService(
        req.user.firmId,
      );

    return res.status(200).json({
      data: users,
    });
  } catch (error) {
    return handleUserError(
      res,
      error,
    );
  }
}

export async function updateUserRole(
  req: AuthenticatedRequest & {
    params: {
      id: string;
    };
  },
  res: Response,
) {
  if (!req.user) {
    return res.status(401).json({
      error:
        "Authentication required",
    });
  }

  const role =
    req.body?.role as
      | UserRole
      | undefined;

  if (
    !role ||
    !USER_ROLES.includes(role)
  ) {
    return res.status(400).json({
      error:
        "INVALID_USER_ROLE",
    });
  }

  try {
    const user =
      await updateUserRoleService(
        req.params.id,
        req.user.firmId,
        role,
        req.user.userId,
      );

    return res.status(200).json({
      data: user,
    });
  } catch (error) {
    return handleUserError(
      res,
      error,
    );
  }
}

export async function setUserEnabled(
  req: AuthenticatedRequest & {
    params: {
      id: string;
    };
  },
  res: Response,
) {
  if (!req.user) {
    return res.status(401).json({
      error:
        "Authentication required",
    });
  }

  if (
    typeof req.body?.enabled !==
      "boolean"
  ) {
    return res.status(400).json({
      error:
        "enabled must be a boolean",
    });
  }

  try {
    const user =
      await setUserEnabledService(
        req.params.id,
        req.user.firmId,
        req.body.enabled,
        req.user.userId,
      );

    return res.status(200).json({
      data: user,
    });
  } catch (error) {
    return handleUserError(
      res,
      error,
    );
  }
}

export async function revokeUserSessions(
  req: AuthenticatedRequest & {
    params: {
      id: string;
    };
  },
  res: Response,
) {
  if (!req.user) {
    return res.status(401).json({
      error:
        "Authentication required",
    });
  }

  try {
    const user =
      await revokeUserSessionsService(
        req.params.id,
        req.user.firmId,
        req.user.userId,
      );

    return res.status(200).json({
      data: user,
    });
  } catch (error) {
    return handleUserError(
      res,
      error,
    );
  }
}

export async function createUserPasswordLink(
  req: AuthenticatedRequest & {
    params: {
      id: string;
    };
  },
  res: Response,
) {
  if (!req.user) {
    return res.status(401).json({
      error:
        "Authentication required",
    });
  }

  try {
    const link =
      await createUserPasswordLinkService(
        req.params.id,
        req.user.firmId,
        req.user.userId,
      );

    return res.status(201).json({
      data: link,
    });
  } catch (error) {
    return handleUserError(
      res,
      error,
    );
  }
}
