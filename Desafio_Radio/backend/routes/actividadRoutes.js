const { Router } = require('express');
const controladorActividad = require('../controllers/actividad.controller');
const router = Router();
const { check } = require('express-validator');
const {validarJWT} = require("../middleware/validarJWT");
const {esOperador} = require("../middleware/validarRoles");
const { validarArchivoSubir } = require('../middleware/validar-archivo');
const {validarCampos} = require("../middleware/validar-campos");

// ------------------------------------------------------ PANTALLA ACTIVIDADES ------------------------------------------------------ \\

// VER TODAS LAS ACTIVIDADES Y SUS CONCURSOS (SI TIENE) 

router.get('/actividades', controladorActividad.mostrarActividades);

// VER TODAS LAS ACTIVIDADES TERMINADAS

router.get('/actividades/terminadas',  controladorActividad.mostrarActividadesTerminadas);

//VER TODAS LAS ACTIVIDADES PENDIENTES 

router.get('/actividades/pendientes',  controladorActividad.mostrarActividadesPendientes);

// TERMINAR ACTIVIDAD (BOTÓN) (OPERADOR)

router.put('/actividad/terminar/:id', controladorActividad.terminarActividad);

// BUSCAR ACTIVIDAD POR ID (AFICIONADO)

router.get('/actividad/buscarId/:id', controladorActividad.mostrarActividadId);

// BUSCAR ACTIVIDAD POR NOMBRE (AFICIONADO)

router.get('/actividad/buscarNombre/:nombre', controladorActividad.mostrarActividadNombre);

// VER PARTICIPANTES ACTIVIDAD (MODAL) (AFICIONADO)

router.get('/participantes/:id', controladorActividad.verParticipantesActividad);

// ELIMINAR ACTIVIDAD (OPERADOR)

router.delete('/actividad/baja/:id', [validarJWT, esOperador], controladorActividad.eliminarActividad);

// MODIFICAR ACTIVIDAD (OPERADOR)

router.put('/actividad/modificar/:id', [validarJWT, esOperador], controladorActividad.modificarActividad);

// ALTA ACTIVIDAD DE UN UNICO CONTACTO (OPERADOR)

router.post('/actividad/alta/unicoContacto', validarArchivoSubir,
    [
        check('nombre', 'El nombre de la actividad es obligatorio').not().isEmpty(),
        check('localizacion', 'La localización de la actividad es obligatoria').not().isEmpty(),
        check('fecha', 'La fecha de la actividad es obligatoria').not().isEmpty(),
        check('frecuencia', 'La frecuencia de la actividad es obligatoria').not().isEmpty(),
        check('banda', 'La banda de la actividad es obligatoria').not().isEmpty(),
        check('id_modo', 'El modo de la actividad es obligatorio').not().isEmpty(),
        check('id_modalidad', 'La modalidad de la actividad es obligatoria').not().isEmpty(),
    ], validarCampos, [validarJWT, esOperador ], controladorActividad.altaActividadUnicoContacto);

// ALTA ACTIVIDAD DE VARIOS CONTACTOS (OPERADOR)

router.post('/actividad/alta/variosContactos', validarArchivoSubir,
    [
        check('nombre', 'El nombre de la actividad es obligatorio').not().isEmpty(),
        check('localizacion', 'La localización de la actividad es obligatoria').not().isEmpty(),
        check('fecha', 'La fecha de la actividad es obligatoria').not().isEmpty(),
        check('frecuencia', 'La frecuencia de la actividad es obligatoria').not().isEmpty(),
        check('banda', 'La banda de la actividad es obligatoria').not().isEmpty(),
        check('id_modo', 'El modo de la actividad es obligatorio').not().isEmpty(),
        check('id_modalidad', 'La modalidad de la actividad es obligatoria').not().isEmpty(),
        check('premio', 'El premio de la actividad es obligatorio').not().isEmpty(),
        check('id_principal', 'El concurso de la actividad es obligatorio').not().isEmpty(),
    ], validarCampos, [validarJWT, esOperador], controladorActividad.altaActividadVariosContactos);

// MOSTRAR MODALIDADES

router.get('/actividades/modalidades', [validarJWT, esOperador], controladorActividad.getModalidades);

// MOSTRAR MODOS

router.get('/actividades/modos', [validarJWT, esOperador], controladorActividad.getModos);

module.exports = router;