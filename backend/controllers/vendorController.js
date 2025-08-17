import Vendor from "../models/Vendor.js";

export const createVendor = async (req, res) => {
  try {
    const vendor = await Vendor.create({ ...req.body, userId: req.user.id });
    res.status(201).json(vendor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getVendors = async (req, res) => {
  try {
    const { lat, lng } = req.query;
    let vendors;
    if (lat && lng) {
      vendors = await Vendor.find({
        location: {
          $near: {
            $geometry: { type: "Point", coordinates: [parseFloat(lng), parseFloat(lat)] },
            $maxDistance: 5000 // 5 km radius
          }
        }
      });
    } else {
      vendors = await Vendor.find();
    }
    res.json(vendors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getVendorById = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id).populate("products");
    if (!vendor) return res.status(404).json({ message: "Vendor not found" });
    res.json(vendor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
