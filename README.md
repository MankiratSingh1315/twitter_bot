# 🤖 AI Programmer Twitter Bot

A Node.js Twitter bot that generates and automatically posts programmer thoughts, experiences, and insights using AI. The bot creates authentic, engaging tweets that mirror real programmer perspectives, ranging from technical tips to industry opinions and personal observations.

## ✨ Features

- 🎯 Generates authentic programmer-focused tweets
- ⏰ Automatic scheduling in IST timezone
- 🔄 Configurable content mix (technical, opinions, personal thoughts)
- 🎨 Natural language with proper context
- ⚡ Easy to customize and deploy

## 🛠️ Prerequisites

- Node.js (v14 or higher)
- A Twitter Developer Account with OAuth 2.0 credentials
- Google AI (Gemini) API key
- npm or yarn package manager

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/SalehKhatri/twitter_bot.git
cd twitter-bot
```

2. Install dependencies:
```bash
npm install
```

3. Create an environment file:
```bash
cp .env.example .env
```

4. Configure your environment variables in `.env`:
```env
TWITTER_API_KEY=your_api_key
TWITTER_API_SECRET=your_api_secret
TWITTER_ACCESS_TOKEN=your_access_token
TWITTER_ACCESS_SECRET=your_access_secret
GEMINI_API_KEY=your_gemini_api_key
```

## ⚙️ Configuration

### Customizing Tweet Generation

The tweet generation prompt can be customized in `src/config/prompt.js`. You can modify:
- Content mix ratio between technical and non-technical tweets
- Tone and style of tweets
- Specific topics to focus on
- Time scheduling preferences

## 🚀 Usage

Run the bot:
```bash
node bot.js
```

The bot will:
1. Generate tweets using the configured prompt
2. Schedule them throughout the day (9 AM to 11:59 PM IST)
3. Automatically post them at scheduled times

## 📊 Tweet Categories

The bot generates three types of tweets:
1. **Programming-related (50%):**
   - Coding experiences
   - Technical insights
   - Debugging stories
   - Tool recommendations

2. **Tech Culture & Opinions (30%):**
   - Industry observations
   - Hot takes on trends
   - Work-life balance
   - Tech workplace culture

3. **Personal & Random (20%):**
   - Programmer lifestyle
   - Coffee addiction
   - Setup struggles
   - Weekend coding plans

## 🔧 Troubleshooting

Common issues and solutions:

1. **Timezone Issues:**
   - Ensure your server's timezone is properly set
   - Check that all generated timestamps are in IST
   - Verify the cron job timezone settings

2. **API Rate Limits:**
   - Twitter has rate limits for posting
   - Ensure tweets are spaced appropriately
   - Monitor your API usage

3. **Content Generation:**
   - Adjust the prompt if tweets are too repetitive
   - Fine-tune the content mix ratios
   - Modify example tweets for better variety

## 📝 License

MIT License - feel free to use this for your own Twitter bot!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🙏 Acknowledgments

- Thanks to Google's Gemini AI for powering the tweet generation
- Twitter API for enabling automated posting
- The developer community for inspiration

## ⚠️ Important Notes

- Keep your API keys secure and never commit them to the repository
- Follow Twitter's automation rules and best practices
- Monitor your bot's output to ensure quality content
- Regularly update dependencies for security

## 📮 Contact

If you have any questions or suggestions, please open an issue or reach out to [your contact information].

---
Remember to 🌟 star this repository if you find it helpful!
