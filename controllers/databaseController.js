const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./users.db',sqlite3.OPEN_READWRITE, (err) => {
  if (err) throw err;
});

// Create a table if it doesn't exist
function addData(
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
  age,  
  callback
) {
  db.run(
    `INSERT INTO users (
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
       phone_screen_dpi ,  
       phone_screen_height ,  
       phone_screen_width ,   
       name ,   
       age   
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
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
      age || 0
    ],
    function (err) {
       if (err) {
          console.error(err.message);
          return callback(err);
       }

       // Return the inserted data ID
       return callback(null, this.lastID);
    }
  );
}

function executeQuery(sqlQuery, callback) {
  db.get(sqlQuery, callback);
}

module.exports = {
  addData,
  executeQuery,
};