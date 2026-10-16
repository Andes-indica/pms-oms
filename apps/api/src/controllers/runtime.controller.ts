import type {
  Response,
} from "express";

import type {
  AuthenticatedRequest,
} from "../middleware/auth.middleware";

import {
  getMarketDataCapabilities,
} from "../services/market-data.service";

export function getRuntimeCapabilities(
  req: AuthenticatedRequest,
  res: Response,
) {
  if (!req.user) {
    return res.status(401).json({
      error:
        "Authentication required",
    });
  }

  return res.status(200).json({
    data: {
      marketData:
        getMarketDataCapabilities(),
    },
  });
}
