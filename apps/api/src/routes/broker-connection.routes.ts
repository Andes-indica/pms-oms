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
  requireRole,
} from "../middleware/role.middleware";

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

  requireRole(
    "ADMIN",
    "PORTFOLIO_MANAGER",
  ),

  configureZerodha,
);

router.get(
  "/:brokerAccountId/zerodha/login-url",

  requireRole(
    "ADMIN",
    "PORTFOLIO_MANAGER",
  ),

  getZerodhaLoginUrl,
);

router.post(
  "/:brokerAccountId/zerodha/session",

  requireRole(
    "ADMIN",
    "PORTFOLIO_MANAGER",
  ),

  createZerodhaSession,
);

/*
 * Connection status itself is safe
 * for any authenticated user to view.
 */
router.get(
  "/:brokerAccountId",
  getBrokerConnection,
);

export default router;