import Product from "../models/Product.js";
import Vendor from "../models/Vendor.js";

// Create a new product (vendor only)
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, bulkPrice, category, stock, vendorId } = req.body;

    // Ensure vendor exists and belongs to the logged-in user
    const vendor = await Vendor.findOne({ _id: vendorId, userId: req.user.id });
    if (!vendor) return res.status(403).json({ message: "Not authorized for this vendor" });

    const product = await Product.create({
      vendorId,
      name,
      description,
      price,
      bulkPrice,
      category,
      stock
    });

    // Link product to vendor
    vendor.products.push(product._id);
    await vendor.save();

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all products (optional filters)
export const getProducts = async (req, res) => {
  try {
    const { vendorId, category } = req.query;
    const filter = {};
    if (vendorId) filter.vendorId = vendorId;
    if (category) filter.category = category;

    const products = await Product.find(filter).populate("vendorId");
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single product
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("vendorId");
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update product
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("vendorId");
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Only vendor owner or admin can update
    if (product.vendorId.userId.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    Object.assign(product, req.body);
    await product.save();

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("vendorId");
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Only vendor owner or admin can delete
    if (product.vendorId.userId.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    await product.deleteOne();
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
