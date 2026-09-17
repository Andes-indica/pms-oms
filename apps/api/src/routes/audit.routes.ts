import { Router } from "express";

import {
  getAuditLogs,
} from "../controllers/audit.controller";

import {
  requireAuth,
} from "../middleware/auth.middleware";

import {
  requireRole,
} from "../middleware/role.middleware";

const router = Router();

router.use(requireAuth);

router.get(
  "/",
  requireRole(
    "ADMIN",
    "OPERATIONS",
  ),
  getAuditLogs,
);

export default router;