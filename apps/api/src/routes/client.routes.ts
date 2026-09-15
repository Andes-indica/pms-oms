import { Router } from "express";
import { getClientById, getClientPortfolioSummary, getClients } from "../controllers/client.controller";

const router = Router();

router.get("/", getClients);
router.get("/:id/portfolio-summary",getClientPortfolioSummary)
router.get("/:id",getClientById);

export default router;