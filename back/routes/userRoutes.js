import express from "express";
import {
  registerUser,
  loginUser,
  getAllUsers,
} from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", authMiddleware, getAllUsers);

export default router;
