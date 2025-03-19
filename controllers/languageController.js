const mongoose = require("mongoose");
const Language = require("../models/languageModel");

// Get all languages
exports.getLanguages = async (req, res) => {
  try {
    const languages = await Language.find();
    res.status(200).json(languages);
  } catch (error) {
    res.status(500).json({ error: "Server error. Unable to fetch languages." });
  }
};

// Add a new language
exports.addLanguage = async (req, res) => {
  try {
    const { name, code, flagUrl, isActive } = req.body;

    // Validate required fields
    if (!name || !code || !flagUrl) {
      return res.status(400).json({ error: "Name, code, and flag URL are required." });
    }

    const newLanguage = new Language({ name, code, flagUrl, isActive });
    await newLanguage.save();
    
    res.status(201).json(newLanguage);
  } catch (error) {
    res.status(500).json({ error: "Server error. Could not add language." });
  }
};

// Delete a language
exports.deleteLanguage = async (req, res) => {
  try {
    const { id } = req.body;
    console.log("Received ID:", id);  // Log the ID to check

    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid language ID format." });
    }

    const deletedLanguage = await Language.findByIdAndDelete(id);

    if (!deletedLanguage) {
      return res.status(404).json({ error: "Language not found." });
    }

    res.status(200).json({ message: "Language deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Server error. Could not delete language." });
  }
};
