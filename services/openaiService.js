const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();
console.log(process.env.OPENAI_API_KEY)
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

// Initialize OpenAI API client
const openaiClient = new OpenAIApi(configuration);

async function generateSqlQuery(messageText) {
  const prompt = `Given a message "${messageText}", generate a SQL query.`;

  try {
    const completion = await openaiClient.createCompletion({
      model: 'text-davinci-003',
      prompt: prompt,
      max_tokens: 100,
      temperature: 0.7,
    });

    const generatedText = completion.data.choices[0].text.trim();
    console.log(generatedText);
    return generatedText;
  } catch (error) {
    console.error('openAI error:', error);
    throw error;
  }
}

module.exports = {
  generateSqlQuery,
};
