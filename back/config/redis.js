import { createClient } from "redis";

const redisClient = createClient({
  socket: {
    host: "127.0.0.1", // ✅ Force IPv4
    port: 6379,
    reconnectStrategy: (retries) => (retries > 5 ? false : 2000), // ✅ Wait 2 seconds before retrying
  },
});

redisClient.on("error", (err) => {
  console.error("❌ Redis Connection Error:", err.message);
});

redisClient.on("connect", () => console.log("✅ Redis Connected"));
redisClient.on("ready", () => console.log("✅ Redis Ready"));

await redisClient.connect(); // ✅ Ensure Redis connects properly

export { redisClient };
