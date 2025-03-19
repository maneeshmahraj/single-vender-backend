const mongoose = require("mongoose");

const LanguageSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  code: { type: String, required: true, unique: true },
  flagUrl: { type: String, required: true },
  isActive: { type: Boolean, default: false }, // Selected or not
});

module.exports = mongoose.model("Language", LanguageSchema);
