import {
  Router,
} from "express";

import {
  requireAuth,
  type AuthenticatedRequest,
} from "../middleware/auth.middleware";

import {
  getInstrumentMaster,
} from "../services/instrument-master.service";

const router =
  Router();

router.use(
  requireAuth,
);

router.get(
  "/",
  async (
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

    try {
      const instruments =
        await getInstrumentMaster();

      return res.json({
        data:
          instruments,
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "UNKNOWN_ERROR";

      if (
        message ===
          "INSTRUMENT_MASTER_UNAVAILABLE" ||
        message ===
          "INVALID_INSTRUMENT_MASTER" ||
        message ===
          "DUPLICATE_INSTRUMENT"
      ) {
        return res
          .status(500)
          .json({
            error:
              message,
          });
      }

      throw error;
    }
  },
);

export default router;
