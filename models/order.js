const mongoose = require("mongoose");


const OrderSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    product: String,
    price: Number,
    status: {
      type: String,
      enum: ["placed", "confirmed", "processed", "ready_to_ship", "out_for_delivery"],
      default: "placed"
    }
  });
  const Order = mongoose.model('Order', OrderSchema);