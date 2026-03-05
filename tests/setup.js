import mongoose from "mongoose";
import dotenv from "dotenv";

// Load test environment variables
dotenv.config({ path: ".env.test" });

// Connect to test database before all tests
beforeAll(async () => {
  const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/taskmanager_test";
  await mongoose.connect(mongoUri);
  
  // Clean database once at start
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});

// Disconnect after all tests
afterAll(async () => {
  await mongoose.disconnect();
});

import app from "../src/app.js";
export default app;