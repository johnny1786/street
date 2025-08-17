import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String },
        price: { type: Number, required: true },
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      },
    ],
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    totalPrice: { type: Number, required: true, default: 0.0 },
    status: { type: String, required: true, default: "Pending", enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"] },
    deliveredAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);