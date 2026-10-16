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
  requirePermission,
} from "../security/permissions";

const router = Router();

router.use(requireAuth);

router.get(
  "/",
  requirePermission(
    "VIEW_ORDERS",
  ),
  getBasketOrders,
);

router.post(
  "/",
  requirePermission(
    "CREATE_ORDERS",
  ),
  createBasketOrder,
);

router.post(
  "/:id/execute",
  requirePermission(
    "EXECUTE_ORDERS",
  ),
  executeBasketOrder,
);

router.post(
  "/:id/client-confirmations",
  requirePermission(
    "EXECUTE_ORDERS",
  ),
  requestBasketConfirmations,
);

router.post(
  "/:id/orders/:orderId/retry",
  requirePermission(
    "EXECUTE_ORDERS",
  ),
  retryBasketChildOrder,
);

router.post(
  "/:id/orders/:orderId/reconcile",
  requirePermission(
    "OPERATE_ORDERS",
  ),
  reconcileBasketChildOrder,
);

router.post(
  "/:id/orders/:orderId/replacement",
  requirePermission(
    "EXECUTE_ORDERS",
  ),
  createBasketChildReplacement,
);

router.post(
  "/:id/cancel",
  requirePermission(
    "OPERATE_ORDERS",
  ),
  cancelBasketOrder,
);

router.post(
  "/:id/sync",
  requirePermission(
    "OPERATE_ORDERS",
  ),
  syncBasketOrder,
);

export default router;
