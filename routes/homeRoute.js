const express = require('express');  
const homeController = require('../controllers/homeController');  

const router = express.Router();  

router.post('/create', homeController.createProduct);  
router.get('/all', homeController.getAllProducts);  
router.get('/id', homeController.getProductById);  
router.post('/del', homeController.deleteProduct);  

module.exports = router;  