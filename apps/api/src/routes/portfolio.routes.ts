import {
  Router,
} from "express";

import {
  getPortfolioValuation,
} from "../controllers/portfolio.controller";

import {
  requireAuth,
} from "../middleware/auth.middleware";

const router =
  Router();

router.use(requireAuth);

router.get(
  "/:id/valuation",
  getPortfolioValuation,
);

export default router;