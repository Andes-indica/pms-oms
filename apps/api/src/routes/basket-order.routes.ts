import { Router } from "express";

import {
  cancelBasketOrder,
  createBasketChildReplacement,
  createBasketOrder,
  executeBasketOrder,
  getBasketOrders,
  reconcileBasketChildOrder,
  retryBasketChildOrder,
  syncBasketOrder,
} from "../controllers/basket-order.controller";

import {
  requestBasketConfirmations,
} from "../controllers/client-order-confirmation.controller";

import {
  requireAuth,
} from "../middleware/auth.middleware";

import {
  requireRole,
} from "../middleware/role.middleware";

const router = Router();

router.use(requireAuth);

router.get(
  "/",
  getBasketOrders,
);

router.post(
  "/",
  requireRole(
    "ADMIN",
    "PORTFOLIO_MANAGER",
  ),
  createBasketOrder,
);

router.post(
  "/:id/execute",
  requireRole(
    "ADMIN",
    "PORTFOLIO_MANAGER",
  ),
  executeBasketOrder,
);

router.post(
  "/:id/client-confirmations",
  requireRole(
    "ADMIN",
    "PORTFOLIO_MANAGER",
  ),
  requestBasketConfirmations,
);

router.post(
  "/:id/orders/:orderId/retry",
  requireRole(
    "ADMIN",
    "PORTFOLIO_MANAGER",
  ),
  retryBasketChildOrder,
);

router.post(
  "/:id/orders/:orderId/reconcile",
  requireRole(
    "ADMIN",
    "PORTFOLIO_MANAGER",
    "OPERATIONS",
  ),
  reconcileBasketChildOrder,
);

router.post(
  "/:id/orders/:orderId/replacement",
  requireRole(
    "ADMIN",
    "PORTFOLIO_MANAGER",
  ),
  createBasketChildReplacement,
);

router.post(
  "/:id/cancel",
  requireRole(
    "ADMIN",
    "PORTFOLIO_MANAGER",
    "OPERATIONS",
  ),
  cancelBasketOrder,
);

router.post(
  "/:id/sync",
  requireRole(
    "ADMIN",
    "PORTFOLIO_MANAGER",
    "OPERATIONS",
  ),
  syncBasketOrder,
);

export default router;
