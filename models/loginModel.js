const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  mobile: { type: String, unique: true, sparse: true },
  email: { type: String, unique: true, sparse: true },
  password: { type: String, required: false }, // Optional for OTP-based login
  countryCode: { type: String, required: function () { return !!this.mobile; } }, // Required only for mobile users
});

module.exports = mongoose.model("UserLogin", UserSchema);
