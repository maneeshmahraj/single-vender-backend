const Review = require('../models/review');

exports.createReview = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;
    const newReview = new Review({ userId: req.user._id, productId, rating, comment });

    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getReviewsByProduct = async (req, res) => {
  try {
    const reviews = await Review.find({ productId: req.params.productId });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
