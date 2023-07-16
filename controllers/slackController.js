const openaiService = require('../services/openaiService');
const databaseController = require('./databaseController');
require('dotenv').config();

async function handleMessage({ event, say }) {
  try {
    const queryText = event.text.toLowerCase();
    let userCount;
    
    if (queryText.includes('how many users')) {
      const sqlQuery = await openaiService.generateSqlQuery(queryText);
      console.log("sql query :", sqlQuery);
      
      if (sqlQuery.includes('COUNT(*)')) {
        const executeQueryPromise = new Promise((resolve, reject) => {
          databaseController.executeQuery(sqlQuery, (err, rows) => {
            if (err) {
              console.error(err);
              reject(err);
              return;
            }
            console.log(rows);
            resolve(rows);
          });
        });
  
        const rows = await executeQueryPromise;
        if (typeof rows === 'undefined') {
          userCount = 0;
        }else{
        userCount = rows[0]['COUNT(*)'];
        }
      } else {
        const executeQueryPromise = new Promise((resolve, reject) => {
          databaseController.executeQuery(sqlQuery, (err, rows) => {
            if (err) {
              console.error(err);
              reject(err);
              return;
            }
            console.log(rows);
            resolve(rows);
          });
        });
  
        const rows = await executeQueryPromise;
        if (typeof rows === 'undefined') {
          userCount = 0;
        } else if (rows[0]['COUNT(*)']) {
          userCount = rows[0]['COUNT(*)'];
        } else if (rows[0].num_users) {
          userCount = rows[0].num_users;
        } else {
          userCount = rows.length;
        }
      }
    } else {
      say("I'm sorry, I couldn't understand your query. Please try again.");
      return;
    }
    
    say(`The number of users is: ${userCount}`);
  } catch (error) {
    console.error('Error resolving in SQLite:', error);
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