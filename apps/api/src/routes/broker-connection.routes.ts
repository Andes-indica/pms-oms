import {
  Router,
} from "express";

import {
  configureZerodha,
  createZerodhaSession,
  getBrokerConnection,
  getZerodhaLoginUrl,
} from "../controllers/broker-connection.controller";

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

/*
 * Configuring credentials and starting
 * broker authentication can affect a
 * real trading account.
 *
 * Restrict these operations.
 */
router.put(
  "/:brokerAccountId/zerodha/configure",

  requirePermission(
    "MANAGE_BROKERS",
  ),

  configureZerodha,
);

router.get(
  "/:brokerAccountId/zerodha/login-url",

  requirePermission(
    "MANAGE_BROKERS",
  ),

  getZerodhaLoginUrl,
);

router.post(
  "/:brokerAccountId/zerodha/session",

  requirePermission(
    "MANAGE_BROKERS",
  ),

  createZerodhaSession,
);

/*
 * Connection status itself is safe
 * for any authenticated user to view.
 */
router.get(
  "/:brokerAccountId",
  requirePermission(
    "VIEW_BROKER_DETAILS",
  ),
  getBrokerConnection,
);

export default router;
