const { User } = require("../models/userModel");
const { getDataFromToken } = require("../helpers/getData");

exports.fetchUserById = async (req, res) => {
  try {
    const id = getDataFromToken(req);
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  const  id  = getDataFromToken(req);
  try {
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


