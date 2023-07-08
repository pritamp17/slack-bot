const { App, ExpressReceiver } = require('@slack/bolt');
const routes = require('./routes');

// Create an instance of the Bolt app
const receiver = new ExpressReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  receiver,
});

// Set up routes
routes(app);

// Start the Bolt app
(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('⚡️ Bolt app is running!');
})();

// Handle shutdown gracefully
process.on('SIGTERM', async () => {
  await app.stop();
  process.exit(0);
});