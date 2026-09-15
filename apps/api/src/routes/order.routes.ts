import { Router } from "express";
import { cancelOrder, createOrder,executeOrder,getOrders,syncOrder } from "../controllers/order.controller";

const router = Router();

router.post("/", createOrder);

router.get("/",getOrders);

router.post("/:id/execute",executeOrder);

router.post("/:id/sync", syncOrder);

router.post("/:id/cancel",cancelOrder)
export default router;