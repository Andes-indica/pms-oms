import {
  Router,
} from "express";

import {
  createBrokerAccount,
  getBrokerSnapshot,
  getBrokerReconciliation,
  repairBrokerReconciliation
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

router.get(
  "/broker-accounts/:id/snapshot",

  requireRole(
    "ADMIN",
    "PORTFOLIO_MANAGER",
    "OPERATIONS",
    "VIEWER",
  ),

  getBrokerSnapshot,
);
router.get(
  "/broker-accounts/:id/reconciliation",

  requireRole(
    "ADMIN",
    "PORTFOLIO_MANAGER",
    "OPERATIONS",
    "VIEWER",
  ),

  getBrokerReconciliation,
);

router.post(
  "/broker-accounts/:id/reconciliation/repair",

  requireRole(
    "ADMIN",
    "PORTFOLIO_MANAGER",
    "OPERATIONS",
  ),

  repairBrokerReconciliation,
);
export default router;