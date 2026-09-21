import type { Request, Response } from "express";
import { createOrderService } from "../services/order.service";
import { prisma } from "@pms-oms/db";
import { executeOrderService } from "../services/order-execution.service";
import { syncOrderService } from "@/services/order-sync.service";
import { cancelOrderService } from "../services/order-cancellation.service";
import type { AuthenticatedRequest as BaseAuthenticatedRequest } from "../middleware/auth.middleware";
import {
  modifyOrderService,
} from "../services/order-modification.service";

type CreateOrderBody = {
  portfolioId: string;
  brokerAccountId: string;
  symbol: string;
  exchange: string;
  side: "BUY" | "SELL";
  orderType: "MARKET" | "LIMIT";
  quantity: number;
  limitPrice?: number;
};

type AuthenticatedRequest = BaseAuthenticatedRequest & Request<{}, {}, CreateOrderBody>;

export async function createOrder(
  req: AuthenticatedRequest,
  res: Response,
) {
  try {
    const {
      portfolioId,
      brokerAccountId,
      symbol,
      exchange,
      side,
      orderType,
      quantity,
      limitPrice,
    } = req.body ?? ({} as CreateOrderBody);

    if (
      typeof portfolioId !== "string" || !portfolioId.trim() ||
      typeof brokerAccountId !== "string" || !brokerAccountId.trim() ||
      typeof symbol !== "string" || !symbol.trim() ||
      typeof exchange !== "string" || !exchange.trim()
    ) {
      return res.status(400).json({
        error: "Missing required fields",
      });
    }

    if (!["BUY", "SELL"].includes(side)) {
      return res.status(400).json({
        error: "Invalid order side",
      });
    }

    if (!["MARKET", "LIMIT"].includes(orderType)) {
      return res.status(400).json({
        error: "Invalid order type",
      });
    }

    if (!Number.isInteger(quantity) || quantity <= 0) {
      return res.status(400).json({
        error: "Quantity must be a positive integer",
      });
    }

    if (
      orderType === "LIMIT" &&
      (typeof limitPrice !== "number" ||
        !Number.isFinite(limitPrice) ||
        limitPrice <= 0)
    ) {
      return res.status(400).json({
        error: "Valid limitPrice is required for LIMIT orders",
      });
    }
    if (!req.user) {
  return res.status(401).json({
    error: "Authentication required",
  });
}

    const order = await createOrderService({
      firmId:req.user.firmId,
      portfolioId,
      brokerAccountId,
      symbol,
      exchange,
      side,
      orderType,
      quantity,
      limitPrice,
    });

    return res.status(201).json({
      data: order,
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "PORTFOLIO_NOT_FOUND") {
        return res.status(404).json({
          error: "Portfolio not found",
        });
      }

      if (error.message === "BROKER_ACCOUNT_NOT_FOUND") {
        return res.status(404).json({
          error: "Broker account not found",
        });
      }

      if (error.message === "BROKER_ACCOUNT_MISMATCH") {
        return res.status(400).json({
          error: "Portfolio and broker account belong to different clients",
        });
      }
    }

    console.error("Failed to create order:", error);

    return res.status(500).json({
      error: "Failed to create order",
    });
  }
}

