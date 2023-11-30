const { Brand } = require('../models/brandModel');

exports.fetchBrand = async (req, res) => {
  try {
    const brand = await Brand.find({});
    res.status(200).json(brand);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.createBrand = async (req, res) => {
  const newBrand = new Brand(req.body);
  try {
    const brand = await newBrand.save();
    res.status(201).json(brand);
  } catch (err) {
    res.status(400).json(err);
  }
};