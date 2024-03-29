const { Router } = require('express');
const controladorDiplomas = require('../controllers/diploma.controller');
const router = Router();
const midsJWT = require("../middleware/validarJWT"); 

/**
 * @author ElenaRgC
 */
//CREAR DIPLOMA DE LA ACTIVIDAD 
router.post('/diploma', [midsJWT.validarJWT], controladorDiplomas.crearDiploma);

/**
 * @author Patricia
 */
// PEDIR DIPLOMA DE ACTIVIDAD 
router.post('/diploma/enviar', [midsJWT.validarJWT], controladorDiplomas.generarYEnviarDiploma);


module.exports = router;