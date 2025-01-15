const scheduleTweets = require("./src/scheduler/tweetScheduler");
const { CronJob } = require("cron");
const fs = require("fs");
const GeminiService = require("./src/services/gemini.service");
const express = require("express");
const app = express();
const cors = require("cors");
const env = require("./src/config/env");
const addTimestampsToTweets = require("./src/utils/addTimestampsToTweets");
const geminiService = new GeminiService();
app.use(cors());

// Function to generate and save tweets
const generateTweets = async () => {
  try {
    // Clear the tweets.json file before writing new data
    fs.writeFileSync("tweets.json", JSON.stringify([], null, 2), "utf-8");

    const geminiGeneratedTweets = await geminiService.generateTweets();
    const tweets = addTimestampsToTweets(geminiGeneratedTweets);

    // Write the parsed content to tweets.json
    fs.writeFileSync("tweets.json", JSON.stringify(tweets, null, 2), "utf-8");
    console.log(`Tweets generated successfully and added to tweets.json`);
  } catch (error) {
    console.error("Error generating tweets:", error);
  }
};

// Function to schedule tweets
const scheduleTweetsNow = () => {
  try {
    // Schedule the tweets from the generated tweets.json
    const numberOfTweetsScheduled = scheduleTweets("tweets.json");

    if (numberOfTweetsScheduled > 0) {
      console.log("Tweets scheduled successfully!");
    } else {
      console.log("No tweets scheduled for future.");
    }
  } catch (error) {
    console.error("Error occurred while scheduling tweets:", error);
  }
};

// Generate tweets once a day at 8 AM IST
const generateTweetsJob = new CronJob(
  "0 8 * * *", // Runs at 8:00 AM IST every day
  generateTweets,
  null,
  true,
  "Asia/Kolkata"
);

// Schedule tweets once a day at 8:10 AM IST
const scheduleTweetsJob = new CronJob(
  "10 8 * * *", // Runs at 8:10 AM IST every day
  scheduleTweetsNow,
  null,
  true,
  "Asia/Kolkata"
);

// Start the jobs
generateTweetsJob.start();
scheduleTweetsJob.start();

// Run generate and schedule tweets immediately on startup
(async () => {
  console.log("Running initial tweet generation and scheduling...");
  await generateTweets();
  scheduleTweetsNow();
})();

// Add a health check endpoint
app.get("/", (req, res) => {
  const tweets = JSON.parse(fs.readFileSync("tweets.json", "utf-8"));
  res.status(200).json({ message: "Bot is running!", tweets });
});

app.listen(env.PORT, () => {
  console.log(`Bot is running on port ${env.PORT}!`);
});