export async function getOrders(
  _req: AuthenticatedRequest,
  res: Response,
) {
  try {
    if (!_req.user) {
      return res.status(401).json({
        error: "Authentication required",
      });
    }

    const orders = await prisma.order.findMany({
      where: {
        portfolio: {
          client: {
            firmId: _req.user.firmId,
          },
        },
      },
      include: {
        portfolio: {
          include: {
            client: true,
          },
        },
        brokerAccount: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      data: orders,
    });
  } catch (error) {
    console.error("Failed to fetch orders:", error);

    return res.status(500).json({
      error: "Failed to fetch orders",
    });
  }
}
export async function executeOrder(
  req: BaseAuthenticatedRequest & { params: { id: string } },
  res: Response,
) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const order = await executeOrderService(req.params.id, req.user.firmId);

    return res.status(200).json({
      data: order,
    });
  } catch (error) {
    if (error instanceof Error) {
      switch (error.message) {
        case "ORDER_NOT_FOUND":
          return res.status(404).json({
            error: "Order not found",
          });

        case "ORDER_NOT_PENDING":
          return res.status(409).json({
            error: "Order is not pending",
          });

        case "BROKER_ACCOUNT_MISMATCH":
          return res.status(400).json({
            error: "Broker account does not belong to portfolio client",
          });

        case "INVALID_QUANTITY":
          return res.status(400).json({
            error: "Invalid order quantity",
          });

        case "INSUFFICIENT_HOLDINGS":
          return res.status(400).json({
            error: "Insufficient holdings for sell order",
          });
        case "MAX_ORDER_QUANTITY_EXCEEDED":
          return res.status(400).json({
            error: "Maximum order quantity exceeded",
          });

        case "MAX_ORDER_VALUE_EXCEEDED":
          return res.status(400).json({
            error: "Maximum order value exceeded",
          });

        case "MAX_POSITION_QUANTITY_EXCEEDED":
          return res.status(400).json({
            error: "Maximum position quantity exceeded",
          });

        case "MAX_POSITION_VALUE_EXCEEDED":
          return res.status(400).json({
            error: "Maximum position value exceeded",
          });
        case "INSUFFICIENT_CASH":
          return res.status(400).json({
            error:"Insufficient cash Balance",
          });
        case "RESTRICTED_SECURITY":
          return res.status(400).json({
            error: "security is restricted",
          });
      }
    }

    console.error("Order execution failed:", error);

    return res.status(500).json({
      error: "Order execution failed",
    });
  }
}
export async function syncOrder(
  req: BaseAuthenticatedRequest & { params: { id: string } },
  res: Response,
) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const order = await syncOrderService(req.params.id, req.user.firmId);

    return res.status(200).json({
      data: order,
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "ORDER_NOT_FOUND") {
        return res.status(404).json({
          error: "Order not found",
        });
      }

      if (error.message === "ORDER_NOT_SUBMITTED") {
        return res.status(409).json({
          error: "Order has not been submitted to a broker",
        });
      }

      if (error.message === "INSUFFICIENT_HOLDINGS") {
        return res.status(409).json({
          error: "Insufficient holdings",
        });
      }
    }

    console.error("Order sync failed:", error);

    return res.status(500).json({
      error: "Order sync failed",
    });
  }
}
export async function cancelOrder(
  req: BaseAuthenticatedRequest & { params: { id: string } },
  res: Response,
) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const order = await cancelOrderService(
      req.params.id,
      req.user.firmId,
    );

    return res.status(200).json({
      data: order,
    });
  } catch (error) {
    if (error instanceof Error) {
      switch (error.message) {
        case "ORDER_NOT_FOUND":
          return res.status(404).json({
            error: "Order not found",
          });

        case "ORDER_ALREADY_FILLED":
          return res.status(409).json({
            error: "Filled orders cannot be cancelled",
          });

        case "ORDER_ALREADY_CANCELLED":
          return res.status(409).json({
            error: "Order is already cancelled",
          });

        case "ORDER_ALREADY_REJECTED":
          return res.status(409).json({
            error: "Rejected orders cannot be cancelled",
          });

        case "ORDER_SUBMISSION_IN_PROGRESS":
          return res.status(409).json({
            error: "Order submission is still in progress",
          });
      }
    }

    console.error("Order cancellation failed:", error);

    return res.status(500).json({
      error: "Order cancellation failed",
    });
  }
}
export async function modifyOrder(
  req: AuthenticatedRequest,
  res: Response,
) {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({
          error:
            "Authentication required",
        });
    }

    const orderId = req.params.id;
    if (typeof orderId !== "string") {
      return res.status(400).json({
        error: "Invalid order ID",
      });
    }

    const order =
      await modifyOrderService(
        orderId,
        req.user.firmId,
        req.body,
      );

    return res.json({
      data: order,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "UNKNOWN_ERROR";

    switch (message) {
      case "ORDER_NOT_FOUND":
        return res
          .status(404)
          .json({
            error:
              "Order not found",
          });

      case "ORDER_NOT_MODIFIABLE":
      case "PARTIALLY_FILLED_ORDER_NOT_MODIFIABLE":
        return res
          .status(409)
          .json({
            error: message,
          });

      case "INVALID_QUANTITY":
      case "INVALID_LIMIT_PRICE":
        return res
          .status(400)
          .json({
            error: message,
          });

      case "INSUFFICIENT_CASH":
      case "INSUFFICIENT_HOLDINGS":
        return res
          .status(409)
          .json({
            error: message,
          });

      case "BROKER_ORDER_NOT_FOUND":
        return res
          .status(409)
          .json({
            error:
              "Broker order not found",
          });

      default:
        console.error(
          "Order modification failed:",
          error,
        );

        return res
          .status(500)
          .json({
            error:
              "Order modification failed",
          });
    }
  }
}