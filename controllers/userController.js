const User = require('../models/usersModel');

// Register user
exports.registerUser = async (req, res) => {
  try {
    const { name, phoneNumber, countryCode } = req.body;

    if (!name || !phoneNumber || !countryCode) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ phoneNumber });
    if (existingUser) {
      return res.status(400).json({ message: 'Phone number already registered' });
    }

    const newUser = new User({ name, phoneNumber, countryCode });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
