// src/loaders/index.js
const mongoose = require("mongoose");
const { connectDB } = require("../config/database");
const { connectRedis } = require("../config/redis");

module.exports = async () => {
  try {
    await connectDB()
    await connectRedis();
  } catch (err) {
    console.error("MongoDB Connection Failed:", err.message);
    process.exit(1);
  }
};
