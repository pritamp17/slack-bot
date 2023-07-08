const sqlite3 = require('sqlite3').verbose();

// Initialize SQLite database
const db = new sqlite3.Database('slackbot.db');

function executeQuery(sqlQuery, callback) {
  db.get(sqlQuery, callback);
}

module.exports = {
  executeQuery,
};