// middlewares/auth.middleware.js
const jwt = require("jsonwebtoken");
const { redis } = require("../config/redis");

exports.authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const isBlacklisted = await redis.get(token);

  if (isBlacklisted) {
    return res.status(401).json({ message: "Token has been logged out" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};
