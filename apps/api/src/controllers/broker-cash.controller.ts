import type {
  Response,
} from "express";

import type {
  AuthenticatedRequest,
} from "../middleware/auth.middleware";

import {
  getBrokerCashReconciliation,
  removeBrokerCashAllocation,
  setBrokerCashAllocation,
} from "../services/broker-cash-reconciliation.service";

function message(
  error: unknown,
) {
  return error instanceof Error
    ? error.message
    : "UNKNOWN_ERROR";
}

export async function getBrokerCashStatus(
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
      await getBrokerCashReconciliation(
        req.params.id,
        req.user.firmId,
      );

    return res.status(200).json({
      data,
    });
  } catch (error) {
    const errorMessage =
      message(error);

    if (
      errorMessage ===
      "BROKER_ACCOUNT_NOT_FOUND"
    ) {
      return res.status(404).json({
        error:
          "Broker account not found",
      });
    }

    if (
      errorMessage ===
      "BROKER_FUNDS_UNSUPPORTED"
    ) {
      return res.status(409).json({
        error:
          "Broker does not expose funds",
      });
    }

    throw error;
  }
}

export async function updateBrokerCashAllocation(
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

  const {
    portfolioId,
    amount,
  } = req.body ?? {};

  if (
    typeof portfolioId !==
      "string" ||
    typeof amount !==
      "number"
  ) {
    return res.status(400).json({
      error:
        "portfolioId and numeric amount are required",
    });
  }

  try {
    const data =
      await setBrokerCashAllocation(
        req.params.id,
        portfolioId,
        req.user.firmId,
        amount,
      );

    return res.status(200).json({
      data,
    });
  } catch (error) {
    const errorMessage =
      message(error);

    if (
      errorMessage ===
      "BROKER_ACCOUNT_NOT_FOUND"
    ) {
      return res.status(404).json({
        error:
          "Broker account not found",
      });
    }

    if (
      errorMessage ===
        "INVALID_BROKER_CASH_ALLOCATION" ||
      errorMessage ===
        "BROKER_CASH_PORTFOLIO_INVALID"
    ) {
      return res.status(400).json({
        error: errorMessage,
      });
    }

    if (
      errorMessage ===
      "BROKER_CASH_ALLOCATION_EXCEEDS_PORTFOLIO_CASH"
    ) {
      return res.status(409).json({
        error:
          "Broker cash allocations exceed portfolio cash",
      });
    }

    throw error;
  }
}

export async function deleteBrokerCashAllocation(
  req: AuthenticatedRequest & {
    params: {
      id: string;
      portfolioId: string;
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
      await removeBrokerCashAllocation(
        req.params.id,
        req.params.portfolioId,
        req.user.firmId,
      );

    return res.status(200).json({
      data,
    });
  } catch (error) {
    if (
      message(error) ===
      "BROKER_CASH_ALLOCATION_NOT_FOUND"
    ) {
      return res.status(404).json({
        error:
          "Broker cash allocation not found",
      });
    }

    throw error;
  }
}