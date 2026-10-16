import { Router } from "express";

import {
  createUser,
  createUserPasswordLink,
  getUsers,
  revokeUserSessions,
  setUserEnabled,
  updateUserRole,
} from "../controllers/user.controller";

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
  requirePermission("VIEW_USERS"),
  getUsers,
);

router.post(
  "/",
  requirePermission("MANAGE_USERS"),
  createUser,
);

router.patch(
  "/:id/role",
  requirePermission("MANAGE_USERS"),
  updateUserRole,
);

router.patch(
  "/:id/status",
  requirePermission("MANAGE_USERS"),
  setUserEnabled,
);

router.post(
  "/:id/revoke-sessions",
  requirePermission("MANAGE_USERS"),
  revokeUserSessions,
);

router.post(
  "/:id/password-link",
  requirePermission("MANAGE_USERS"),
  createUserPasswordLink,
);

export default router;
