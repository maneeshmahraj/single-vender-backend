const mongoose = require("mongoose");


const ReviewSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    productId: mongoose.Schema.Types.ObjectId,
    rating: Number,
    comment: String
  });
  const Review = mongoose.model('Review', ReviewSchema);