const GeminiClient = require("../config/GeminiClient");
const prompt = require("../config/prompt");

class GeminiService {
  async generateTweets() {
    const geminiResponse = await GeminiClient.generateContent(prompt).then(
      (res) => res.response.candidates[0].content.parts[0].text
    );

    // Parse the cleaned JSON string
    const parsedTweets = JSON.parse(geminiResponse);

    return parsedTweets;
  }
}

module.exports = GeminiService;
