import { gridFSBucket, upload } from "../config/gridfs.js";
import { ObjectId } from "mongodb";

// 🔹 Upload a PDF File
export const uploadFile = (req, res) => {
  upload.single("file")(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: "File upload failed", error: err.message });
    }

    try {
      const { originalname, buffer, mimetype } = req.file;
      const uploadStream = gridFSBucket.openUploadStream(originalname, { contentType: mimetype });
      uploadStream.end(buffer);

      res.status(201).json({ message: "File uploaded successfully", filename: originalname });
    } catch (error) {
      res.status(500).json({ message: "Error saving file", error: error.message });
    }
  });
};

// 🔹 Download a PDF File by Filename
export const downloadFile = async (req, res) => {
  try {
    const { filename } = req.params;
    const file = await gridFSBucket.find({ filename }).toArray();

    if (!file.length) {
      return res.status(404).json({ message: "File not found" });
    }

    res.set("Content-Type", file[0].contentType);
    gridFSBucket.openDownloadStreamByName(filename).pipe(res);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving file", error: err.message });
  }
};
