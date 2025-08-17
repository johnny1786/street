import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  companyName: { type: String, required: true },
  contactPerson: { type: String },
  phone: { type: String, required: true },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
  },
  materialsSupplied: [String], // e.g., ["Fresh Vegetables", "Dairy Products"]
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model("Supplier", supplierSchema);