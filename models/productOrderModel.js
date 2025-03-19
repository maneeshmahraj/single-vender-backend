const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true },
        discount: { type: Number, default: 0 },
        delivery_fee: { type: Number, default: 0 },
      },
    ],

    totalPrice: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    platformFee: { type: Number, default: 0 },
    deliveryCharges: { type: Number, default: 0 },
    finalAmount: { type: Number, required: true },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed", "Refunded"],
      default: "Pending",
    },

    paymentMethod: {
      type: String,
      enum: ["COD", "Credit Card", "Debit Card", "UPI", "Net Banking"],
      // required: true,
    },
    orderStatus: {
      type: String,
      enum: [
        "Placed",
        "Confirmed",
        "Processed",
        "Ready to Ship",
        "Out for Delivery",
        "Delivered",
        "Cancelled",
      ],
      default: "Placed",
    },
    tracking: [
      {
        status: String, // e.g., "Order Placed", "Order Confirmed", "Order Processed"
        date: { type: Date, default: Date.now },
        message: String, // Additional details if needed
      },
    ],
    transactionId: { type: String, default: null },

    address: {
      fullName: { type: String, required: true },
      phone: { type: String, required: true },
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
      pincode: { type: String, required: true },
    },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
