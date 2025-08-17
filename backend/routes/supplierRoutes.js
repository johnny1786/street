import express from "express";
import { protect } from "../middleware/auth.js";
import checkRole from "../middleware/role.js";
import { registerSupplier, getSuppliers } from "../controllers/supplierController.js";

const router = express.Router();

router.route("/")
  .post(protect, checkRole('supplier', 'admin'), registerSupplier)
  .get(getSuppliers);

export default router;