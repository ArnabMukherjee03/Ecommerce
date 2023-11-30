const { Category } = require('../models/category');

exports.fetchCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.createCategory = async (req, res) => {
  try {
    console.log(req.body)
    const newCategory = new Category(req.body);
    const categories = await newCategory.save();
    res.status(201).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
};