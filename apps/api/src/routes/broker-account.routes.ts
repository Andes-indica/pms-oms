import {
  Router,
} from "express";

import {
  createBrokerAccount,
  getBrokerSnapshot,
  getBrokerReconciliation,
  repairBrokerReconciliation,
  importBrokerAccountHoldings
} from "../controllers/broker-account.controller";

import {
  deleteBrokerCashAllocation,
  getBrokerCashStatus,
  updateBrokerCashAllocation,
} from "../controllers/broker-cash.controller";

import {
  archiveBrokerAccountController,
  disconnectBrokerAccountController,
  updateBrokerAccount,
} from "../controllers/broker-account-management.controller";

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

router.patch(
  "/broker-accounts/:id",

  requireRole(
    "ADMIN",
    "PORTFOLIO_MANAGER",
  ),

  updateBrokerAccount,
);

router.post(
  "/broker-accounts/:id/disconnect",

  requireRole(
    "ADMIN",
    "PORTFOLIO_MANAGER",
  ),

  disconnectBrokerAccountController,
);

router.delete(
  "/broker-accounts/:id",

  requireRole(
    "ADMIN",
  ),

  archiveBrokerAccountController,
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
  "/broker-accounts/:id/cash-reconciliation",

  requireRole(
    "ADMIN",
    "PORTFOLIO_MANAGER",
    "OPERATIONS",
    "VIEWER",
  ),

  getBrokerCashStatus,
);

router.put(
  "/broker-accounts/:id/cash-allocations",

  requireRole(
    "ADMIN",
    "PORTFOLIO_MANAGER",
    "OPERATIONS",
  ),

  updateBrokerCashAllocation,
);

router.delete(
  "/broker-accounts/:id/cash-allocations/:portfolioId",

  requireRole(
    "ADMIN",
    "PORTFOLIO_MANAGER",
    "OPERATIONS",
  ),

  deleteBrokerCashAllocation,
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
router.post(
    "/broker-accounts/:id/holdings/import",

    requireRole(
        "ADMIN",
        "PORTFOLIO_MANAGER",
        "OPERATIONS",
    ),

    importBrokerAccountHoldings,
);
export default router;