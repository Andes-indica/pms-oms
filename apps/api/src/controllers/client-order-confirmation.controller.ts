import type {
  Request,
  Response,
} from "express";

import type {
  AuthenticatedRequest,
} from "../middleware/auth.middleware";

import {
  completeClientOrderConfirmation,
  declineClientOrderConfirmation,
  getClientOrderConfirmation,
  resolveClientOrderConfirmationAsNotPlaced,
  requestBasketClientConfirmations,
  requestClientOrderConfirmation,
  startClientOrderHandoff,
} from "../services/client-order-confirmation.service";

import {
  publishLiveUpdate,
} from "../services/live-update.service";
import {
  reconcilePublisherOrderService,
} from "../services/publisher-order-reconciliation.service";

function confirmationError(
  res: Response,
  error: unknown,
) {
  if (!(error instanceof Error)) {
    return res.status(500).json({
      error:
        "CLIENT_CONFIRMATION_FAILED",
    });
  }

  if (
    error.message ===
      "ORDER_NOT_FOUND" ||
    error.message ===
      "BASKET_NOT_FOUND"
  ) {
    return res.status(404).json({
      error: error.message,
    });
  }

  if (
    [
      "CLIENT_CONFIRMATION_LINK_INVALID",
      "CLIENT_CONFIRMATION_LINK_EXPIRED",
    ].includes(error.message)
  ) {
    return res.status(404).json({
      error: error.message,
    });
  }

  if (
    [
      "CLIENT_CONFIRMATION_NOT_ACTIVE",
      "CLIENT_CONFIRMATION_REQUIRED",
      "CLIENT_CONFIRMATION_HANDOFF_IN_PROGRESS",
      "CLIENT_CONFIRMATION_HANDOFF_NOT_STARTED",
      "CLIENT_CONFIRMATION_LINK_ACTIVE",
      "CLIENT_CONFIRMATION_RESOLUTION_NOT_ALLOWED",
      "ZERODHA_CALLBACK_STATUS_UNCERTAIN",
      "ORDER_NOT_CLIENT_CONFIRMED",
      "BASKET_NOT_CLIENT_CONFIRMED",
      "ORDER_ALREADY_CONFIRMED",
      "ORDER_NOT_PENDING",
      "ORDER_ALREADY_TERMINAL",
      "PUBLISHER_ORDER_NOT_CONFIRMED",
      "BROKER_ORDER_ID_MISMATCH",
      "BROKER_ORDER_ID_ALREADY_LINKED",
    ].includes(error.message)
  ) {
    return res.status(409).json({
      error: error.message,
    });
  }

  if (
    [
      "BROKER_NOT_CONFIGURED",
      "CLIENT_CONFIRMATION_BROKER_UNSUPPORTED",
      "INVALID_LIMIT_PRICE",
      "INVALID_QUANTITY",
      "INSUFFICIENT_HOLDINGS",
      "HOLDING_IN_DIFFERENT_PORTFOLIO",
      "INSUFFICIENT_CASH",
      "INSUFFICIENT_BROKER_CASH",
      "RESTRICTED_SECURITY",
      "MAX_ORDER_QUANTITY_EXCEEDED",
      "MAX_ORDER_VALUE_EXCEEDED",
      "MAX_POSITION_QUANTITY_EXCEEDED",
      "MAX_POSITION_VALUE_EXCEEDED",
      "INVALID_BROKER_ORDER_ID",
      "INVALID_RECONCILIATION_STATUS",
      "INVALID_FILL_QUANTITY",
      "INVALID_FILL_PRICE",
      "REJECTION_REASON_REQUIRED",
      "INVALID_RECONCILIATION_NOTES",
    ].includes(error.message)
  ) {
    return res.status(400).json({
      error: error.message,
    });
  }

  if (
    error.message.startsWith(
      "MARKET_DATA_",
    ) ||
    error.message ===
      "INVALID_MARKET_PRICE" ||
    error.message ===
      "ZERODHA_PUBLISHER_API_KEY_NOT_CONFIGURED"
  ) {
    return res.status(503).json({
      error: error.message,
    });
  }

  console.error(
    "Client confirmation failed:",
    error,
  );

  return res.status(502).json({
    error:
      "CLIENT_CONFIRMATION_FAILED",
  });
}

