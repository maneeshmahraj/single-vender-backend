const User = require("../models/userModel");

exports.getWishList = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "UserId not provided",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(201).json({
      success: true,
      wishlist: user.wishlist,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.addItemToWishlist = async (req, res) => {
  try {
    const { productId, userId } = req.body;
    if (!productId || !userId) {
      return res.status(400).json({
        success: false,
        message: "Product or user id not provided",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found with the Id.",
      });
    }

    user.wishlist.push({
      productId: productId,
    });

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Product added to the wishlist",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.removeItemFromWishlist = async (req, res) => {
  try {
    const { productId, userId } = req.body;
    if (!productId || !userId) {
      return res.status(400).json({
        success: false,
        message: "Product or user ID not provided",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found with the given ID.",
      });
    }

    user.wishlist = user.wishlist.filter(
      (item) => item.productId.toString() !== productId
    );

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Product removed from wishlist",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getFavorites = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "UserId not provided",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(201).json({
      success: true,
      favorites: user.favorites,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.addItemToFavorite = async (req, res) => {
  try {
    const { productId, userId } = req.body;
    if (!productId || !userId) {
      return res.status(400).json({
        success: false,
        message: "Product or user id not provided",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found with the Id.",
      });
    }

    user.favorites.push({
      productId: productId,
    });

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Product added to the wishlist",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.removeItemFromFavorite = async (req, res) => {
  try {
    const { productId, userId } = req.body;
    if (!productId || !userId) {
      return res.status(400).json({
        success: false,
        message: "Product or user ID not provided",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found with the given ID.",
      });
    }

    user.favorites = user.favorites.filter(
      (item) => item.productId.toString() !== productId
    );

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Product removed from wishlist",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
