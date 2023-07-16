const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./users.db',sqlite3.OPEN_READWRITE, (err) => {
  if (err) throw err;
});

db.serialize(() => {
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
        age INTEGER`);
  });

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
  
         return callback(null, this.lastID);
      }
    );
  }
  
  function deleteData(id, callback) {
    db.run(
      `DELETE FROM users WHERE id = ?`,
      [id],
      function (err) {
         if (err) {
            console.error(err.message);
            return callback(err);
         }
         return callback(null, this.changes);
      }
    );
  }
  
  function getById(id, callback) {
    db.get(
      `SELECT * FROM users WHERE id = ?`,
      [id],
      function (err, row) {
        if (err) {
          console.error(err.message);
          return callback(err);
        }
        return callback(null, row);
      }
    );
  }
  
  
  module.exports = {
    db,
    addData,
    deleteData,
    getById,
  };