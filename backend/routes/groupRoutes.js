import express from "express";
import { protect } from "../middleware/auth.js";
import { createGroupOrder, joinGroupOrder, listGroupOrders } from "../controllers/groupOrderController.js";

const router = express.Router();

router.route("/").post(protect(), createGroupOrder).get(listGroupOrders);
router.route("/:id/join").post(protect(), joinGroupOrder);

export default router;