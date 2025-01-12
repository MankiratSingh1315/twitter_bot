const fs = require("fs");
const { CronJob } = require("cron");
const TwitterService = require("../services/twitter.service");
const parseISTtoUTC = require("../utils/parseISTtoUTC");

const twitterService = new TwitterService();

const scheduleTweets = (filePath) => {
  const tweets = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  let numberOfTweetsScheduled = 0;

  if (!tweets || !Array.isArray(tweets) || tweets.length === 0) {
    console.log("No tweets found to schedule.");
    return;
  }

  tweets.forEach((tweet) => {
    const tweetTime = parseISTtoUTC(tweet.time);

    // Construct cron expression
    const cronExpression = `${tweetTime.getUTCSeconds()} ${tweetTime.getUTCMinutes()} ${tweetTime.getUTCHours()} ${tweetTime.getUTCDate()} ${
      tweetTime.getUTCMonth() + 1
    } *`;

    if (tweetTime < new Date()) {
      // Skip past tweets
      return;
    }
    numberOfTweetsScheduled++;

    const job = new CronJob(
      cronExpression,
      async () => {
        try {
          const { data: createdTweet } = await twitterService.postTweet(
            tweet.content
          );
          console.log(
            `Tweet posted: ${createdTweet.id} - ${createdTweet.text}`
          );
        } catch (error) {
          console.error("Error posting tweet:", error);
        }
      },
      null,
      true,
      "UTC"
    );

    job.start();
  });

  if (numberOfTweetsScheduled === 0) {
    console.log("No tweets scheduled for future.");
  }

  console.log("Tweets scheduled successfully!");
};

module.exports = scheduleTweets;
