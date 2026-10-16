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
  requirePermission,
} from "../security/permissions";

const router =
  Router();

router.use(
  requireAuth,
);

router.post(
  "/clients/:clientId/broker-accounts",

  requirePermission(
    "MANAGE_BROKERS",
  ),

  createBrokerAccount,
);

router.patch(
  "/broker-accounts/:id",

  requirePermission(
    "MANAGE_BROKERS",
  ),

  updateBrokerAccount,
);

router.post(
  "/broker-accounts/:id/disconnect",

  requirePermission(
    "MANAGE_BROKERS",
  ),

  disconnectBrokerAccountController,
);

router.delete(
  "/broker-accounts/:id",

  requirePermission(
    "ARCHIVE_BROKERS",
  ),

  archiveBrokerAccountController,
);

router.get(
  "/broker-accounts/:id/snapshot",

  requirePermission(
    "VIEW_BROKER_DETAILS",
  ),

  getBrokerSnapshot,
);
router.get(
  "/broker-accounts/:id/cash-reconciliation",

  requirePermission(
    "VIEW_BROKER_DETAILS",
  ),

  getBrokerCashStatus,
);

router.put(
  "/broker-accounts/:id/cash-allocations",

  requirePermission(
    "MANAGE_CASH",
  ),

  updateBrokerCashAllocation,
);

router.delete(
  "/broker-accounts/:id/cash-allocations/:portfolioId",

  requirePermission(
    "MANAGE_CASH",
  ),

  deleteBrokerCashAllocation,
);

router.get(
  "/broker-accounts/:id/reconciliation",

  requirePermission(
    "VIEW_BROKER_DETAILS",
  ),

  getBrokerReconciliation,
);

router.post(
  "/broker-accounts/:id/reconciliation/repair",

  requirePermission(
    "RECONCILE_BROKERS",
  ),

  repairBrokerReconciliation,
);
router.post(
    "/broker-accounts/:id/holdings/import",

    requirePermission(
        "RECONCILE_BROKERS",
    ),

    importBrokerAccountHoldings,
);
export default router;
