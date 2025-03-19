const Product = require('../models/homeModel');  

exports.createProduct = async (req, res) => {  
  try {  
    const product = new Product(req.body);  
    await product.save();  
    res.status(201).json(product);  
  } catch (error) {  
    res.status(500).json({ error: error.message });  
  }  
};  

exports.getAllProducts = async (req, res) => {  
  try {  
    const products = await Product.find();  
    res.json(products);  
  } catch (error) {  
    res.status(500).json({ error: error.message });  
  }  
};  

exports.getProductById = async (req, res) => {  
    try {  
      const product = await Product.findById(req.body);  
      if (!product) {  
        return res.status(404).json({ message: 'Product not found' });  
      }  
      res.json(product);  
    } catch (error) {  
      res.status(500).json({ error: error.message });  
    }  
  };  



exports.deleteProduct = async (req, res) => {  
  try {  
    const product = await Product.findByIdAndDelete(req.body);  
    if (!product) {  
      return res.status(404).json({ message: 'Product not found' });  
    }  
    res.json({ message: 'Product deleted' });  
  } catch (error) {  
    res.status(500).json({ error: error.message });  
  }  
};  