const {
    getWishList,
    removeItemFromWishlist,
    addItemToWishlist,
    addItemToFavorite,
    removeItemFromFavorite,
    getFavorites,
  } = require("../controllers/wishlistAndFavController");
  const { isAuthenticated } = require("../middleware/authMiddleware");
  
  const router = require("express").Router();
  
  router.post("/wishlist-add", isAuthenticated, addItemToWishlist);
  
  router.delete("/wishlist-remove", isAuthenticated, removeItemFromWishlist);
  
  router.get("/wishlist", getWishList);
  
  // not documented
  router.post("/favorite-add", isAuthenticated, addItemToFavorite);
  
  router.delete("/favorite-remove", isAuthenticated, removeItemFromFavorite);
  
  router.get("/favorite", getFavorites);
  
  module.exports = router;
  