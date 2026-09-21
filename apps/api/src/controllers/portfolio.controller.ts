import type {
  Response,
} from "express";

import type {
  AuthenticatedRequest,
} from "../middleware/auth.middleware";

import {
  getPortfolioValuationService,
} from "../services/portfolio-valuation.service";

export async function getPortfolioValuation(
  req: AuthenticatedRequest & {
    params: {
      id: string;
    };
  },
  res: Response,
) {
  try {
    if (!req.user) {
      return res.status(401).json({
        error:
          "Authentication required",
      });
    }

    const valuation =
      await getPortfolioValuationService(
        req.params.id,
        req.user.firmId,
      );

    return res.status(200).json({
      data: valuation,
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message ===
        "PORTFOLIO_NOT_FOUND"
    ) {
      return res.status(404).json({
        error:
          "Portfolio not found",
      });
    }

    console.error(
      "Portfolio valuation failed:",
      error,
    );

    return res.status(500).json({
      error:
        "Portfolio valuation failed",
    });
  }
}