import type {
  Response,
} from "express";

import type {
  AuthenticatedRequest,
} from "../middleware/auth.middleware";

import {
  getOperationsSnapshot,
} from "../services/operations.service";

export async function getOperations(
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
    const snapshot =
      await getOperationsSnapshot(
        req.user.firmId,
      );

    return res.status(200).json({
      data: snapshot,
    });
  } catch (error) {
    console.error(
      "Failed to load operations snapshot:",
      error,
    );

    return res.status(500).json({
      error:
        "Failed to load operations snapshot",
    });
  }
}
