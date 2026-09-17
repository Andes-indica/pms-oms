import { Router } from "express";

import {
  createBasketOrder,
  executeBasketOrder,
  getBasketOrders,
  syncBasketOrder,
} from "../controllers/basket-order.controller";

const router = Router();

router.get("/", getBasketOrders);

router.post("/", createBasketOrder);

router.post(
  "/:id/execute",
  executeBasketOrder,
);

router.post("/:id/sync",syncBasketOrder);
export default router;