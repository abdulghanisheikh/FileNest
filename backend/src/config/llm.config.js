const { ChatMistralAI } = require("@langchain/mistralai");

const mistralModel = new ChatMistralAI({
	model: "mistral-small-latest",
	maxRetries: 2,
	apiKey: process.env.MISTRAL_API_KEY
});

module.exports = mistralModel;