const User = require("../models/loginModel");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

// Generate JWT Token
const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Register or Login with Mobile
exports.loginWithMobile = async (req, res) => {
  const { mobile, countryCode } = req.body;

  if (!mobile || !countryCode) {
    return res.status(400).json({ success: false, message: "Mobile and Country Code are required" });
  }

  try {
    let user = await User.findOne({ mobile });

    if (!user) {
      user = new User({ mobile, countryCode });
      await user.save();
    } else if (!user.countryCode) {
      user.countryCode = countryCode;
      await user.save();
    }

    const token = generateToken(user);
    res.json({ success: true, user, token });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Register or Login with Email
exports.loginWithEmail = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and Password are required" });
  }

  try {
    let user = await User.findOne({ email });

    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user = new User({ email, password: hashedPassword });
      await user.save();
    } else {
      if (!user.password) {
        return res.status(400).json({ success: false, message: "Password login not enabled for this account" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ success: false, message: "Invalid password" });
      }
    }

    const token = generateToken(user);
    res.json({ success: true, user, token });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
