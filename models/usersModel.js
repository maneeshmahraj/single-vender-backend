const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true },
  countryCode: { type: String, required: true },
}, { timestamps: true });

// Prevent overwriting the model if it already exists
const User = mongoose.models.User || mongoose.model('UserAdmin', userSchema);

module.exports = User;
