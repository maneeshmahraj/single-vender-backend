


const Product = require("../models/productModel");

exports.getAllProduct = async (req, res) => {
  try {
    const products = await Product.find({});

    if (!products) {
      res.status(404).json({ success: false, message: "No products found" });
    }

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Invalid Product ID", details: error.message });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discount,
      category,
      brand,
      stock,
      images,
    } = req.body;

    // Validate required fields
    if (!name || !price || !category || stock === undefined) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Create a new product
    const newProduct = new Product({
      name,
      description,
      price,
      discount: discount || 0,
      category,
      brand,
      stock,
      images,
    });

    await newProduct.save();

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedProduct)
      return res.status(404).json({ error: "Product not found!" });

    res.status(200).json({
      message: "Product updated successfully!",
      product: updatedProduct,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Invalid Product ID", details: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct)
      return res.status(404).json({ error: "Product not found!" });

    res.status(200).json({ message: "Product deleted successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Invalid Product ID", details: error.message });
  }
};

exports.getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ error: "Product not found!" });

    res.status(200).json(product);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Invalid Product ID", details: error.message });
  }
};

exports.postReview = async (req, res) => {
  try {
    const { productId } = req.params;
    const { userId, comment, rating } = req.body;

    if (!userId || !rating) {
      return res
        .status(400)
        .json({ message: "User ID and rating are required." });
    }

    // Find the product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Create a new review
    const newReview = {
      userId: new mongoose.Types.ObjectId(userId),
      comment,
      rating,
      createdAt: new Date(),
    };

    // Push the review into the product's reviews array
    product.reviews.push(newReview);

    // Recalculate the average rating
    const totalRating = product.reviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    product.rating = totalRating / product.reviews.length;

    // Save the updated product
    await product.save();

    res.status(201).json({ message: "Review added successfully", product });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.getReviewsByProductId = async (req, res) => {
  try {
    const { productId } = req.params;

    // Find product and populate user details in reviews
    const product = await Product.findById(productId).populate(
      "reviews.userId",
      "name email"
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Reviews fetched successfully",
      reviews: product.reviews,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
