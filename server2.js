const express = require('express');
const { App, ExpressReceiver } = require('@slack/bolt');
const addData = require('./controllers/databaseController');
const slackapp = require('./routes/index');

require('dotenv').config();

// Create an instance of the Bolt app
const receiver = new ExpressReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  processBeforeResponse: true, // Important to set this to true for Bolt to work with Express
});

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  receiver,
});

slackapp(app);

// Create an instance of Express app
const expressApp = express();
expressApp.use(express.json());


// Start the Bolt app and the Express server
(async () => {
  await app.start(process.env.APP_PORT || 3017);
  console.log(`⚡️ Bolt app is running on port ${process.env.APP_PORT}!`);

  const port = process.env.EXPRESS_SERVER_PORT || 3016;
  expressApp.listen(port, () => {
    console.log(`🚀 Express server is running on port ${port}!`);
  });
})();


// Handle shutdown gracefully
process.on('SIGTERM', async () => {
  await app.stop();
  process.exit(0);
});

module.exports = expressApp;
