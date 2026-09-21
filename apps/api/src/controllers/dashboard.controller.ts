import type {
  Response,
} from "express";

import type {
  AuthenticatedRequest,
} from "../middleware/auth.middleware";

import {
  getDashboardService,
} from "../services/dashboard.service";

export async function getDashboard(
  req: AuthenticatedRequest,
  res: Response,
) {
  try {
    if (!req.user) {
      return res.status(401).json({
        error:
          "Authentication required",
      });
    }

    const dashboard =
      await getDashboardService(
        req.user.firmId,
      );

    return res.status(200).json({
      data: dashboard,
    });
  } catch (error) {
    console.error(
      "Dashboard loading failed:",
      error,
    );

    return res.status(500).json({
      error:
        "Failed to load dashboard",
    });
  }
}