// import mongoose from "mongoose";
// import Grid from "gridfs-stream";

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI);
//     console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.error("❌ MongoDB Connection Error:", error);
//     process.exit(1);
//   }
// };

// export let gfs;
// export let bucket;

// const conn = mongoose.createConnection(process.env.MONGO_URI);
// conn.once("open", () => {
//   gfs = Grid(conn.db, mongoose.mongo);
//   gfs.collection("uploads");
//   bucket = new mongoose.mongo.GridFSBucket(conn.db, { bucketName: "uploads" });
//   console.log("✅ GridFS Ready");
// });

// export default connectDB;



import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`❌ MongoDB Connection Error: ${err.message}`);
    process.exit(1); // Exit process on failure
  }
};

export default connectDB;
