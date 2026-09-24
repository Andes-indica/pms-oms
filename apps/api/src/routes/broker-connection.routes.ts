import { Router } from "express";
import {
	configureZerodha,
	getBrokerConnection,
	getZerodhaLoginUrl,
	createZerodhaSession,
} from "../controllers/broker-connection.controller";
import { requireAuth } from "../middleware/auth.middleware";

const router = Router();

router.use(requireAuth);

router.put(
	"/:brokerAccountId/zerodha/configure",
	configureZerodha,
);
router.get(
	"/:brokerAccountId/zerodha/login-url",
	getZerodhaLoginUrl,
);
router.post(
	"/:brokerAccountId/zerodha/session",
	createZerodhaSession,
);
router.get(
	"/:brokerAccountId",
	getBrokerConnection,
);

export default router;