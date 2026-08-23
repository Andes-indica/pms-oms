import type { Request, Response } from "express";
import { prisma } from "@pms-oms/db";

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

    if (!side || !["BUY", "SELL"].includes(side)) {
      return res.status(400).json({
        error: "Invalid order side",
      });
    }

    if (!orderType || !["MARKET", "LIMIT"].includes(orderType)) {
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

    const portfolio = await prisma.portfolio.findUnique({
      where: {
        id: portfolioId,
      },
    });

    if (!portfolio) {
      return res.status(404).json({
        error: "Portfolio not found",
      });
    }

    const brokerAccount = await prisma.brokerAccount.findUnique({
      where: {
        id: brokerAccountId,
      },
    });

    if (!brokerAccount) {
      return res.status(404).json({
        error: "Broker account not found",
      });
    }

    if (portfolio.clientId !== brokerAccount.clientId) {
      return res.status(400).json({
        error: "Portfolio and broker account belong to different clients",
      });
    }

    const order = await prisma.order.create({
      data: {
        portfolioId,
        brokerAccountId,
        symbol: symbol.toUpperCase(),
        exchange: exchange.toUpperCase(),
        side,
        orderType,
        quantity,
        limitPrice: orderType === "LIMIT" ? limitPrice : null,
        status: "PENDING",
      },
    });

    return res.status(201).json({
      data: order,
    });
  } catch (error) {
    console.error("Failed to create order:", error);

    return res.status(500).json({
      error: "Failed to create order",
    });
  }
}