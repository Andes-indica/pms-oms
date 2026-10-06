import {
  Router,
} from "express";

import {
  requireAuth,
  type AuthenticatedRequest,
} from "../middleware/auth.middleware";

import {
  subscribeLiveUpdates,
} from "../services/live-update.service";

const router =
  Router();

router.use(
  requireAuth,
);

router.get(
  "/",
  (
    req:
      AuthenticatedRequest,
    res,
  ) => {
    if (!req.user) {
      return res
        .status(401)
        .json({
          error:
            "Authentication required",
        });
    }

    subscribeLiveUpdates(
      req.user.firmId,
      res,
    );
  },
);

export default router;
