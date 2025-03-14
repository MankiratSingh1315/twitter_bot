// const scheduleTweets = require("./src/scheduler/tweetScheduler");
const fs = require("fs");
const GeminiService = require("./src/services/gemini.service");
// const env = require("./src/config/env");
const addTimestampsToTweets = require("./src/utils/addTimestampsToTweets");
const geminiService = new GeminiService();

// Function to generate and save tweets
const generateTweets = async () => {
  try {
    fs.writeFileSync("tweets.json", JSON.stringify([], null, 2), "utf-8");
    const geminiGeneratedTweets = await geminiService.generateTweets();
    const tweets = addTimestampsToTweets(geminiGeneratedTweets);
    // console.log("tweets", tweets);
    fs.writeFileSync("tweets.json", JSON.stringify(tweets, null, 2), "utf-8");
    console.log("Tweets generated successfully and added to tweets.json");
  } catch (error) {
    console.error("Error generating tweets:", error);
  }
};

// Generate and schedule tweets, then print them
(async () => {
  await generateTweets();
  // scheduleTweetsNow();
  const tweets = JSON.parse(fs.readFileSync("tweets.json", "utf-8"));
  // console.log("Generated Tweets:\n", tweets);
})();
