import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

export const login = async (req, res) => {
  const { username, password } = req.body;
  // console.log("Login attempt for username:", username);
  try {
    const user = await User.findOne({ username });
    // console.log("User found:", user);
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid credentials - User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    // console.log("Password match:", isMatch);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Invalid credentials - Password mismatch" });
    }

    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (err) {
    // console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
