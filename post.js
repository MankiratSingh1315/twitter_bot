const scheduleTweets = require("./src/scheduler/tweetScheduler");

// Function to schedule tweets
const scheduleTweetsNow = () => {
    try {
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

// Schedule tweets
scheduleTweetsNow();