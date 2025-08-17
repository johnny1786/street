import mongoose from "mongoose";

const groupOrderSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    participants: [{
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      quantity: { type: Number, required: true, min: 1 }
    }],
    targetQuantity: { type: Number, required: true },
    currentQuantity: { type: Number, default: 0 },
    status: { type: String, default: "open", enum: ["open", "closed", "fulfilled", "cancelled"] },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("GroupOrder", groupOrderSchema);