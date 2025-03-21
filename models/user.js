const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    mobile: { type: String, unique: true, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" }
});

module.exports = mongoose.model("Users-msg", userSchema);
