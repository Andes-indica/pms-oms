import { Router } from "express";
import { getClientById, getClients } from "../controllers/client.controller";

const router = Router();

router.get("/", getClients);
router.get("/:id",getClientById);

export default router;