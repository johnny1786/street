// models/Product.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
    name: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    price: { type: Number, required: true, min: 0 },
    bulkPrice: { type: Number, min: 0 },   // optional: lower price for group buys
    category: { type: String, index: true },
    image: { type: String },                // URL
    stock: { type: Number, default: 0, min: 0 },
    unit: { type: String, default: "kg" },  // kg/pcs/ltr etc.
  },
  { timestamps: true }
);

productSchema.index({ name: "text", description: "text" });

export default mongoose.model("Product", productSchema);
