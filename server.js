import dotenv from "dotenv";
import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import express from "express";
import mongoose from "mongoose";


dotenv.config();




const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


