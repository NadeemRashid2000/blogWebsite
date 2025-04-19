import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const existingAdmin = await User.findOne({ username: "admin" });

    if (existingAdmin) {
      console.log("Admin user already exists.");
    } else {
      const hashedPassword = await bcrypt.hash("admin123", 10); // Hash the admin password

      const newAdmin = new User({
        username: "admin",
        password: hashedPassword,
        role: "admin",
      });

      await newAdmin.save();
      console.log("Admin user created.");
    }

    mongoose.connection.close();
  } catch (err) {
    console.error("Error creating admin user:", err);
  }
};

createAdmin();
