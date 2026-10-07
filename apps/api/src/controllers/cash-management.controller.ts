import type {
  Response,
} from "express";

import type {
  AuthenticatedRequest,
} from "../middleware/auth.middleware";

import {
  adjustPortfolioCash,
  listPortfolioCashTransactions,
} from "../services/cash-management.service";

function message(
  error: unknown,
) {
  return error instanceof Error
    ? error.message
    : "UNKNOWN_ERROR";
}

export async function getPortfolioCashTransactions(
  req: AuthenticatedRequest & {
    params: { id: string };
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
      await listPortfolioCashTransactions(
        req.params.id,
        req.user.firmId,
      );

    return res.status(200).json({
      data,
    });
  } catch (error) {
    if (
      message(error) ===
      "PORTFOLIO_NOT_FOUND"
    ) {
      return res.status(404).json({
        error: "Portfolio not found",
      });
    }

    throw error;
  }
}

export async function createPortfolioCashTransaction(
  req: AuthenticatedRequest & {
    params: { id: string };
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
      await adjustPortfolioCash(
        req.params.id,
        req.user.firmId,
        req.user.userId,
        req.body,
      );

    return res.status(201).json({
      data,
    });
  } catch (error) {
    const errorMessage =
      message(error);

    if (
      errorMessage ===
      "PORTFOLIO_NOT_FOUND"
    ) {
      return res.status(404).json({
        error: "Portfolio not found",
      });
    }

    if (
      errorMessage ===
        "INVALID_CASH_TRANSACTION_TYPE" ||
      errorMessage ===
        "INVALID_CASH_AMOUNT"
    ) {
      return res.status(400).json({
        error: errorMessage,
      });
    }

    if (
      errorMessage ===
      "INSUFFICIENT_CASH"
    ) {
      return res.status(409).json({
        error:
          "Cash transaction would make the portfolio balance negative",
      });
    }

    if (
      errorMessage ===
      "CASH_BELOW_BROKER_ALLOCATIONS"
    ) {
      return res.status(409).json({
        error:
          "Reduce broker cash allocations before withdrawing this cash",
      });
    }

    throw error;
  }
}