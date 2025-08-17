import express from "express";
import { protect } from "../middleware/auth.js";
import { createVendor, getVendors, getVendorById } from "../controllers/vendorController.js";

const router = express.Router();

router.post("/", protect(["vendor", "admin"]), createVendor);
router.get("/", getVendors);
router.get("/:id", getVendorById);

export default router;
