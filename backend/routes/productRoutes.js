import express from "express";
import { protect } from "../middleware/auth.js";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from "../controllers/productController.js";

const router = express.Router();

// Vendor creates a product
router.post("/", protect(["vendor", "admin"]), createProduct);

// Get all products (optionally filter by vendor or category)
router.get("/", getProducts);

// Get single product details
router.get("/:id", getProductById);

// Vendor updates their own product
router.put("/:id", protect(["vendor", "admin"]), updateProduct);

// Vendor deletes their own product
router.delete("/:id", protect(["vendor", "admin"]), deleteProduct);

export default router;
