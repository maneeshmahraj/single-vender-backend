const { Category, Product, Section, Navigation, Ecommerce } = require("../models/categoriesModel");

// ✅ Create Category
exports.createCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ✅ Get All Categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.createProduct = async (req, res) => {
  try {
    const { name, price, brand, type, image, category } = req.body;

    // Check if all required fields are provided
    if (!name || !price || !brand || !type || !image || !category) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const newProduct = new Product({ name, price, brand, type, image, category });
    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate({ path: "category", strictPopulate: false }); // ✅ Fix added
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// ✅ Create Section
exports.createSection = async (req, res) => {
  try {
    const section = new Section(req.body);
    await section.save();
    res.status(201).json(section);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ✅ Get All Sections (With Products)
exports.getSections = async (req, res) => {
  try {
    const sections = await Section.find().populate("items");
    res.json(sections);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Create Navigation Button
exports.createNavigation = async (req, res) => {
  try {
    const navigation = new Navigation(req.body);
    await navigation.save();
    res.status(201).json(navigation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ✅ Get All Navigation Buttons
exports.getNavigations = async (req, res) => {
  try {
    const navigation = await Navigation.find();
    res.json(navigation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Create Ecommerce Structure
exports.createEcommerce = async (req, res) => {
  try {
    const ecommerce = new Ecommerce(req.body);
    await ecommerce.save();
    res.status(201).json(ecommerce);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ✅ Get Ecommerce Structure (With Populated Data)
exports.getEcommerce = async (req, res) => {
  try {
    const ecommerce = await Ecommerce.find()
      .populate("categories")
      .populate("selected_category")
      .populate("sections")
      .populate("navigation_buttons")
      .populate("bottom_navigation");
    res.json(ecommerce);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
