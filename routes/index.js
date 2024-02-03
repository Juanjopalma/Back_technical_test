var express = require('express');
var router = express.Router();
const indexControllers = require('../controllers/indexControllers');

/* GET users listing. */

// http://localhost:3000/api/v1/data/country

// endpoint para obtener los datos de la API
router.get('/api/v1/data/country', indexControllers.getDataCountryofAPI);

// endpoint para almacenar y actualizar los datos de la API
router.post('/api/v1/data/country', indexControllers.postDataCountry);

// endpoint para obtener de la bd los datos de la API
router.get('/api/v1/data/country', indexControllers.getDataOfDataBase);

module.exports = router;
