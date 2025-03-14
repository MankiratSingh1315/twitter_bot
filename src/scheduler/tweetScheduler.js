const fs = require("fs");
const TwitterService = require("../services/twitter.service");
const moment = require("moment-timezone");

const twitterService = new TwitterService();

const scheduleTweets = (filePath) => {
  const tweets = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  let numberOfTweetsScheduled = 0;

  if (!tweets || !Array.isArray(tweets) || tweets.length === 0) {
    console.log("No tweets found to schedule.");
    return;
  }

  tweets.forEach(async (tweet) => {
    const tweetTimeUTC = moment
      .tz(tweet.time, "YYYY-MM-DD HH:mm:ss", "Asia/Kolkata")
      .utc();

    if (tweetTimeUTC.isBefore(moment.utc())) {
      // console.log(`Skipping tweet ${tweet.content} as it's in the past.`);
      return;
    }

    numberOfTweetsScheduled++;

    try {
      const { data: createdTweet } = await twitterService.postTweet(
        tweet.content
      );
      console.log(`Tweet posted: ${createdTweet.id} - ${createdTweet.text}`);
    } catch (error) {
      console.error("Error posting tweet:", error);
    }
  });

  return numberOfTweetsScheduled;
};

module.exports = scheduleTweets;
