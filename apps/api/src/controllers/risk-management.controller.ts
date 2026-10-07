import type {
  Response,
} from "express";

import type {
  AuthenticatedRequest,
} from "../middleware/auth.middleware";

import {
  addRestrictedSecurity,
  clearPortfolioRiskLimit,
  listRestrictedSecurities,
  removeRestrictedSecurity,
  setPortfolioRiskLimit,
} from "../services/risk-management.service";

function errorMessage(
  error: unknown,
) {
  return error instanceof Error
    ? error.message
    : "UNKNOWN_ERROR";
}

export async function updatePortfolioRiskLimit(
  req: AuthenticatedRequest & {
    params: {
      id: string;
    };
  },
  res: Response,
) {
  if (!req.user) {
    return res.status(401).json({
      error: "Authentication required",
    });
  }

  try {
    const data =
      await setPortfolioRiskLimit(
        req.params.id,
        req.user.firmId,
        req.body,
      );

    return res.status(200).json({
      data,
    });
  } catch (error) {
    const message =
      errorMessage(error);

    if (
      message ===
      "PORTFOLIO_NOT_FOUND"
    ) {
      return res.status(404).json({
        error: "Portfolio not found",
      });
    }

    if (
      message.startsWith(
        "INVALID_",
      )
    ) {
      return res.status(400).json({
        error: message,
      });
    }

    throw error;
  }
}

export async function deletePortfolioRiskLimit(
  req: AuthenticatedRequest & {
    params: {
      id: string;
    };
  },
  res: Response,
) {
  if (!req.user) {
    return res.status(401).json({
      error: "Authentication required",
    });
  }

  try {
    const data =
      await clearPortfolioRiskLimit(
        req.params.id,
        req.user.firmId,
      );

    return res.status(200).json({
      data,
    });
  } catch (error) {
    if (
      errorMessage(error) ===
      "PORTFOLIO_NOT_FOUND"
    ) {
      return res.status(404).json({
        error: "Portfolio not found",
      });
    }

    throw error;
  }
}

export async function getRestrictedSecurities(
  req: AuthenticatedRequest,
  res: Response,
) {
  if (!req.user) {
    return res.status(401).json({
      error: "Authentication required",
    });
  }

  const data =
    await listRestrictedSecurities(
      req.user.firmId,
    );

  return res.status(200).json({
    data,
  });
}

export async function createRestrictedSecurity(
  req: AuthenticatedRequest,
  res: Response,
) {
  if (!req.user) {
    return res.status(401).json({
      error: "Authentication required",
    });
  }

  try {
    const data =
      await addRestrictedSecurity(
        req.user.firmId,
        req.body,
      );

    return res.status(201).json({
      data,
    });
  } catch (error) {
    if (
      errorMessage(error) ===
      "INVALID_RESTRICTED_SECURITY"
    ) {
      return res.status(400).json({
        error:
          "Symbol and exchange are required",
      });
    }

    throw error;
  }
}

export async function deleteRestrictedSecurity(
  req: AuthenticatedRequest & {
    params: {
      id: string;
    };
  },
  res: Response,
) {
  if (!req.user) {
    return res.status(401).json({
      error: "Authentication required",
    });
  }

  try {
    const data =
      await removeRestrictedSecurity(
        req.params.id,
        req.user.firmId,
      );

    return res.status(200).json({
      data,
    });
  } catch (error) {
    if (
      errorMessage(error) ===
      "RESTRICTED_SECURITY_NOT_FOUND"
    ) {
      return res.status(404).json({
        error:
          "Restricted security not found",
      });
    }

    throw error;
  }
}