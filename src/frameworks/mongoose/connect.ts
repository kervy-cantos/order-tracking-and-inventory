import mongoose from "mongoose";

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/inventory";

export async function connectToDatabase() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB:", err);
    process.exit(1);
  }
}
