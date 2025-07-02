import cron from "node-cron";
import fetch from "node-fetch";

cron.schedule("* * * * *", async () => {
  console.log("Triggering scheduled API job...");
  try {
    const baseUrl = " http://localhost:3000";
    if (!baseUrl) {
      throw new Error("BASE_URL is not defined");
    }
    await fetch(baseUrl + "/api/schedule", { method: "POST" });
    console.log("API triggered successfully");
  } catch (error) {
    console.error("Error triggering API:", error);
  }
});

console.log("Cron job initialized.");
