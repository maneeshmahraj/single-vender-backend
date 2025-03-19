const express = require("express");
const { createReview, getReviewsByProduct } = require("../controllers/review");
// const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post('/reviews', createReview);
router.get('/reviews/:productId', getReviewsByProduct);

module.exports = router;
