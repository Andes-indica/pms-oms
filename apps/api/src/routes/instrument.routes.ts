import {
  Router,
} from "express";

import {
  requireAuth,
  type AuthenticatedRequest,
} from "../middleware/auth.middleware";

import {
  requireRole,
} from "../middleware/role.middleware";

import {
  deactivateInstrument,
  getInstrumentMaster,
  importConfiguredInstrumentMaster,
  upsertInstrument,
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

router.post(
  "/",
  requireRole(
    "ADMIN",
    "PORTFOLIO_MANAGER",
  ),
  async (
    req:
      AuthenticatedRequest,
    res,
  ) => {
    try {
      const data =
        await upsertInstrument(
          req.body,
        );

      return res
        .status(201)
        .json({
          data,
        });
    } catch (error) {
      if (
        error instanceof Error &&
        error.message ===
          "INVALID_INSTRUMENT_MASTER"
      ) {
        return res
          .status(400)
          .json({
            error:
              "Symbol and exchange are required",
          });
      }

      throw error;
    }
  },
);

router.post(
  "/import",
  requireRole(
    "ADMIN",
  ),
  async (
    req:
      AuthenticatedRequest,
    res,
  ) => {
    try {
      const data =
        await importConfiguredInstrumentMaster(
          req.body
            ?.replace ===
            true,
        );

      return res
        .status(200)
        .json({
          data,
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
          .status(400)
          .json({
            error:
              message,
          });
      }

      throw error;
    }
  },
);

router.delete(
  "/:id",
  requireRole(
    "ADMIN",
    "PORTFOLIO_MANAGER",
  ),
  async (
    req:
      AuthenticatedRequest & {
        params: {
          id: string;
        };
      },
    res,
  ) => {
    try {
      const data =
        await deactivateInstrument(
          req.params.id,
        );

      return res
        .status(200)
        .json({
          data,
        });
    } catch (error) {
      if (
        error instanceof Error &&
        error.message ===
          "INSTRUMENT_NOT_FOUND"
      ) {
        return res
          .status(404)
          .json({
            error:
              "Instrument not found",
          });
      }

      throw error;
    }
  },
);

export default router;
