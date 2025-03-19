const express = require("express");
const {
  addProduct,
  deleteProduct,
  updateProduct,
  getSingleProduct,
  postReview,
  getReviewsByProductId,
  getAllProduct,
} = require("../controllers/productController");
const { isAuthenticated } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/add-product").post(isAuthenticated, addProduct);

router.route("/delete-product/:id").delete(isAuthenticated, deleteProduct);

router.route("/update-product/:id").put(isAuthenticated, updateProduct);

router.route("/product/:id").get(getSingleProduct);

router.route("/post-review/:productId").post(isAuthenticated, postReview);

router.route("/review/:productId").get(getReviewsByProductId);

router.route("/products").get(getAllProduct);
module.exports = router;
