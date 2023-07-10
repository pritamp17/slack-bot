const slackController = require('../controllers/slackController');

module.exports = (app) => {
  

  app.error(slackController.handleError);

  app.event('app_mention', slackController.handleMessage);
  
  // Command handler for sending hourly routine messages
  app.command('/hourly-routine', slackController.handleHourlyRoutine);

  app.event('url_verification', async ({ event, say }) => {
    console.log(event.type);
    return event.challenge;
  });
};

