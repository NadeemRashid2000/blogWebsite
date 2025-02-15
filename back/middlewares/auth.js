// import jwt from "jsonwebtoken";
// import User from "../models/User.js";

// // 🔹 Authentication Middleware
// export const authMiddleware = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];

//   if (!token) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     res.status(403).json({ message: "Invalid token" });
//   }
// };

// // 🔹 Admin Middleware (Newly Added)
// export const adminMiddleware = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.user.id);
//     if (!user || user.role !== "admin") {
//       return res.status(403).json({ message: "Access Denied. Admins only." });
//     }
//     next();
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { redisClient } from "../config/redis.js"; // ✅ Use named import


const blacklist = new Set(); // In-memory blacklist (Consider using Redis for production)

// 🔹 Rate Limiting Middleware
export const rateLimit = async (req, res, next) => {
  const ip = req.ip;
  const requests = await redisClient.incr(ip);

  if (requests === 1) await redisClient.expire(ip, 60); // Reset every 60 seconds
  if (requests > 10)
    return res.status(429).json({ message: "Too many requests" });

  next();
};

// 🔹 Check if Token is Blacklisted
export const checkBlacklist = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized. No token provided." });
  }

  if (blacklist.has(token)) {
    return res.status(403).json({ message: "Token is blacklisted." });
  }

  next(); // Proceed if token is not blacklisted
};

// 🔹 Authentication Middleware (Protect Routes)
export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized. No token provided." });
    }

    if (blacklist.has(token)) {
      return res.status(403).json({ message: "Token is blacklisted." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized. Invalid token." });
    }

    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired token." });
  }
};

// 🔹 Admin Middleware (Admin Only Access)
export const adminMiddleware = async (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Access Denied. Admins only." });
  }
  next();
};

// 🔹 Add Token to Blacklist (Call this on logout)
export const addToBlacklist = (token) => {
  blacklist.add(token);
};
