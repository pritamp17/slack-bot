const express = require('express');
const { App, ExpressReceiver } = require('@slack/bolt');
const {addData} = require('./controllers/databaseController');
const slackapp = require('./routes/index');

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



// route for storing data in sqlite
expressApp.post('/api/data', (req, res) => {
  const {
    android_manufacture,
    android_model,
    android_os_version,
    android_app_version,
    acquisition_campaign,
    acquisition_source,
    city,
    state,
    onboarding_time,
    phone_carrier,
    phone_screen_dpi,
    phone_screen_height,
    phone_screen_width,
    name,
    age
  } = req.body;

  
  addData(
    android_manufacture || '',
    android_model || '',
    android_os_version || '',
    android_app_version || '',
    acquisition_campaign || '',  
    acquisition_source || '',  
    city || '',  
    state || '',  
    onboarding_time || 0,  
   phone_carrier || '',  
   phone_screen_dpi || 0,  
   phone_screen_height || 0,  
   phone_screen_width || 0, 
   name || '', 
   age || 0, 
   (err, dataId) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'An error occurred while saving the data.' });
      }

      
      return res.json({ id: dataId });
   }
  );
});

module.exports = expressApp;
