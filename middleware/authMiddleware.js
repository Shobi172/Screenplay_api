const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: "Access denied. Token missing." });
  }

  try {
    const decodedToken = jwt.verify(authorization, process.env.JWT_SECRET);
    const userEmail = decodedToken.email;

    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Access denied. User not found." });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Access denied. Invalid token." });
  }
};

module.exports = authMiddleware;
