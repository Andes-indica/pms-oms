import {
  Router,
} from "express";

import {
  getRuntimeCapabilities,
} from "../controllers/runtime.controller";
import {
  requireAuth,
} from "../middleware/auth.middleware";

const router = Router();

router.use(requireAuth);
router.get(
  "/capabilities",
  getRuntimeCapabilities,
);

export default router;
