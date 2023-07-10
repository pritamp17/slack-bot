const sqlite3 = require('sqlite3').verbose();
// Initialize SQLite database
const db = new sqlite3.Database('./users.db',sqlite3.OPEN_READWRITE, (err) => {
  if (err) throw err;
});

// Create a table if it doesn't exist
db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  android_manufacture TEXT,
  android_model TEXT,
  android_os_version TEXT,
  android_app_version TEXT,
  acquisition_campaign TEXT,
  acquisition_source TEXT,
  city TEXT,
  state TEXT,
  onboarding_time INTEGER,
  phone_carrier TEXT,
  phone_screen_dpi INTEGER,
  phone_screen_height INTEGER,
  phone_screen_width INTEGER, 
  name TEXT, 
  age INTEGER
)`);

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
 // Insert the data into the database
 db.run(
    `INSERT INTO data (
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
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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