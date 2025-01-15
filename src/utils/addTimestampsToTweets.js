const moment = require("moment-timezone");

const addTimestampsToTweets = (tweets) => {
  const today = moment().tz("Asia/Kolkata");

  const timeRanges = [
    { start: 9, end: 11 }, // Morning
    { start: 12, end: 14 }, // Lunch time
    { start: 15, end: 18 }, // Afternoon/Evening
    { start: 19, end: 23 }, // Night
  ];

  return tweets.map((tweet, index) => {
    const rangeIndex = Math.floor(index / (tweets.length / timeRanges.length));
    const range = timeRanges[Math.min(rangeIndex, timeRanges.length - 1)];

    // Generate random time within the range
    const hour =
      Math.floor(Math.random() * (range.end - range.start + 1)) + range.start;
    const minute = Math.floor(Math.random() * 60);

    const tweetTime = today.clone().hour(hour).minute(minute).second(0);

    return {
      content: tweet.content,
      time: tweetTime.format("YYYY-MM-DD HH:mm:00 IST"),
    };
  });
};

module.exports = addTimestampsToTweets;
