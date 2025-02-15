import express from "express";
import { uploadFile, downloadFile } from "../controllers/fileController.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = express.Router();

// ✅ Upload file (Auth required)
router.post("/upload", authMiddleware, uploadFile);

// ✅ Download file
router.get("/file/:filename", downloadFile);

export default router;
