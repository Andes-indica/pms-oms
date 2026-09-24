import {
  Router,
} from "express";

import {
  createBrokerAccount,
} from "../controllers/broker-account.controller";

import {
  requireAuth,
} from "../middleware/auth.middleware";

import {
  requireRole,
} from "../middleware/role.middleware";

const router =
  Router();

router.use(
  requireAuth,
);

router.post(
  "/clients/:clientId/broker-accounts",

  requireRole(
    "ADMIN",
    "PORTFOLIO_MANAGER",
  ),

  createBrokerAccount,
);

export default router;