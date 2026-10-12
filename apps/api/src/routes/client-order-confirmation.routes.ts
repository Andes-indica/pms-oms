import {
  Router,
} from "express";

import {
  completeClientConfirmation,
  declineClientConfirmation,
  lookupClientConfirmation,
  startClientConfirmationHandoff,
} from "../controllers/client-order-confirmation.controller";

const router = Router();

router.post(
  "/lookup",
  lookupClientConfirmation,
);

router.post(
  "/handoff",
  startClientConfirmationHandoff,
);

router.post(
  "/complete",
  completeClientConfirmation,
);

router.post(
  "/decline",
  declineClientConfirmation,
);

export default router;
