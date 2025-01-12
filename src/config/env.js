require("dotenv").config();

const env = {
  PORT: process.env.PORT || 5000,
  TWITTER_API_KEY: process.env.TWITTER_API_KEY,
  TWITTER_API_SECRET: process.env.TWITTER_API_SECRET,
  TWITTER_ACCESS_TOKEN: process.env.TWITTER_ACCESS_TOKEN,
  TWITTER_ACCESS_SECRET: process.env.TWITTER_ACCESS_SECRET,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
};

// Check for missing environment variables
const missingVariables = Object.entries(env)
  .filter(([key, value]) => !value)
  .map(([key]) => key);

if (missingVariables.length > 0) {
  throw new Error(
    `The following environment variables are missing: ${missingVariables.join(
      ", "
    )}`
  );
}

module.exports = env;
