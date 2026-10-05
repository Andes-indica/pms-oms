import {
  BrokerError,
} from "@pms-oms/broker";

import type {
  Response,
} from "express";

export function handleBrokerError(
  res: Response,
  error: unknown,
): Response | null {
  if (
    !(error instanceof Error)
  ) {
    return null;
  }

  if (
    error instanceof BrokerError
  ) {
    switch (error.code) {
      case "BROKER_INSUFFICIENT_FUNDS":
        return res.status(409).json({
          error:
            error.brokerMessage,
        });

      case "BROKER_ORDER_REJECTED":
        return res.status(400).json({
          error:
            error.brokerMessage,
        });

      case "BROKER_PERMISSION_DENIED":
        return res.status(403).json({
          error:
            error.brokerMessage,
        });

      case "BROKER_SESSION_INVALID":
        return res.status(401).json({
          error:
            "Broker session is invalid or expired. Reconnect the broker account.",
        });

      case "BROKER_ORDER_NOT_FOUND":
        return res.status(409).json({
          error:
            error.brokerMessage,
        });

      case "BROKER_OPERATION_UNCERTAIN":
        return res.status(502).json({
          error:
            "Broker operation result is uncertain. Retry or reconcile before continuing.",
        });
    }
  }

  switch (error.message) {
    case "BROKER_ACCOUNT_NOT_FOUND":
      return res.status(404).json({
        error:
          "Broker account not found",
      });

    case "UNSUPPORTED_BROKER":
      return res.status(400).json({
        error:
          "Broker is not supported",
      });

    case "BROKER_NOT_CONNECTED":
      return res.status(409).json({
        error:
          "Broker account is not connected",
      });

    case "BROKER_SESSION_EXPIRED":
      return res.status(409).json({
        error:
          "Broker session has expired. Reconnect the broker account.",
      });

    case "BROKER_UNSUPPORTED_EXCHANGE":
      return res.status(400).json({
        error:
          "This broker does not support the requested exchange",
      });

    case "BROKER_ORDER_NOT_FOUND":
      return res.status(409).json({
        error:
          "Broker order could not be found",
      });

    case "BROKER_ORDER_ID_MISSING":
      return res.status(502).json({
        error:
          "Broker accepted the request without returning an order ID",
      });

    case "BROKER_FILL_DETAILS_UNAVAILABLE":
      return res.status(502).json({
        error:
          "Broker reported fills but fill details are not yet available. Retry synchronization.",
      });

    case "BROKER_INVALID_ORDER_STATE":
      return res.status(502).json({
        error:
          "Broker returned an invalid order state",
      });

    default:
      return null;
  }
}