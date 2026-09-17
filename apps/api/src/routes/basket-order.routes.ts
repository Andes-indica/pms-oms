import { Router } from "express";

import {
  createBasketOrder,
  executeBasketOrder,
  getBasketOrders,
  syncBasketOrder,
} from "../controllers/basket-order.controller";

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
  "/:id/sync",
  requireRole(
    "ADMIN",
    "PORTFOLIO_MANAGER",
    "OPERATIONS",
  ),
  syncBasketOrder,
);

export default router;