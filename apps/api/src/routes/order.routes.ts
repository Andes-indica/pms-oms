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
  requireAuth,
} from "../middleware/auth.middleware";

import {
  requireRole,
} from "../middleware/role.middleware";

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
  getOrders,
);

//
// Only managers/admins can create orders.
//
router.post(
  "/",
  requireRole(
    "ADMIN",
    "PORTFOLIO_MANAGER",
  ),
  createOrder,
);

//
// Only managers/admins can send orders
// to the broker.
//
router.post(
  "/:id/execute",
  requireRole(
    "ADMIN",
    "PORTFOLIO_MANAGER",
  ),
  executeOrder,
);

//
// Sync is normally a system/operations activity.
//
router.post(
  "/:id/sync",
  requireRole(
    "ADMIN",
    "PORTFOLIO_MANAGER",
    "OPERATIONS",
  ),
  syncOrder,
);

router.patch(
  "/:id",
  requireAuth,
  requireRole(
    "ADMIN",
    "PORTFOLIO_MANAGER",
  ),
  modifyOrder,
);

//
// Managers and operations can cancel.
//
router.post(
  "/:id/cancel",
  requireRole(
    "ADMIN",
    "PORTFOLIO_MANAGER",
    "OPERATIONS",
  ),
  cancelOrder,
);

export default router;