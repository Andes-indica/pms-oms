import { Router } from "express";
import { createOrder,getOrders } from "../controllers/order.controller";

const router = Router();

router.post("/", createOrder);
router.get("/",getOrders)
router.post("/",createOrder)
export default router;