export async function requestOrderConfirmation(
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
    const result =
      await requestClientOrderConfirmation(
        req.params.id,
        req.user.firmId,
        req.user.userId,
        new Date(),
        req.body?.replaceActive ===
          true,
      );

    publishLiveUpdate(
      req.user.firmId,
      {
        type:
          "order.confirmation_requested",
        entityType: "ORDER",
        entityId: req.params.id,
      },
    );

    return res.status(201).json({
      data: result,
    });
  } catch (error) {
    return confirmationError(
      res,
      error,
    );
  }
}

export async function resolveOrderConfirmationAsNotPlaced(
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
    const result =
      await resolveClientOrderConfirmationAsNotPlaced(
        req.params.id,
        req.user.firmId,
        req.user.userId,
      );

    publishLiveUpdate(req.user.firmId, {
      type:
        "order.confirmation_resolved_not_placed",
      entityType: "ORDER",
      entityId: req.params.id,
    });

    return res.status(200).json({
      data: result,
    });
  } catch (error) {
    return confirmationError(res, error);
  }
}

export async function requestBasketConfirmations(
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
    const result =
      await requestBasketClientConfirmations(
        req.params.id,
        req.user.firmId,
        req.user.userId,
        req.body?.replaceActive ===
          true,
      );

    publishLiveUpdate(
      req.user.firmId,
      {
        type:
          "basket.confirmations_requested",
        entityType:
          "BASKET_ORDER",
        entityId: req.params.id,
      },
    );

    return res.status(201).json({
      data: result,
    });
  } catch (error) {
    return confirmationError(
      res,
      error,
    );
  }
}

export async function reconcilePublisherOrder(
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
    const result =
      await reconcilePublisherOrderService({
        orderId: req.params.id,
        firmId: req.user.firmId,
        actorUserId:
          req.user.userId,
        brokerOrderId:
          req.body?.brokerOrderId,
        status: req.body?.status,
        filledQuantity:
          req.body?.filledQuantity,
        averageFillPrice:
          req.body?.averageFillPrice,
        rejectionReason:
          req.body?.rejectionReason,
        notes: req.body?.notes,
      });

    publishLiveUpdate(
      req.user.firmId,
      {
        type:
          "order.publisher_reconciled",
        entityType: "ORDER",
        entityId: req.params.id,
      },
    );

    return res.status(200).json({
      data: result,
    });
  } catch (error) {
    return confirmationError(
      res,
      error,
    );
  }
}

type TokenBody = {
  token?: unknown;
};

export async function lookupClientConfirmation(
  req: Request<{}, {}, TokenBody>,
  res: Response,
) {
  try {
    const confirmation =
      await getClientOrderConfirmation(
        req.body?.token,
      );

    return res.status(200).json({
      data: confirmation,
    });
  } catch (error) {
    return confirmationError(
      res,
      error,
    );
  }
}

export async function startClientConfirmationHandoff(
  req: Request<{}, {}, TokenBody>,
  res: Response,
) {
  try {
    const handoff =
      await startClientOrderHandoff(
        req.body?.token,
      );

    return res.status(200).json({
      data: handoff,
    });
  } catch (error) {
    return confirmationError(
      res,
      error,
    );
  }
}

type CompletionBody =
  TokenBody & {
    status?: unknown;
    requestToken?: unknown;
  };

export async function completeClientConfirmation(
  req: Request<
    {},
    {},
    CompletionBody
  >,
  res: Response,
) {
  try {
    const result =
      await completeClientOrderConfirmation({
        token: req.body?.token,
        status: req.body?.status,
        requestToken:
          req.body?.requestToken,
      });

    publishLiveUpdate(
      result.firmId,
      {
        type:
          "order.confirmation_completed",
        entityType: "ORDER",
        entityId: result.orderId,
      },
    );

    const {
      firmId: _firmId,
      ...publicResult
    } = result;

    return res.status(200).json({
      data: publicResult,
    });
  } catch (error) {
    return confirmationError(
      res,
      error,
    );
  }
}

export async function declineClientConfirmation(
  req: Request<{}, {}, TokenBody>,
  res: Response,
) {
  try {
    const result =
      await declineClientOrderConfirmation(
        req.body?.token,
      );

    publishLiveUpdate(
      result.firmId,
      {
        type:
          "order.confirmation_declined",
        entityType: "ORDER",
        entityId: result.orderId,
      },
    );

    const {
      firmId: _firmId,
      ...publicResult
    } = result;

    return res.status(200).json({
      data: publicResult,
    });
  } catch (error) {
    return confirmationError(
      res,
      error,
    );
  }
}
