import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  shopName: { type: String, required: true },
  description: { type: String },
  location: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: { type: [Number], required: true } // [longitude, latitude]
  },
  categories: [String],
  rating: { type: Number, default: 0 },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }]
}, { timestamps: true });

vendorSchema.index({ location: "2dsphere" });

export default mongoose.model("Vendor", vendorSchema);
