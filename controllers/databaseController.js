const {db,addData,deleteData,getById} = require('../models/userModel');

exports.addData = (req, res) => {
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
   (err, data) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      return res.status(200).json({ id: data });
   }
 );
};

exports.deleteData = (req, res) => {
 const id = req.params.id;

 deleteData(id, (err, data) => {
   if (err) {
     return res.status(500).json({ error: err.message });
   }
   return res.status(200).json({ rowsAffected: data });
 });
};

exports.getById = (req, res) => {
 const id = req.params.id;

 getById(id, (err, data) => {
   if (err) {
     return res.status(500).json({ error: err.message });
   }
   return res.status(200).json(data);
 });
};

 exports.executeQuery = (sqlQuery, callback) => {
  db.all(sqlQuery, (err, rows) => {
    if (err) {
      console.error(err.message);
      return callback(err);
    }
    return callback(null, rows);
  });
};