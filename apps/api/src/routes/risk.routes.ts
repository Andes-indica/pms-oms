import {
  Router,
} from "express";

import {
  createRestrictedSecurity,
  deletePortfolioRiskLimit,
  deleteRestrictedSecurity,
  getRestrictedSecurities,
  updatePortfolioRiskLimit,
} from "../controllers/risk-management.controller";

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

router.put(
  "/portfolios/:id/limits",
  requireRole(
    "ADMIN",
    "PORTFOLIO_MANAGER",
  ),
  updatePortfolioRiskLimit,
);

router.delete(
  "/portfolios/:id/limits",
  requireRole(
    "ADMIN",
    "PORTFOLIO_MANAGER",
  ),
  deletePortfolioRiskLimit,
);

router.get(
  "/restricted-securities",
  requireRole(
    "ADMIN",
    "PORTFOLIO_MANAGER",
    "OPERATIONS",
    "VIEWER",
  ),
  getRestrictedSecurities,
);

router.post(
  "/restricted-securities",
  requireRole(
    "ADMIN",
    "PORTFOLIO_MANAGER",
  ),
  createRestrictedSecurity,
);

router.delete(
  "/restricted-securities/:id",
  requireRole(
    "ADMIN",
    "PORTFOLIO_MANAGER",
  ),
  deleteRestrictedSecurity,
);

export default router;