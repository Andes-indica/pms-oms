import type { Request, Response } from "express";
import { createOrderService } from "../services/order.service";
import { prisma } from "@pms-oms/db";
import { executeOrderService } from "../services/order-execution.service";

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

export async function createOrder(
  req: Request<{}, {}, CreateOrderBody>,
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
    } = req.body;

    if (!portfolioId || !brokerAccountId || !symbol || !exchange) {
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

    if (orderType === "LIMIT" && (!limitPrice || limitPrice <= 0)) {
      return res.status(400).json({
        error: "Valid limitPrice is required for LIMIT orders",
      });
    }

    const order = await createOrderService({
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
  _req: Request,
  res: Response,
) {
  try {
    const orders = await prisma.order.findMany({
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
  req: Request<{ id: string }>,
  res: Response,
) {
  try {
    const { id } = req.params;

    const order = await executeOrderService(id);

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

      if (error.message === "ORDER_NOT_PENDING") {
        return res.status(409).json({
          error: "Only pending orders can be executed",
        });
      }
    }

    console.error("Failed to execute order:", error);

    return res.status(500).json({
      error: "Failed to execute order",
    });
  }
}