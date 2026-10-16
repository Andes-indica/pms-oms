import {
  Router,
} from "express";

import {
  createPortfolio,
  deletePortfolio,
  getPortfolioValuation,
  updatePortfolio,
} from "../controllers/portfolio.controller";

import {
  createPortfolioCashTransaction,
  getPortfolioCashTransactions,
} from "../controllers/cash-management.controller";

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
  "/clients/:clientId",
  requirePermission(
    "MANAGE_CLIENTS",
  ),
  createPortfolio,
);

router.patch(
  "/:id",
  requirePermission(
    "MANAGE_CLIENTS",
  ),
  updatePortfolio,
);

router.delete(
  "/:id",
  requirePermission(
    "DELETE_CLIENT_DATA",
  ),
  deletePortfolio,
);

router.get(
  "/:id/cash-transactions",
  requirePermission(
    "VIEW_CLIENTS",
  ),
  getPortfolioCashTransactions,
);

router.post(
  "/:id/cash-transactions",
  requirePermission(
    "MANAGE_CASH",
  ),
  createPortfolioCashTransaction,
);

router.get(
  "/:id/valuation",
  requirePermission(
    "VIEW_CLIENTS",
  ),
  getPortfolioValuation,
);

export default router;
