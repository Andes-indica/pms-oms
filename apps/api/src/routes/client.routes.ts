import {
  Router,
} from "express";

import {
  createClient,
  deleteClient,
  getClientById,
  getClientOverview,
  getClientPortfolioSummary,
  getClients,
  updateClient,
} from "../controllers/client.controller";

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

router.get(
  "/",
  getClients,
);

router.post(
  "/",
  requireRole(
    "ADMIN",
    "PORTFOLIO_MANAGER",
  ),
  createClient,
);

router.get(
  "/:id/overview",
  getClientOverview,
);

router.get(
  "/:id/portfolio-summary",
  getClientPortfolioSummary,
);

router.patch(
  "/:id",
  requireRole(
    "ADMIN",
    "PORTFOLIO_MANAGER",
  ),
  updateClient,
);

router.delete(
  "/:id",
  requireRole(
    "ADMIN",
  ),
  deleteClient,
);

router.get(
  "/:id",
  getClientById,
);

export default router;
