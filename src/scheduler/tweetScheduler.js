const fs = require("fs");
const { CronJob } = require("cron");
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

  tweets.forEach((tweet) => {
    // Parse IST time to UTC using moment-timezone
    const tweetTimeUTC = moment
      .tz(tweet.time, "YYYY-MM-DD HH:mm:ss", "Asia/Kolkata")
      .utc();

    // Check if the parsed time is in the past
    if (tweetTimeUTC.isBefore(moment.utc())) {
      // Skip past tweets
      return;
    }

    numberOfTweetsScheduled++;

    // Construct cron expression
    const cronExpression = `${tweetTimeUTC.seconds()} ${tweetTimeUTC.minutes()} ${tweetTimeUTC.hours()} ${tweetTimeUTC.date()} ${
      tweetTimeUTC.month() + 1
    } *`;

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
  return numberOfTweetsScheduled;
};

module.exports = scheduleTweets;
