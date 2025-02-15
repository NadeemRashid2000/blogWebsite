import mongoose from "mongoose";
import multer from "multer";
import { GridFSBucket } from "mongodb";

// 🔹 Initialize GridFS
const conn = mongoose.connection;
let gfs, gridFSBucket;

conn.once("open", () => {
  gridFSBucket = new GridFSBucket(conn.db, { bucketName: "uploads" });
  gfs = gridFSBucket; // Alias for easy access
  console.log("✅ GridFS Ready");
});

// 🔹 Multer Storage (Save file metadata in MongoDB)
const storage = multer.memoryStorage();
const upload = multer({ storage });

export { gfs, gridFSBucket, upload };
