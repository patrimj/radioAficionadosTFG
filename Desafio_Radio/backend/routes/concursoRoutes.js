const { Router } = require('express');
const controladorConcursos = require('../controllers/concursos.controller');
const router = Router();
const { check } = require('express-validator');
const {validarJWT} = require("../middleware/validarJWT");
const {esAdmin} = require("../middleware/validarRoles");
const {esOperador} = require("../middleware/validarRoles");
const {validarCampos} = require("../middleware/validar-campos");
const { validarArchivoSubir } = require('../middleware/validar-archivo');

// ------------------------------------------------------  PANTALLA PERFIL ------------------------------------------------------ \\

// CONCURSOS DE UN USUARIO (AFICIONADO)

router.get('/concursos/aficionado', [validarJWT], controladorConcursos.getConcursosAficionado);

// ------------------------------------------------------  PANTALLA CONCURSOS ------------------------------------------------------ \\

// MUESTRA TODOS LOS CONCURSOS 

router.get('/concursos', [validarJWT], controladorConcursos.mostrarConcursos); 

// MUESTRA TODS LOS CONCURSOS TERMINADOS

router.get('/concursos/terminados', [validarJWT], controladorConcursos.mostrarConcursosTerminados); 

// MUESTRA TODS LOS CONCURSOS PENDIENTES

router.get('/concursos/pendientes', [validarJWT], controladorConcursos.mostrarConcursosPendientes); 

//ALTA CONCURSO 

