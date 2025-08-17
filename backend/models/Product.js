import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: true },
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  bulkPrice: { type: Number },
  category: { type: String },
  stock: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model("Product", productSchema);
