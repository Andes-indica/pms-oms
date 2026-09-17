import { Router } from "express";
import { getClientById, getClientPortfolioSummary, getClients } from "../controllers/client.controller";
import { requireAuth } from "@/middleware/auth.middleware";

const router = Router();
router.use(requireAuth)
router.get("/", getClients);
router.get("/:id/portfolio-summary",getClientPortfolioSummary)
router.get("/:id",getClientById);

export default router;