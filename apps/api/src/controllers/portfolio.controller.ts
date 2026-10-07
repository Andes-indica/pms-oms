import type {
  Response,
} from "express";

import type {
  AuthenticatedRequest,
} from "../middleware/auth.middleware";

import {
  getPortfolioValuationService,
} from "../services/portfolio-valuation.service";
import {
  createPortfolioService,
  updatePortfolioService,
  deletePortfolioService,
} from "../services/portfolio-management.service";

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

export async function createPortfolio(
  req: AuthenticatedRequest & {
    params: {
      clientId: string;
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

    const portfolio =
      await createPortfolioService(
        req.params.clientId,
        req.user.firmId,
        req.body,
      );

    return res.status(201).json({
      data: portfolio,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "UNKNOWN_ERROR";

    if (
      message ===
      "CLIENT_NOT_FOUND"
    ) {
      return res.status(404).json({
        error:
          "Client not found",
      });
    }

    if (
      message ===
        "PORTFOLIO_NAME_REQUIRED" ||
      message ===
        "INVALID_INITIAL_CASH"
    ) {
      return res.status(400).json({
        error: message,
      });
    }

    throw error;
  }
}

export async function updatePortfolio(
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

    const portfolio =
      await updatePortfolioService(
        req.params.id,
        req.user.firmId,
        req.body,
      );

    return res.status(200).json({
      data: portfolio,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "UNKNOWN_ERROR";

    if (
      message ===
      "PORTFOLIO_NOT_FOUND"
    ) {
      return res.status(404).json({
        error:
          "Portfolio not found",
      });
    }

    if (
      message ===
      "PORTFOLIO_NAME_REQUIRED"
    ) {
      return res.status(400).json({
        error:
          "Portfolio name is required",
      });
    }

    throw error;
  }
}

export async function deletePortfolio(
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

    const result =
      await deletePortfolioService(
        req.params.id,
        req.user.firmId,
      );

    return res.status(200).json({
      data: result,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "UNKNOWN_ERROR";

    if (
      message ===
      "PORTFOLIO_NOT_FOUND"
    ) {
      return res.status(404).json({
        error:
          "Portfolio not found",
      });
    }

    if (
      message ===
      "PORTFOLIO_NOT_EMPTY"
    ) {
      return res.status(409).json({
        error:
          "Portfolio has holdings or orders and cannot be deleted",
      });
    }

    throw error;
  }
}
