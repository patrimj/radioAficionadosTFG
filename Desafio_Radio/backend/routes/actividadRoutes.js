const { Router } = require('express');
const controladorActividad = require('../controllers/actividad.controller');
const router = Router();
const { check } = require('express-validator');
const {validarJWT} = require("../middleware/validarJWT");
const {esOperador} = require("../middleware/validarRoles");
const { validarArchivoSubir } = require('../middleware/validar-archivo');

// ------------------------------------------------------  PANTALLA PERFIL ------------------------------------------------------ \\

// VER ACTIVIDADES DE UN UNICO CONTACTO (AFICIONADO)

router.get('/actividades/unicoContacto/aficionado', [validarJWT], controladorActividad.getActividadesUnicoContactoAficionado);

// VER ACTIVIDADES DE VARIOS CONTACTOS Y CONCURSO (AFICIONADO)

router.get('/actividades/variosContactos/aficionado', [validarJWT], controladorActividad.getActividadesVariosContactosAficionado);

// VER ACTIVIDADES DE UN CONCURSO (MODAL) (AFICIONADO) *** Pantalla concurso ***

router.get('/actividades/:id_concurso', [validarJWT], controladorActividad.getActividadesPorConcurso);

// MOSTRAR TOTAL ACTIVIDADES EN LAS QUE HA PARTICIPADO UN USUARIO (AFICIONADO)

router.get('/actividades/total', [validarJWT], controladorActividad.getTotalActividadesParticipado);

// ------------------------------------------------------ PANTALLA ACTIVIDADES ------------------------------------------------------ \\

// VER TODAS LAS ACTIVIDADES Y SUS CONCURSOS (SI TIENE) (AFICIONADO)

router.get('/actividades', [validarJWT], controladorActividad.mostrarActividades);

// VER TODAS LAS ACTIVIDADES TERMINADAS (AFICIONADO)

router.get('/actividades/terminadas', [validarJWT], controladorActividad.mostrarActividadesTerminadas);

//VER TODAS LAS ACTIVIDADES PENDIENTES (AFICIONADO)

router.get('/actividades/pendientes', [validarJWT], controladorActividad.mostrarActividadesPendientes);

// TERMINAR ACTIVIDAD (BOTÓN) (OPERADOR)

router.put('/actividad/terminar/:id', [validarJWT, esOperador], controladorActividad.terminarActividad);

// BUSCAR ACTIVIDAD POR ID (AFICIONADO)

router.get('/actividad/:id', [validarJWT], controladorActividad.mostrarActividadId);

// BUSCAR ACTIVIDAD POR NOMBRE (AFICIONADO)

router.get('/actividad/:nombre', [validarJWT], controladorActividad.mostrarActividadNombre);

// VER PARTICIPANTES ACTIVIDAD (AFICIONADO)

router.get('/participantes/:id', [validarJWT], controladorActividad.verParticipantesActividad);

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
        check('completada', 'El estado de la actividad es obligatorio').not().isEmpty(),
    ], [validarJWT, esOperador], controladorActividad.altaActividadUnicoContacto);

// ALTA ACTIVIDAD DE VARIOS CONTACTOS (OPERADOR)

router.post('/actividad/alta/variosContactos', validarArchivoSubir,
    [
        check('nombre', 'El nombre de la actividad es obligatorio').not().isEmpty(),
        check('url_foto', 'La foto de la actividad es obligatoria').not().isEmpty(),
        check('localizacion', 'La localización de la actividad es obligatoria').not().isEmpty(),
        check('fecha', 'La fecha de la actividad es obligatoria').not().isEmpty(),
        check('frecuencia', 'La frecuencia de la actividad es obligatoria').not().isEmpty(),
        check('banda', 'La banda de la actividad es obligatoria').not().isEmpty(),
        check('completada', 'El estado de la actividad es obligatorio').not().isEmpty(),
    ], [validarJWT, esOperador], controladorActividad.altaActividadVariosContactos);

module.exports = router;