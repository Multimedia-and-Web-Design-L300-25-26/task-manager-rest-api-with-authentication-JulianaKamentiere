import jwt from "jsonwebtoken";
import User from "../models/User.js";


// 1. Extract token from Authorization header
// 2. Verify token
// 3. Find user
// 4. Attach user to req.user
// 5. Call next()
// 6. If invalid → return 401

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    // Extract token from "Bearer <token>"
    if (!token.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Invalid token format" });
    }

    const actualToken = token.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(actualToken, process.env.JWT_SECRET || "test_secret_key");
    
    // Find user and attach to request
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default authMiddleware;