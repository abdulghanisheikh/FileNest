const {ChatMistralAI} = require("@langchain/mistralai");

const mistralModel = new ChatMistralAI({
  model: "mistral-small-latest",
  temperature: 0,
  maxRetries: 2,
  apiKey: process.env.MISTRAL_API_KEY
});

module.exports = mistralModel;