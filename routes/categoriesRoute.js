const express = require("express");
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');  


// 📌 Category Routes
router.post("/categories", categoriesController.createCategory);
router.get("/categories", categoriesController.getCategories);

// 📌 Product Routes
router.post("/products", categoriesController.createProduct);
router.get("/products", categoriesController.getProducts);

// 📌 Section Routes
router.post("/sections", categoriesController.createSection);
router.get("/sections", categoriesController.getSections);

// 📌 Navigation Routes
router.post("/navigation", categoriesController.createNavigation);
router.get("/navigation", categoriesController.getNavigations);

// 📌 Ecommerce Routes
router.post("/ecommerce", categoriesController.createEcommerce);
router.get("/ecommerce", categoriesController.getEcommerce);

module.exports = router;


