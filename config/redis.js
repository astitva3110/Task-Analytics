// config/redis.js
const { createClient } = require("redis");

const redis = createClient({
  username: "default",
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  }
});

redis.on("error", (err) => {
  console.error("Redis Client Error:", err);
});

async function connectRedis() {
  try {
    await redis.connect();
    console.log("Redis connected");
  } catch (err) {
    console.error("Redis connection error:", err);
  }
}

module.exports = { redis, connectRedis };
