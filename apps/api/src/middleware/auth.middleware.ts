import type {
  NextFunction,
  Request,
  Response,
} from "express";

import {
  verifyAccessToken,
} from "../services/auth-token.service";
import { prisma } from "@pms-oms/db";

export type AuthUser = {
  userId: string;
  firmId: string;
  role:
    | "ADMIN"
    | "PORTFOLIO_MANAGER"
    | "OPERATIONS"
    | "VIEWER";
};

export type AuthenticatedRequest =
  Request & {
    user?: AuthUser;
  };

export async function requireAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const authorization =
      req.headers.authorization;

    if (
      !authorization ||
      !authorization.startsWith(
        "Bearer ",
      )
    ) {
      return res.status(401).json({
        error:
          "Authentication required",
      });
    }

    const token =
      authorization.slice(7);

    const payload =
      await verifyAccessToken(
        token,
      );

    const user = await prisma.user.findFirst({
      where: {
        id: payload.userId,
        firmId: payload.firmId,
      },
      select: {
        id: true,
        firmId: true,
        role: true,
      },
    });

    if (!user) {
      throw new Error("INVALID_TOKEN_USER");
    }

    req.user = {
      userId: user.id,
      firmId: user.firmId,
      role: user.role,
    };

    next();
  } catch {
    return res.status(401).json({
      error:
        "Invalid or expired token",
    });
  }
}
