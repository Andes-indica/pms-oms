import {
  Router,
} from "express";

import {
  getOperations,
} from "../controllers/operations.controller";
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
    "VIEW_OPERATIONS",
  ),
  getOperations,
);

export default router;
