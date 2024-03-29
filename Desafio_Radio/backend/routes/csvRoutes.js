const express = require('express');
const router = express.Router();
const {validarCSV, procesarCSV} = require('../controllers/csv.controller');

router.post('/procesar-csv', validarCSV, procesarCSV);

module.exports = router;