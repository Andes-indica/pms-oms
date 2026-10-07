import type {
  Response,
} from "express";

import type {
  AuthenticatedRequest,
} from "../middleware/auth.middleware";

import {
  archiveBrokerAccount,
  disconnectBrokerAccount,
  updateBrokerAccountLabel,
} from "../services/broker-account-management.service";

function message(
  error: unknown,
) {
  return error instanceof Error
    ? error.message
    : "UNKNOWN_ERROR";
}

export async function updateBrokerAccount(
  req: AuthenticatedRequest & {
    params: {
      id: string;
    };
  },
  res: Response,
) {
  if (!req.user) {
    return res.status(401).json({
      error:
        "Authentication required",
    });
  }

  const {
    accountLabel,
  } = req.body ?? {};

  if (
    accountLabel !==
      undefined &&
    accountLabel !==
      null &&
    typeof accountLabel !==
      "string"
  ) {
    return res.status(400).json({
      error:
        "accountLabel must be a string",
    });
  }

  try {
    const data =
      await updateBrokerAccountLabel(
        req.params.id,
        req.user.firmId,
        typeof accountLabel ===
          "string"
          ? accountLabel
          : null,
      );

    return res.status(200).json({
      data,
    });
  } catch (error) {
    if (
      message(error) ===
      "BROKER_ACCOUNT_NOT_FOUND"
    ) {
      return res.status(404).json({
        error:
          "Broker account not found",
      });
    }

    throw error;
  }
}

export async function disconnectBrokerAccountController(
  req: AuthenticatedRequest & {
    params: {
      id: string;
    };
  },
  res: Response,
) {
  if (!req.user) {
    return res.status(401).json({
      error:
        "Authentication required",
    });
  }

  try {
    const data =
      await disconnectBrokerAccount(
        req.params.id,
        req.user.firmId,
      );

    return res.status(200).json({
      data,
    });
  } catch (error) {
    if (
      message(error) ===
      "BROKER_ACCOUNT_NOT_FOUND"
    ) {
      return res.status(404).json({
        error:
          "Broker account not found",
      });
    }

    throw error;
  }
}

export async function archiveBrokerAccountController(
  req: AuthenticatedRequest & {
    params: {
      id: string;
    };
  },
  res: Response,
) {
  if (!req.user) {
    return res.status(401).json({
      error:
        "Authentication required",
    });
  }

  try {
    const data =
      await archiveBrokerAccount(
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
        "BROKER_ACCOUNT_HAS_HOLDINGS" ||
      errorMessage ===
        "BROKER_ACCOUNT_HAS_ACTIVE_ORDERS" ||
      errorMessage ===
        "BROKER_ACCOUNT_HAS_ALLOCATED_CASH"
    ) {
      return res.status(409).json({
        error:
          errorMessage,
      });
    }

    throw error;
  }
}
