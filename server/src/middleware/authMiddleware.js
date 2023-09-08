const jwt = require("jsonwebtoken");
const { User } = require("../models/userModel");

exports.authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ error: "Login Required" });
    }

    // Verify the token
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

    // Find the user based on the decoded token's information
    const user = await User.findById(decodedToken.id);

    if (!user) {
      return res.status(401).json({ error: "Login Required" });
    }

    // Attach the user to the request object
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ error: "Unauthorized" });
  }
};
