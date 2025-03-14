// //! Number 4: Setup the server
// //TODO: server.js

// import express from "express";
// import fs from "fs";
// import mongoose from "mongoose";
// import cors from "cors";
// import blogRoutes from "./src/routes/blogRoutes.js";
// import path from "path";
// import { fileURLToPath } from "url";
// import dotenv from "dotenv";

// dotenv.config();

// // Get __dirname in ES6 modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// app.use("/api/blogs", blogRoutes);


// // Serve MDX files
// app.get("/mdx-content/:filename", (req, res) => {
//   const filePath = path.join(__dirname, "mdx-content", req.params.filename);

//   // Ensure the file exists
//   if (!fs.existsSync(filePath)) {
//     return res.status(404).send("MDX file not found");
//   }

//   // Set correct content type
//   res.setHeader("Content-Type", "text/plain");

//   // Send the file content
//   fs.createReadStream(filePath).pipe(res);
// });


// // Database connection
// if (!process.env.MONGO_URI) {
//   console.error("MONGO_URI is not defined. Exiting...");
//   process.exit(1);
// }

// // Database connection
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then((conn) => console.log(` MongoDB connected: ${conn.connection.name}`))
//   .catch((err) => {
//     console.error("MongoDB connection error:", err);
//     process.exit(1);
//   });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


//! Number 4: Setup the server
//TODO: server.js

import express from "express";
import fs from "fs/promises"; // Use `fs.promises` to work with async/await
import mongoose from "mongoose";
import cors from "cors";
import blogRoutes from "./src/routes/blogRoutes.js";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Get __dirname in ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define MDX content directory
const mdxFolderPath = path.join(__dirname, "mdx-content");

// Ensure "mdx-content" directory exists at server startup
const ensureMdxFolderExists = async () => {
  try {
    await fs.mkdir(mdxFolderPath, { recursive: true });
    console.log("✅ MDX Content Folder Ready");
  } catch (err) {
    console.error("❌ Error creating MDX folder:", err);
  }
};

// Call the function before starting the server
ensureMdxFolderExists();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Register routes
app.use("/api/blogs", blogRoutes);

// Serve MDX files
app.get("/mdx-content/:filename", async (req, res) => {
  try {
    const filePath = path.join(mdxFolderPath, req.params.filename);

    // Ensure the file exists
    await fs.access(filePath); // Throws an error if file doesn't exist

    // Set correct content type
    res.setHeader("Content-Type", "text/plain");

    // Send the file content
    const fileStream = await fs.readFile(filePath, "utf-8");
    res.send(fileStream);
  } catch (error) {
    res.status(404).send("❌ MDX file not found");
  }
});

// Ensure MONGO_URI is set
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI is not defined. Exiting...");
  process.exit(1);
}

// Database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then((conn) => console.log(`✅ MongoDB connected: ${conn.connection.name}`))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
