const { App, ExpressReceiver } = require('@slack/bolt');
const routes = require('./routes');
const server = require('./server');

// Create an instance of the Bolt app
const receiver = new ExpressReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  processBeforeResponse: true, // Important to set this to true for Bolt to work with Express
});

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  receiver,
});

// Set up routes
routes(app);

// Start the Bolt app and the Express server
(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('⚡️ Bolt app is running!');
})();

server.listen(process.env.PORT || 3000, () => {
  console.log('🚀 Express server is running!');
});

// Handle shutdown gracefully
process.on('SIGTERM', async () => {
  await app.stop();
  process.exit(0);
});