const TwitterClient = require("../config/TwitterClient");

class TwitterService {
  async postTweet(content) {
    try {
      const tweet = await TwitterClient.v2.tweet(content);
      return tweet;
    } catch (error) {
      console.error("Error posting tweet:", error);
      throw new Error("Failed to post tweet");
    }
  }
}

module.exports = TwitterService;
