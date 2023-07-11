const slackController = require('../controllers/slackController');
const cron = require('node-cron');

module.exports = (app) => {
  

  app.error(slackController.handleError);

  app.event('app_mention', slackController.handleMessage);
  
  cron.schedule('0 * * * *', () => {   
    slackController.handleHourlyRoutine(app);
  });

};

