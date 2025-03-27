const UserModel = require('../models/usersModel');

// Register user
exports.registerUser = async (req, res) => {
  try {
    const { name, phoneNumber, countryCode } = req.body;

       console.log(name, phoneNumber, countryCode)
    if (!name || !phoneNumber || !countryCode) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await UserModel.findOne({phoneNumber});
    console.log(existingUser)
    if (existingUser) {
      return res.status(400).json({ message: 'Phone number already registered' });
    }

    const newUser = await new UserModel({ name, phoneNumber, countryCode });
    await newUser.save();
    console.log(newUser)
    res.status(201).json({ message: 'User registered successfully', user:newUser });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
