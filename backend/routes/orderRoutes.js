import express from "express";
import { protect } from "../middleware/auth.js";
import { createOrder, getOrderById, getMyOrders } from "../controllers/orderController.js";

const router = express.Router();

router.route("/").post(protect(), createOrder);
router.route("/myorders").get(protect(), getMyOrders);
router.route("/:id").get(protect(), getOrderById);

export default router;