const { TwitterApi } = require("twitter-api-v2");
const env = require("./env");

const TwitterClient = new TwitterApi({
  appKey: env.TWITTER_API_KEY,
  appSecret: env.TWITTER_API_SECRET,
  accessToken: env.TWITTER_ACCESS_TOKEN,
  accessSecret: env.TWITTER_ACCESS_SECRET,
});

module.exports = TwitterClient;
