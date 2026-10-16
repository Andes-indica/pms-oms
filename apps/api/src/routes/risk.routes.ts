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
  requirePermission,
} from "../security/permissions";

const router =
  Router();

router.use(
  requireAuth,
);

router.put(
  "/portfolios/:id/limits",
  requirePermission(
    "MANAGE_RISK",
  ),
  updatePortfolioRiskLimit,
);

router.delete(
  "/portfolios/:id/limits",
  requirePermission(
    "MANAGE_RISK",
  ),
  deletePortfolioRiskLimit,
);

router.get(
  "/restricted-securities",
  requirePermission(
    "VIEW_RISK",
  ),
  getRestrictedSecurities,
);

router.post(
  "/restricted-securities",
  requirePermission(
    "MANAGE_RISK",
  ),
  createRestrictedSecurity,
);

router.delete(
  "/restricted-securities/:id",
  requirePermission(
    "MANAGE_RISK",
  ),
  deleteRestrictedSecurity,
);

export default router;
