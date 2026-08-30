import { Router } from "express";
import { createOrder,executeOrder,getOrders,syncOrder } from "../controllers/order.controller";

const router = Router();

router.post("/", createOrder);

router.get("/",getOrders);

router.post("/:id/execute",executeOrder);

router.post("/:id/sync", syncOrder);

export default router;