var express = require('express');
var router = express.Router();
const ctrlMain = require('../controllers/main'); // Import the main controller

/* GET home page. */
router.get('/', ctrlMain.index); // Use the index function from main controller

module.exports = router;
