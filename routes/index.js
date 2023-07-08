const slackController = require('../controllers/slackController');

module.exports = (app) => {
  // Listen for incoming messages
  app.message(slackController.handleMessage);

  // Handle unhandled errors
  app.error(slackController.handleError);
};

