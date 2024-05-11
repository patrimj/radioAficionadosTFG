const { Router } = require('express');
const controladorConcursos = require('../controllers/concursos.controller');
const controladorActividad = require('../controllers/actividad.controller');
const router = Router();
const { check } = require('express-validator');
const {validarJWT} = require("../middleware/validarJWT");
const {esAdmin} = require("../middleware/validarRoles");
const { validarArchivoSubir } = require('../middleware/validar-archivo');
const {validarCampos} = require("../middleware/validar-campos");

// ------------------------------------------------------  PANTALLA CONCURSOS ------------------------------------------------------ \\

// MUESTRA TODOS LOS CONCURSOS 

router.get('/concursos', [validarJWT], controladorConcursos.mostrarConcursos); 

// MUESTRA TODS LOS CONCURSOS TERMINADOS

router.get('/concursos/terminados', [validarJWT], controladorConcursos.mostrarConcursosTerminados); 

// MUESTRA TODS LOS CONCURSOS PENDIENTES

router.get('/concursos/pendientes', [validarJWT], controladorConcursos.mostrarConcursosPendientes); 

//ALTA CONCURSO 

router.post('/concurso/alta', validarArchivoSubir,
    [
        check('nombre', 'El nombre del concurso es obligatorio').not().isEmpty(),
        check('descripcion', 'La descripción del concurso es obligatoria').not().isEmpty(),
        check('completada', 'El estado del concurso es obligatorio').not().isEmpty(),
        check('solucion', 'La solución del concurso es obligatoria').not().isEmpty(),
        check('url_foto', 'La foto del concurso es obligatoria').not().isEmpty(),
    ], validarCampos, [validarJWT, esAdmin], controladorConcursos.altaConcurso);

// MODIFICAR CONCURSO

router.put('/concurso/modificar/:id', validarArchivoSubir,
    [
        check('nombre', 'El nombre del concurso es obligatorio').not().isEmpty(),
        check('descripcion', 'La descripción del concurso es obligatoria').not().isEmpty(),
        check('completada', 'El estado del concurso es obligatorio').not().isEmpty(),
        check('solucion', 'La solución del concurso es obligatoria').not().isEmpty(),
        check('url_foto', 'La foto del concurso es obligatoria').not().isEmpty(),
    ], validarCampos, [validarJWT, esAdmin], controladorConcursos.modificarConcurso);

// BAJA CONCURSO

router.delete('/concurso/baja/:id', [validarJWT, esAdmin], controladorConcursos.bajaConcurso);

//TERMINAR CONCURSO

router.put('/concurso/terminar/:id', [validarJWT, esAdmin], controladorConcursos.terminarConcurso);

// MOSTRAR CONCURSO ID

router.get('/concurso/buscarId/:id', [validarJWT], controladorConcursos.mostrarConcursoId);

// MOSTRAR CONCURSO NOMBRE

router.get('/concurso/buscarNombre/:nombre', [validarJWT], controladorConcursos.mostrarConcursoNombre);

// VER ACTIVIDADES DE UN CONCURSO (MODAL) (AFICIONADO) *** Pantalla Perfil (actividadRoutes) ***

router.get('/concurso/actividades/:id_principal', [validarJWT], controladorConcursos.getActividadesPorConcurso);

// VER PARTICIPANTES DE UN CONCURSO (MODAL) (AFICIONADO) 

router.get('/participantes/:id_principal', [validarJWT], controladorConcursos.verParticipantesConcurso);

module.exports = router;