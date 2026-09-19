import type {
  Response,
} from "express";

import type {
  AuthenticatedRequest,
} from "../middleware/auth.middleware";

import {
  createUserService,
  getUsersService,
  updateUserRoleService,
} from "../services/user.service";

type CreateUserBody = {
  name: string;
  email: string;
  password: string;
  role:
    | "ADMIN"
    | "PORTFOLIO_MANAGER"
    | "OPERATIONS"
    | "VIEWER";
};

export async function createUser(
  req: AuthenticatedRequest & {
    body: CreateUserBody;
  },
  res: Response,
) {
  try {
    if (!req.user) {
      return res.status(401).json({
        error: "Authentication required",
      });
    }

    const {
      name,
      email,
      password,
      role,
    } = req.body;

    if (
      !name ||
      !email ||
      !password ||
      !role
    ) {
      return res.status(400).json({
        error:
          "name, email, password and role are required",
      });
    }

    const user =
      await createUserService({
        firmId: req.user.firmId,
        name,
        email,
        password,
        role,
      });

    return res.status(201).json({
      data: user,
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message ===
        "EMAIL_ALREADY_EXISTS"
    ) {
      return res.status(409).json({
        error:
          "A user with this email already exists",
      });
    }

    console.error(
      "User creation failed:",
      error,
    );

    return res.status(500).json({
      error: "User creation failed",
    });
  }
}
export async function getUsers(
  req: AuthenticatedRequest,
  res: Response,
) {
  try {
    if (!req.user) {
      return res.status(401).json({
        error: "Authentication required",
      });
    }

    const users =
      await getUsersService(
        req.user.firmId,
      );

    return res.status(200).json({
      data: users,
    });
  } catch (error) {
    console.error(
      "Failed to fetch users:",
      error,
    );

    return res.status(500).json({
      error: "Failed to fetch users",
    });
  }
}
type UpdateRoleBody = {
  role:
    | "ADMIN"
    | "PORTFOLIO_MANAGER"
    | "OPERATIONS"
    | "VIEWER";
};

export async function updateUserRole(
  req: AuthenticatedRequest & {
    params: {
      id: string;
    };
    body: UpdateRoleBody;
  },
  res: Response,
) {
  try {
    if (!req.user) {
      return res.status(401).json({
        error: "Authentication required",
      });
    }

    const user =
      await updateUserRoleService(
        req.params.id,
        req.user.firmId,
        req.body.role,
      );

    return res.status(200).json({
      data: user,
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message ===
        "USER_NOT_FOUND"
    ) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    console.error(
      "Role update failed:",
      error,
    );

    return res.status(500).json({
      error: "Role update failed",
    });
  }
}