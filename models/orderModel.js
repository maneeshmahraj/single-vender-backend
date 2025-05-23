const mongoose =require("mongoose")

const OrderSchema = new mongoose.Schema({
    deliveryAddress: String,
    paymentInfo: String,
    additionalNote: String,
    price: Number,
    discount: Number,
    deliveryCharges: Number,
    totalPrice: Number,
  });
  
  module.exports = mongoose.model("OrderPayment", OrderSchema);
