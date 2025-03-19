const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  gender: { type: String, enum: ["Male", "Female"] },
  email: { type: String, unique: true, sparse: true },
  mobile: { type: String, required: true, unique: true },
  avatar: { type: String },
  currentAddress: { type: String }, // To be fetched using Google Maps API
  otp: { type: String }, // ✅ OTP will be hashed in controller, not here
  otpExpiration: { type: Date },
  password: { type: String }, // For password-based login
  createdAt: { type: Date, default: Date.now },
  address: [],
  wishlist: [
    {
      productId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Product",
      },
    },
  ],
  favorites: [
    {
      productId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Product",
      },
    },
  ],
  upi: [
    {
      upiId: { type: String, required: true },
      provider: {
        type: String,
        enum: ["PhonePe", "Google Pay", "Paytm", "BHIM"],
        required: true,
      },
      addedAt: { type: Date, default: Date.now },
    },
  ],
  netBanking: [
    {
      bankName: { type: String, required: true },
      accountNumber: { type: String, required: true },
      ifscCode: { type: String, required: true },
      addedAt: { type: Date, default: Date.now },
    },
  ],
  cards: [
    {
      cardType: {
        type: String,
        enum: ["Visa", "Mastercard", "RuPay", "Maestro"],
        required: true,
      },
      cardNumber: { type: String, required: true },
      cardHolderName: { type: String, required: true },
      expiryDate: { type: String, required: true },
      addedAt: { type: Date, default: Date.now },
    },
  ],
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
