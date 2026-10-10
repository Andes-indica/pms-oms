import { Router } from "express";

import {
  login,
} from "../controllers/auth.controller";

import {
  loginRateLimit,
} from "../middleware/login-rate-limit.middleware";

const router = Router();

router.post(
  "/login",
  loginRateLimit,
  login,
);

export default router;
