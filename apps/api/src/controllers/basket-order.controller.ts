import type { Response } from "express";

import { prisma } from "@pms-oms/db";

import { createBasketOrderService } from "../services/basket-order.service";
import { executeBasketOrderService } from "../services/basket-execution.service";
import { syncBasketOrderService } from "../services/basket-sync.service";
import type { AuthenticatedRequest } from "../middleware/auth.middleware";

type BasketOrderBody = {
  name?: string;

  symbol: string;
  exchange: string;

  side: "BUY" | "SELL";

  orderType:
    | "MARKET"
    | "LIMIT";

  limitPrice?: number;

  totalQuantity: number;

  allocationMethod:
    | "FIXED_QUANTITY"
    | "EQUAL_QUANTITY"
    | "PERCENTAGE";

  targets: Array<{
    portfolioId: string;
    brokerAccountId: string;
    quantity?: number;
    percentage?: number;
  }>;
};

export async function createBasketOrder(
  req: AuthenticatedRequest & { body: BasketOrderBody },
  res: Response,
) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const basket =
      await createBasketOrderService(
        { ...req.body, firmId: req.user.firmId },
      );

    return res.status(201).json({
      data: basket,
    });
  } catch (error) {
    console.error(
      "Basket creation failed:",
      error,
    );

    if (error instanceof Error) {
      return res.status(400).json({
        error: error.message,
      });
    }

    return res.status(500).json({
      error:
        "Basket order creation failed",
    });
  }
}

export async function getBasketOrders(
  req: AuthenticatedRequest,
  res: Response,
) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const baskets =
      await prisma.basketOrder.findMany({
        where: {
          firmId: req.user.firmId,
        },
        include: {
          orders: {
            include: {
              portfolio: {
                include: {
                  client: true,
                },
              },
              brokerAccount:true,
            },
          },
        },

        orderBy: {
          createdAt: "desc",
        },
      });

    return res.status(200).json({
      data: baskets,
    });
  } catch (error) {
    console.error(
      "Failed to fetch baskets:",
      error,
    );

    return res.status(500).json({
      error:
        "Failed to fetch basket orders",
    });
  }
}

export async function executeBasketOrder(
  req: AuthenticatedRequest & { params: { id: string } },
  res: Response,
) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const result =
      await executeBasketOrderService(
        req.params.id,
        req.user.firmId,
      );

    return res.status(200).json({
      data: result,
    });
  } catch (error) {
    if (error instanceof Error) {
      switch (error.message) {
        case "BASKET_NOT_FOUND":
          return res.status(404).json({
            error: "Basket order not found",
          });

        case "BASKET_NOT_PENDING":
          return res.status(409).json({
            error:
              "Only pending baskets can be executed",
          });

        case "BASKET_HAS_NO_ORDERS":
          return res.status(409).json({
            error:
              "Basket contains no child orders",
          });
      }
    }

    console.error(
      "Basket execution failed:",
      error,
    );

    return res.status(500).json({
      error: "Basket execution failed",
    });
  }
}
export async function syncBasketOrder(
  req: AuthenticatedRequest & { params: { id: string } },
  res: Response,
) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const result =
      await syncBasketOrderService(
        req.params.id,
        req.user.firmId,
      );

    return res.status(200).json({
      data: result,
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "BASKET_NOT_FOUND") {
        return res.status(404).json({
          error: "Basket order not found",
        });
      }

      if (error.message === "BASKET_HAS_NO_ORDERS") {
        return res.status(409).json({
          error: "Basket contains no child orders",
        });
      }
    }

    console.error(
      "Basket sync failed:",
      error,
    );

    return res.status(500).json({
      error: "Basket sync failed",
    });
  }
}
