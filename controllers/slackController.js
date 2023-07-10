const openaiService = require('../services/openaiService');
const databaseController = require('./databaseController');
require('dotenv').config();

async function handleMessage({ event, say }) {
  try {
    console.log(event);
    const queryText = event.text.toLowerCase();
    if (queryText.includes('how many users from') && queryText.includes('use')) {
      const location = queryText.split('from')[1].split('use')[0].trim();
      const phoneBrand = queryText.split('use')[1].trim();

      const sqlQuery = await openaiService.generateSqlQuery(queryText);
      console.log("sql query :",sqlQuery)
      databaseController.executeQuery(sqlQuery, (err, row) => {
        if (err) {
          console.error(err);
          return;
        }

        const userCount = row.userCount;

        say(`The number of users from ${location} using ${phoneBrand} phones is ${userCount}`);
      });
    } else if (queryText.includes('how many users joined yesterday')) {
      const yesterdayDate = new Date();
      yesterdayDate.setDate(yesterdayDate.getDate() - 1);

      const sqlQuery = await openaiService.generateSqlQuery(queryText);
      console.log("sql query :",sqlQuery)
      databaseController.executeQuery(sqlQuery, (err, row) => {
        if (err) {
          console.error(err);
          return;
        }

        const userCount = row.userCount;

        say(`The number of users who joined yesterday is ${userCount}`);
      });
    } else {
      say("I'm sorry, I couldn't understand your query. Please try again.");
    }
  } catch (error) {
    console.error('Error resolving in sqlite:', error);
    throw error;
  }
}

async function handleHourlyRoutine(app) {
  try {
    
    const result = await app.client.conversations.list({
      token: process.env.SLACK_BOT_TOKEN,
      types: 'public_channel,private_channel',
      exclude_archived: true,
    });

    const botChannels = result.channels.filter(channel => channel.is_member);

   
    for (const channel of botChannels) {
      await app.client.chat.postMessage({
        token: process.env.SLACK_BOT_TOKEN,
        channel: channel.id,
        text: 'This is your hourly routine message!',
      });
    }
  } catch (error) {
    console.error('Error sending hourly routine message:', error);
  }
}

function handleError(error) {
  console.error(error);
}

module.exports = {
  handleMessage,
  handleError,
  handleHourlyRoutine,
};