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
  archiveClient,
  restoreClient,
} from "../controllers/client.controller";

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

router.get(
  "/",
  requirePermission(
    "VIEW_CLIENTS",
  ),
  getClients,
);

router.post(
  "/",
  requirePermission(
    "MANAGE_CLIENTS",
  ),
  createClient,
);

router.get(
  "/:id/overview",
  requirePermission(
    "VIEW_CLIENTS",
  ),
  getClientOverview,
);

router.get(
  "/:id/portfolio-summary",
  requirePermission(
    "VIEW_CLIENTS",
  ),
  getClientPortfolioSummary,
);

router.patch(
  "/:id",
  requirePermission(
    "MANAGE_CLIENTS",
  ),
  updateClient,
);

router.delete(
  "/:id",
  requirePermission(
    "DELETE_CLIENT_DATA",
  ),
  deleteClient,
);

router.patch(
  "/:id/archive",
  requirePermission(
    "ARCHIVE_CLIENT_DATA",
  ),
  archiveClient,
);

router.patch(
  "/:id/restore",
  requirePermission(
    "ARCHIVE_CLIENT_DATA",
  ),
  restoreClient,
);

router.get(
  "/:id",
  requirePermission(
    "VIEW_CLIENTS",
  ),
  getClientById,
);

export default router;
