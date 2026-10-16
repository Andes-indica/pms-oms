import { Router } from "express";

import {
  completeOnboarding,
  login,
  lookupOnboarding,
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

router.post(
  "/onboarding/lookup",
  loginRateLimit,
  lookupOnboarding,
);

router.post(
  "/onboarding/complete",
  loginRateLimit,
  completeOnboarding,
);

export default router;
