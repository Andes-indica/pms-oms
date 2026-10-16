import { Router } from "express";

import {
  getAuditLogs,
} from "../controllers/audit.controller";

import {
  requireAuth,
} from "../middleware/auth.middleware";

import {
  requirePermission,
} from "../security/permissions";

const router = Router();

router.use(requireAuth);

router.get(
  "/",
  requirePermission(
    "VIEW_AUDIT",
  ),
  getAuditLogs,
);

export default router;
