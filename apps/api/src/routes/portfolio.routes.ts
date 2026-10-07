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
  "/clients/:clientId",
  requireRole(
    "ADMIN",
    "PORTFOLIO_MANAGER",
  ),
  createPortfolio,
);

router.patch(
  "/:id",
  requireRole(
    "ADMIN",
    "PORTFOLIO_MANAGER",
  ),
  updatePortfolio,
);

router.delete(
  "/:id",
  requireRole(
    "ADMIN",
  ),
  deletePortfolio,
);

router.get(
  "/:id/valuation",
  getPortfolioValuation,
);

export default router;
