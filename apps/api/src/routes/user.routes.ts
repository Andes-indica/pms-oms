import { Router } from "express";

import {
  createUser,
  getUsers,
  updateUserRole,
} from "../controllers/user.controller";

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
  requireRole("ADMIN"),
  getUsers,
);

router.post(
  "/",
  requireRole("ADMIN"),
  createUser,
);

router.patch(
  "/:id/role",
  requireRole("ADMIN"),
  updateUserRole,
);

export default router;