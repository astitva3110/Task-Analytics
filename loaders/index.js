// src/loaders/index.js
const mongoose = require("mongoose");
const { connectDB} = require("../config/database");

module.exports = async () => {
  try {
    await connectDB()
  } catch (err) {
    console.error("MongoDB Connection Failed:", err.message);
    process.exit(1);
  }
};
