import { createServer } from "http";
import mongoose from "mongoose";
import config from "./config";
import app from "./app";

const PORT = config.port;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log("✅ Connected to MongoDB using Mongoose!!");

    // ✅ CHANGED: Only run this locally (not in Vercel)
    createServer(app).listen(PORT, () => {
      console.log(`🚀 Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
  }
}
// ✅ CHANGED: Only run main() in local/dev environment
if (config.node_env !== "production") {
  main();
}

// ✅ CHANGED: Export the Express app for Vercel
export default app;
