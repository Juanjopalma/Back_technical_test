var express = require('express');
var router = express.Router();
const indexControllers = require('../controllers/indexControllers');

/* GET users listing. */

// http://localhost:3000/

// endpoint to save the countries in the database
router.post('/api/v1/data/countries', indexControllers.postDataCountry);

// endpoint to get a country from the databse
router.get('/api/v1/data/country/:country', indexControllers.getDataCountry);

// endpoint to get all the countries from the database
router.get('/api/v1/data/countries', indexControllers.getDataCountries);

// endpoint to update the countries from the database
router.put('/api/v1/data/putcountries', indexControllers.putDataCountries);

module.exports = router;
