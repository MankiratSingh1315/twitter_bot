const scheduleTweets = require("./src/scheduler/tweetScheduler");
const { CronJob } = require("cron");
const fs = require("fs");
const GeminiService = require("./src/services/gemini.service");
const express = require("express");
const app = express();
const cors = require("cors");
const env = require("./src/config/env");
const geminiService = new GeminiService();

app.use(cors());

// Generate tweets once a day at 8 AM IST
const generateTweetsJob = new CronJob(
  "0 8 * * *", // Runs at 8:00 AM IST every day
  async () => {
    try {
      // Clear the ai_generated_tweets.json file before writing new data
      fs.writeFileSync("tweets.json", JSON.stringify([], null, 2), "utf-8");

      const tweets = await geminiService.generateTweets();

      // Write the parsed content to ai_generated_tweets.json
      fs.writeFileSync("tweets.json", JSON.stringify(tweets, null, 2), "utf-8");
      console.log(`Tweets generated successfully and added in! ${filePath}`);
    } catch (error) {
      console.error("Error generating tweets:", error);
    }
  },
  null,
  true,
  "Asia/Kolkata"
);

// Schedule tweets
const scheduleTweetsJob = new CronJob(
  "10 8 * * *", // Runs at 8:10 AM IST every day
  () => {
    try {
      // Schedule the tweets from the generated tweets.json
      scheduleTweets("tweets.json");
      console.log("Tweets scheduled successfully.");
    } catch (error) {
      console.error("Error occurred while scheduling tweets:", error);
    }
  },
  null,
  true,
  "Asia/Kolkata"
);

// Start the jobs
generateTweetsJob.start();
scheduleTweetsJob.start();

// Add a health check endpoint
app.get("/", (req, res) => {
  const tweets = JSON.parse(fs.readFileSync("tweets.json", "utf-8"));
  res.status(200).json({ message: "Bot is running!", tweets });
});

app.listen(env.PORT, () => {
  console.log(`Bot is running!`);
});
