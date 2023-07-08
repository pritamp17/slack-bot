const express = require('express');
const app = express();
const addData = require('./controllers/databaseController')
// middleware and routes
app.use(express.json());

// Define the route for storing data
app.post('/api/data', (req, res) => {
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

  // Call the addData function from the databaseController
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

      // Return the inserted data ID
      return res.json({ id: dataId });
   }
  );
});

module.exports = app;
