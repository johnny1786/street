// controllers/productController.js
import Product from "../models/Product.js";
import Vendor from "../models/Vendor.js";

/**
 * Vendor creates a product
 * Body: { vendorId, name, description, price, bulkPrice, category, image, stock, unit }
 */
export const createProduct = async (req, res) => {
  try {
    const {
      vendorId, name, description, price, bulkPrice,
      category, image, stock, unit
    } = req.body;

    // Ensure the vendor exists and belongs to the logged-in user (unless admin)
    const vendor = await Vendor.findById(vendorId);
    if (!vendor) return res.status(404).json({ message: "Vendor not found" });

    if (req.user.role !== "admin" && vendor.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized for this vendor" });
    }

    const product = await Product.create({
      vendorId, name, description, price, bulkPrice, category, image, stock, unit
    });

    res.status(201).json({ message: "Product created", product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Public: list products with optional filters
 * Query: q (search), category, minPrice, maxPrice, vendorId, page, limit
 */
export const listProducts = async (req, res) => {
  try {
    const {
      q, category, minPrice, maxPrice, vendorId,
      page = 1, limit = 20
    } = req.query;

    const filter = {};
    if (q) filter.$text = { $search: q };
    if (category) filter.category = category;
    if (vendorId) filter.vendorId = vendorId;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const products = await Product
      .find(filter)
      .sort({ createdAt: -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .populate("vendorId", "shopName");

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/** Get single product by ID */
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("vendorId", "shopName");
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/** Vendor updates own product (or admin) */
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("vendorId");
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (req.user.role !== "admin" && product.vendorId.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const allowed = ["name","description","price","bulkPrice","category","image","stock","unit"];
    allowed.forEach(k => { if (k in req.body) product[k] = req.body[k]; });

    await product.save();
    res.json({ message: "Product updated", product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/** Vendor deletes own product (or admin) */
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("vendorId");
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (req.user.role !== "admin" && product.vendorId.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await product.deleteOne();
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/** Vendor sees own products (dashboard) */
export const listMyProducts = async (req, res) => {
  try {
    const { vendorId } = req.query;
    if (!vendorId) return res.status(400).json({ message: "vendorId is required" });

    const vendor = await Vendor.findById(vendorId);
    if (!vendor) return res.status(404).json({ message: "Vendor not found" });

    if (req.user.role !== "admin" && vendor.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const products = await Product.find({ vendorId }).sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
