import Supplier from "../models/Supplier.js";

// @desc    Register a new supplier profile
// @route   POST /api/suppliers
// @access  Private (supplier, admin)
export const registerSupplier = async (req, res) => {
  try {
    const existingSupplier = await Supplier.findOne({ userId: req.user.id });
    if (existingSupplier) {
      return res.status(400).json({ message: "Supplier profile already exists for this user." });
    }
    
    const supplier = await Supplier.create({ ...req.body, userId: req.user.id });
    res.status(201).json(supplier);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get all suppliers
// @route   GET /api/suppliers
// @access  Public
export const getSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find({}).populate("userId", "name email");
    res.json(suppliers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};