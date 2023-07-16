const express = require('express');
const bodyParser = require('body-parser');
const { App, ExpressReceiver } = require('@slack/bolt');
const slackapp = require('./routes/slackRoutes');
const expressRoutes = require('./routes/dbApiRoutes');
require('dotenv').config();

// instance of the Bolt app
const receiver = new ExpressReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  processBeforeResponse: true,
});

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  receiver,
});
slackapp(app);

const expressApp = express();
expressApp.use(express.json());
expressApp(bodyParser.json());
expressApp.use('/user',expressRoutes)


// Start the Bolt app and the Express server
(async () => {
  await app.start(process.env.APP_PORT || 3017);
  console.log(`⚡️ Bolt app is running on port ${process.env.APP_PORT}!`);

  const port = process.env.EXPRESS_SERVER_PORT || 3016;
  expressApp.listen(port, () => {
    console.log(`🚀 Express server is running on port ${port}!`);
  });
})();


process.on('SIGTERM', async () => {
  await app.stop();
  process.exit(0);
});

module.exports = expressApp;
