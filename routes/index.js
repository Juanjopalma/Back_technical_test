var express = require('express');
var router = express.Router();
const indexControllers = require('../controllers/indexControllers');

/* GET users listing. */

// http://localhost:3000/

// endpoint para almacenar los países de la API
router.post('/api/v1/data/countries', indexControllers.postDataCountry);

// endpoint para obtener un país de la bd
router.get('/api/v1/data/country/:country', indexControllers.getDataCountry);

// endpoint para obtener todos los países de la bd
router.get('/api/v1/data/countries', indexControllers.getDataCountries);

// endpoint para actualizar todos los países de la bd
router.put('/api/v1/data/putcountries', indexControllers.putDataCountries);

module.exports = router;
