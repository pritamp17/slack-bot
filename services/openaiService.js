const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

// Initialize OpenAI API client
const openaiClient = new OpenAIApi(configuration);

async function generateSqlQuery(messageText) {
  const dbcolumns = "id INTEGER PRIMARY KEY AUTOINCREMENT, android_manufacture TEXT, android_model TEXT, android_os_version TEXT, android_app_version TEXT, acquisition_campaign TEXT, acquisition_source TEXT, city TEXT, state TEXT, onboarding_time INTEGER, phone_carrier TEXT, phone_screen_dpi INTEGER, phone_screen_height INTEGER, phone_screen_width INTEGER, name TEXT, age INTEGER";
  const prompt = `Given a message "${messageText}", generate a SQL query that will work in sqlite3 database. and this is my sqlite3 table "${dbcolumns}" generate a SQL query that will work in sqlite3 database name users and just write query `;

  try {
    const completion = await openaiClient.createCompletion({
      model: 'text-davinci-003',
      prompt: prompt,
      max_tokens: 100,
      temperature: 0.7,
    });

    if (!completion || !completion.data || !completion.data.choices || completion.data.choices.length === 0) {
      throw new Error('Invalid response from OpenAI API');
    }

    const generatedText = completion.data.choices[0].text.trim();

    if (!generatedText) {
      throw new Error('Generated text is null or undefined');
    }
    console.log(generatedText);
    return generatedText;

  } catch (error) {
    // console.error('openAI error:', error);
    throw error;
  }
}

module.exports = {
  generateSqlQuery,
};
