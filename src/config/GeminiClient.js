const { GoogleGenerativeAI } = require("@google/generative-ai");
const env = require("./env");

const genAi = new GoogleGenerativeAI(env.GEMINI_API_KEY);
const GeminiClient = genAi.getGenerativeModel({ model: "gemini-1.5-flash" });

module.exports = GeminiClient;
