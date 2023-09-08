const { User } = require("../models/userModel");
const bcryptjs = require("bcrypt");
const jwt = require("jsonwebtoken");
const { getDataFromToken } = require("../helpers/getData");

exports.signup = async (req, res) => {
  try {
    const userData = await req.body;
    const { password, email, username } = userData;
    console.log(userData);
    const isEmail = await User.findOne({ email });
    if (isEmail) {
      return res.status(400).json({ error: "User with this email is exist" });
    }
    const isUsername = await User.findOne({ username });
    if (isUsername) {
      return res.status(400).json({ error: "Username already exists take another " });
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const newUser = new User({
      ...userData,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const userData = await req.body;
    const { email, password } = userData;

    // Check user exist or not
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    // Check Password valid or not
    const validPassword = await bcryptjs.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    // Create Token Data
    const tokenData = {
      id: user._id,
      username: user.username,
    };

    // create token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
    });

    return res.status(201).json(token);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.logout = async (req, res) => {
  try {
    res.clearCookie("token", { httpOnly: true, secure: true });

    res.status(201).json({
      message: "Logout successful",
      success: true,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.isAuthenticated = async (req, res) => {
  try {
    const isAuth = getDataFromToken(req); 
    if (!isAuth) {
      return res.status(404).json({ error: "User not logged in " });
    }

    res.status(201).json(isAuth);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  Demo Postman data
// {
//   "name":"one",
//   "username":"one",
//   "email":"one@gmail.com",
//   "password":"1234"
// }
