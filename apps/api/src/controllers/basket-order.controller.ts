import type { Response } from "express";

import { prisma } from "@pms-oms/db";

import { createBasketOrderService } from "../services/basket-order.service";
import { executeBasketOrderService } from "../services/basket-execution.service";
import { syncBasketOrderService } from "../services/basket-sync.service";
import {
  cancelBasketOrderService,
} from "../services/basket-cancellation.service";
import type { AuthenticatedRequest } from "../middleware/auth.middleware";
import {
  publishLiveUpdate,
} from "../services/live-update.service";
import {
  createBasketChildReplacementService,
  basketChildReplacementId,
  getBasketChildRecoveryAction,
  reconcileBasketChildOrderService,
  retryBasketChildOrderService,
} from "../services/basket-child-recovery.service";

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
        {
          ...req.body,
          firmId:
            req.user.firmId,
          actorUserId:
            req.user.userId,
          // Replacement lineage is an internal recovery field and must never
          // be accepted from the public basket creation payload.
          id:
            undefined,
          replacementForOrderId:
            undefined,
        },
      );

    publishLiveUpdate(
      req.user.firmId,
      {
        type:
          "basket.created",
        entityType:
          "BASKET_ORDER",
        entityId:
          basket.id,
      },
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
          allocations: {
            include: {
              portfolio: {
                include: {
                  client: true,
                },
              },
              brokerAccount:
                true,
            },
          },

          orders: {
            include: {
              executionJob: {
                select: { status: true, lastError: true },
              },
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

    const basketsById =
      new Map(
        baskets.map(
          (basket) => [
            basket.id,
            {
              id: basket.id,
              status: basket.status,
            },
          ],
        ),
      );

    return res.status(200).json({
      data: baskets.map(
        (basket) => ({
          ...basket,
          orders:
            basket.orders.map(
              (order) => ({
                ...order,
                replacementBasket:
                  basketsById.get(
                    basketChildReplacementId(
                      order.id,
                    ),
                  ) ?? null,
                recoveryAction:
                  getBasketChildRecoveryAction(
                    {
                      ...order,
                      replacementBasket:
                        basketsById.get(
                          basketChildReplacementId(
                            order.id,
                          ),
                        ) ?? null,
                    },
                  ),
              }),
            ),
        }),
      ),
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

function basketChildRecoveryError(
  res: Response,
  error: unknown,
) {
  if (!(error instanceof Error)) {
    return res.status(500).json({
      error:
        "Basket child recovery failed",
    });
  }

  if (
    error.message ===
    "BASKET_CHILD_ORDER_NOT_FOUND"
  ) {
    return res.status(404).json({
      error: error.message,
    });
  }

  if (
    [
      "BASKET_CHILD_RETRY_NOT_ALLOWED",
      "BASKET_CHILD_RECONCILE_NOT_ALLOWED",
      "BASKET_CHILD_REPLACEMENT_NOT_ALLOWED",
      "BROKER_RECOVERY_UNSUPPORTED",
      "BROKER_ORDER_RECOVERY_NOT_FOUND",
      "BROKER_ORDER_RECOVERY_CONFLICT",
    ].includes(
      error.message,
    )
  ) {
    return res.status(409).json({
      error: error.message,
    });
  }

  console.error(
    "Basket child recovery failed:",
    error,
  );

  return res.status(502).json({
    error: error.message,
  });
}

export async function retryBasketChildOrder(
  req: AuthenticatedRequest & {
    params: {
      id: string;
      orderId: string;
    };
  },
  res: Response,
) {
  try {
    if (!req.user) {
      return res.status(401).json({
        error:
          "Authentication required",
      });
    }

    const result =
      await retryBasketChildOrderService(
        req.params.id,
        req.params.orderId,
        req.user.firmId,
        req.user.userId,
      );

    publishLiveUpdate(
      req.user.firmId,
      {
        type:
          "order.execution_queued",
        entityType: "ORDER",
        entityId:
          req.params.orderId,
      },
    );

    return res.status(202).json({
      data: result,
    });
  } catch (error) {
    return basketChildRecoveryError(
      res,
      error,
    );
  }
}

export async function reconcileBasketChildOrder(
  req: AuthenticatedRequest & {
    params: {
      id: string;
      orderId: string;
    };
  },
  res: Response,
) {
  try {
    if (!req.user) {
      return res.status(401).json({
        error:
          "Authentication required",
      });
    }

    const result =
      await reconcileBasketChildOrderService(
        req.params.id,
        req.params.orderId,
        req.user.firmId,
        req.user.userId,
      );

    publishLiveUpdate(
      req.user.firmId,
      {
        type: "order.updated",
        entityType: "ORDER",
        entityId:
          req.params.orderId,
      },
    );

    publishLiveUpdate(
      req.user.firmId,
      {
        type:
          "basket.updated",
        entityType:
          "BASKET_ORDER",
        entityId:
          req.params.id,
      },
    );

    return res.status(200).json({
      data: result,
    });
  } catch (error) {
    return basketChildRecoveryError(
      res,
      error,
    );
  }
}

export async function createBasketChildReplacement(
  req: AuthenticatedRequest & {
    params: {
      id: string;
      orderId: string;
    };
  },
  res: Response,
) {
  try {
    if (!req.user) {
      return res.status(401).json({
        error:
          "Authentication required",
      });
    }

    const result =
      await createBasketChildReplacementService(
        req.params.id,
        req.params.orderId,
        req.user.firmId,
        req.user.userId,
      );

    publishLiveUpdate(
      req.user.firmId,
      {
        type:
          "basket.created",
        entityType:
          "BASKET_ORDER",
        entityId:
          result.replacementBasket.id,
      },
    );

    publishLiveUpdate(
      req.user.firmId,
      {
        type: "order.updated",
        entityType: "ORDER",
        entityId:
          req.params.orderId,
      },
    );

    return res
      .status(
        result.created
          ? 201
          : 200,
      )
      .json({
        data: result,
      });
  } catch (error) {
    return basketChildRecoveryError(
      res,
      error,
    );
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
        req.user.userId,
      );

    publishLiveUpdate(
      req.user.firmId,
      {
        type:
          "basket.updated",
        entityType:
          "BASKET_ORDER",
        entityId:
          req.params.id,
      },
    );

    return res.status(202).json({
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
        req.user.userId,
      );

    publishLiveUpdate(
      req.user.firmId,
      {
        type:
          "basket.updated",
        entityType:
          "BASKET_ORDER",
        entityId:
          req.params.id,
      },
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


export async function cancelBasketOrder(
  req: AuthenticatedRequest & {
    params: {
      id: string;
    };
  },
  res: Response,
) {
  try {
    if (!req.user) {
      return res.status(401).json({
        error:
          "Authentication required",
      });
    }

    const result =
      await cancelBasketOrderService(
        req.params.id,
        req.user.firmId,
        req.user.userId,
      );

    publishLiveUpdate(
      req.user.firmId,
      {
        type:
          "basket.updated",
        entityType:
          "BASKET_ORDER",
        entityId:
          req.params.id,
      },
    );

    for (
      const child of
      result.results
    ) {
      publishLiveUpdate(
        req.user.firmId,
        {
          type:
            "order.updated",
          entityType:
            "ORDER",
          entityId:
            child.orderId,
        },
      );
    }

    return res.status(200).json({
      data: result,
    });
  } catch (error) {
    if (
      error instanceof Error
    ) {
      if (
        error.message ===
        "BASKET_NOT_FOUND"
      ) {
        return res.status(404).json({
          error:
            "Basket order not found",
        });
      }

      if (
        error.message ===
        "BASKET_HAS_NO_ORDERS"
      ) {
        return res.status(409).json({
          error:
            "Basket contains no child orders",
        });
      }
    }

    console.error(
      "Basket cancellation failed:",
      error,
    );

    return res.status(500).json({
      error:
        "Basket cancellation failed",
    });
  }
}
