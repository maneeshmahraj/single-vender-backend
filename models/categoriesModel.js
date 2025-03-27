const mongoose = require("mongoose");

// 📌 Category Schema
const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  icon: { type: String, default: "" },
  subcategories: [{ type: String, trim: true }]
});


// 📌 Product Schema

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  brand: { type: String },
  type: { type: String },
  image: { type: String },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" } // ✅ Correct reference
});



// 📌 Section Schema
const SectionSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: "ProductMultiple" }],
  more: { type: Boolean, default: false }
});

// 📌 Navigation Schema
const NavigationSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  icon: { type: String, default: "" },
  link: { type: String, required: true, trim: true }
});

// 📌 Ecommerce Schema
const EcommerceSchema = new mongoose.Schema({
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
  selected_category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  sections: [{ type: mongoose.Schema.Types.ObjectId, ref: "Section" }],
  navigation_buttons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Navigation" }],
  bottom_navigation: [{ type: mongoose.Schema.Types.ObjectId, ref: "Navigation" }]
});

const Category = mongoose.models.Category || mongoose.model("Category", CategorySchema);
const Product = mongoose.models.Product || mongoose.model("ProductMultiple", ProductSchema);
const Section = mongoose.models.Section || mongoose.model("Section", SectionSchema);
const Navigation = mongoose.models.Navigation || mongoose.model("Navigation", NavigationSchema);
const Ecommerce = mongoose.models.Ecommerce || mongoose.model("Ecommerce", EcommerceSchema);

module.exports = { Category, Product, Section, Navigation, Ecommerce };
