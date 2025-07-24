import jwt from "jsonwebtoken";

// Middleware to verify the JWT token
export const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res
      .status(403)
      .json({ message: "Access denied, token is missing." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("Decoded Token:", decoded);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).json({ message: "Invalid token." });
  }
};

// Middleware to check if the user is an admin
export const isAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();
};
