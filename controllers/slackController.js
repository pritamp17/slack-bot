const openaiService = require('../services/openaiService');
const databaseController = require('./databaseController');

async function handleMessage({ message, say }) {
  try {
    const queryText = message.text.toLowerCase();

    if (queryText.includes('how many users from') && queryText.includes('use')) {
      const location = queryText.split('from')[1].split('use')[0].trim();
      const phoneBrand = queryText.split('use')[1].trim();

      const sqlQuery = await openaiService.generateSqlQuery(queryText);

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
    console.error(error);
  }
}

function handleError(error) {
  console.error(error);
}

module.exports = {
  handleMessage,
  handleError,
};