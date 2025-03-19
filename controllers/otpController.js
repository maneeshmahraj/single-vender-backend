const OTP = require('../models/OTP');

// Generate OTP
const generateOTP = async (req, res) => {
  const { phone } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit OTP

  try {
    const newOTP = new OTP({ phone, otp });
    await newOTP.save();
    res.status(201).json({ message: 'OTP generated successfully!', otp }); // Send OTP (for testing)
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Verify OTP
const verifyOTP = async (req, res) => {
  const { phone, otp } = req.body;

  try {
    console.log(`Verifying OTP for phone: ${phone}, OTP: ${otp}`);
    
    const otpRecord = await OTP.findOne({ phone, otp });
    if (!otpRecord) {
      console.log('Invalid OTP');
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // Check if the OTP has expired
    const now = new Date();
    if (now - otpRecord.createdAt > 300 * 1000) {
      console.log('OTP has expired');
      return res.status(400).json({ message: 'OTP has expired' });
    }

    console.log('OTP verified successfully');
    res.status(200).json({ message: 'OTP verified successfully!' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  generateOTP,
  verifyOTP,
};
