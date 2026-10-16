import {
  Router,
} from "express";

import {
  getDashboard,
} from "../controllers/dashboard.controller";

import {
  requireAuth,
} from "../middleware/auth.middleware";
import {
  requirePermission,
} from "../security/permissions";

const router =
  Router();

router.use(requireAuth);

router.get(
  "/",
  requirePermission(
    "VIEW_DASHBOARD",
  ),
  getDashboard,
);

export default router;
