const express = require('express');
const dbController = require('../controllers/databaseController');

const router = express.Router();

router.post('/add', dbController.addData);
router.delete('/delete/:id', dbController.deleteData);
router.get('/get/:id', dbController.getById);

module.exports = router;