import { Router } from "express";
import { createOrder,executeOrder,getOrders } from "../controllers/order.controller";

const router = Router();

router.post("/", createOrder);
router.get("/",getOrders)
router.post("/",createOrder);
router.get("/",getOrders);
router.post("/",createOrder);
router.post("/:id/execute",executeOrder);
export default router;