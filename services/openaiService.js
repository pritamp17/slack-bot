const openai = require('openai');

// Initialize OpenAI API client
const openaiClient = new openai.OpenAIApi(process.env.OPENAI_API_KEY);

async function generateSqlQuery(messageText) {
  const prompt = `Given a message "${messageText}", generate a SQL query.`;

  const response = await openaiClient.complete({
    engine: 'davinci-codex',
    prompt,
    maxTokens: 100,
    temperature: 0.7,
    topP: 1.0,
    n: 1,
    stop: '\n',
    temperature: 0.7,
    frequencyPenalty: 0.0,
    presencePenalty: 0.0
  });

  return response.choices[0].text.trim();
}

module.exports = {
  generateSqlQuery,
};