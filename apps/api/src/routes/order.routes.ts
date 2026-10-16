import { Router } from "express";

import {
  createOrder,
  getOrders,
  executeOrder,
  syncOrder,
  cancelOrder,
  modifyOrder
} from "../controllers/order.controller";

import {
  requestOrderConfirmation,
  reconcilePublisherOrder,
  resolveOrderConfirmationAsNotPlaced,
} from "../controllers/client-order-confirmation.controller";

import {
  requireAuth,
} from "../middleware/auth.middleware";

import {
  requirePermission,
} from "../security/permissions";

const router = Router();

//
// Every route below requires login.
//
router.use(requireAuth);

//
// Everyone who is authenticated can view orders.
//
router.get(
  "/",
  requirePermission(
    "VIEW_ORDERS",
  ),
  getOrders,
);

//
// Only managers/admins can create orders.
//
router.post(
  "/",
  requirePermission(
    "CREATE_ORDERS",
  ),
  createOrder,
);

//
// Only managers/admins can send orders
// to the broker.
//
router.post(
  "/:id/execute",
  requirePermission(
    "EXECUTE_ORDERS",
  ),
  executeOrder,
);

router.post(
  "/:id/client-confirmation",
  requirePermission(
    "EXECUTE_ORDERS",
  ),
  requestOrderConfirmation,
);

router.post(
  "/:id/client-confirmation/resolve-not-placed",
  requirePermission(
    "OPERATE_ORDERS",
  ),
  resolveOrderConfirmationAsNotPlaced,
);

router.post(
  "/:id/client-confirmation/reconcile",
  requirePermission(
    "OPERATE_ORDERS",
  ),
  reconcilePublisherOrder,
);

//
// Sync is normally a system/operations activity.
//
router.post(
  "/:id/sync",
  requirePermission(
    "OPERATE_ORDERS",
  ),
  syncOrder,
);

router.patch(
  "/:id",
  requirePermission(
    "EXECUTE_ORDERS",
  ),
  modifyOrder,
);

//
// Managers and operations can cancel.
//
router.post(
  "/:id/cancel",
  requirePermission(
    "OPERATE_ORDERS",
  ),
  cancelOrder,
);

export default router;
