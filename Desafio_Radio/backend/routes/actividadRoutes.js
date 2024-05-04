const { Router } = require('express');
const controladorActividad = require('../controllers/actividad.controller');
const router = Router();
const { check } = require('express-validator');
const {validarJWT} = require("../middleware/validarJWT");
const {esAdmin} = require("../middleware/validarRoles");
const {esOperador} = require("../middleware/validarRoles");
const {validarCampos} = require("../middleware/validar-campos");
const { validarArchivoSubir } = require('../middleware/validar-archivo');

// ------------------------------------------------------  PANTALLA PERFIL ------------------------------------------------------ \\

// VER ACTIVIDADES DE UN UNICO CONTACTO (AFICIONADO)

router.get('/actividades/unicoContacto/aficionado', [validarJWT], controladorActividad.getActividadesUnicoContactoAficionado);

// VER ACTIVIDADES DE VARIOS CONTACTOS Y CONCURSO (AFICIONADO)

router.get('/actividades/variosContactos/aficionado', [validarJWT], controladorActividad.getActividadesVariosContactosAficionado);

// VER ACTIVIDADES DE UN CONCURSO (MODAL) (AFICIONADO)

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

router.post('/actividad/alta/unicoContacto', [validarArchivoSubir, validarJWT, esOperador], controladorActividad.altaActividadUnicoContacto);

// ALTA ACTIVIDAD DE VARIOS CONTACTOS (OPERADOR)

router.post('/actividad/alta/variosContactos', [validarArchivoSubir, validarJWT, esOperador], controladorActividad.altaActividadVariosContactos);


    







// ---------------------------- RUTAS ADMINISTRADOR ----------------------------

// VER TODAS LAS ACTIVIDADES PRINCIPALES
router.get('/actividades/principales', [midsJWT.validarJWT], controladorActividad.mostrarActividadesPrincipales);

// VER TODAS LAS ACTIVIDADES SECUNDARIAS
router.get('/actividades/secundarias', [midsJWT.validarJWT], controladorActividad.mostrarActividadesSecundarias);

// VER TODAS LAS ACTIVIDADES SECUNDARIAS TERMINADAS
router.get('/actividades/secundarias/terminadas', [midsJWT.validarJWT], controladorActividad.mostrarActividadesSecundariasTerminadas);

// VER TODAS LAS ACTIVIDADES SECUNDARIAS NO TERMINADAS
router.get('/actividades/secundarias/pendientes', [midsJWT.validarJWT], controladorActividad.mostrarActividadesSecundariasPendientes);

// VER TODAS LAS ACTIVIDADES PRINCIPALES TERMINADAS
router.get('/actividades/principales/terminadas', [midsJWT.validarJWT], controladorActividad.mostrarActividadesPrincipalTerminadas);

// VER TODAS LAS ACTIVIDADES PRINCIPALES NO TERMINADAS
router.get('/actividades/principales/pendientes', [midsJWT.validarJWT], controladorActividad.mostrarActividadesPrincipalPendientes);

// ALTA ACTIVIDAD PRINCIPAL
router.post('/actividad/principal/alta', validarArchivoSubir,
    [
        check('nombre', 'el nombre de la actividad prinicpal debe ser obligatorio').not().isEmpty(),
        check('descripcion', 'el nombre de la actividad prinicpal debe ser obligatorio').not().isEmpty(),
        check('solucion', 'la solución de la actividad principal debe ser obligatoria').not().isEmpty(),
    ], [midsJWT.validarJWT, midsRoles.esAdmin], controladorActividad.altaActividadPrincipal);

// MODIFICAR ACTIVIDAD PRINCIPAL
router.put('/actividad/principal/modificar/:id', validarArchivoSubir,
    [
        check('nombre', 'el nombre de la actividad prinicpal debe ser obligatorio').not().isEmpty(),
        check('descripcion', 'el nombre de la actividad prinicpal debe ser obligatorio').not().isEmpty(),
        check('solucion', 'la solución de la actividad principal debe ser obligatoria').not().isEmpty(),
    ], [midsJWT.validarJWT, midsRoles.esAdmin], controladorActividad.modificarActividadPrincipal);

// BAJA ACTIVIDAD PRINCIPAL
router.delete('/actividad/principal/baja/:id', [midsJWT.validarJWT, midsRoles.esAdmin], controladorActividad.bajaActividadPrincipal);

// VER ACTIVIDAD PRINICPAL POR ID
router.get('/actividad/principal/:id', [midsJWT.validarJWT], controladorActividad.mostrarActividadPrincipalId);

// VER ACTIVIDAD SECUNDARIA POR ID
router.get('/actividad/secundaria/:id', [midsJWT.validarJWT], controladorActividad.mostrarActividadSecundariaPorId);

// VER PARTICIPANTES ACTIVIDADES PRINCIPALES
router.get('/participantes/principales', [midsJWT.validarJWT], controladorActividad.participantesActividadesPrincipales);

// VER PARTICIPANTES ACTIVIDADES SECUNDARIAS
router.get('/participantes/secundarias', [midsJWT.validarJWT], controladorActividad.participantes);

// ---------------------------- RUTAS OPERADOR ----------------------------

// INSERTAR CONTACTO LETRA

router.post('/contacto/letra', [validarJWT, esAdmin], controladorActividad.crearContacto);

// INSERTAR CONTACTO PUNTOS
router.post('/contacto/puntos', [validarJWT, esAdmin], controladorActividad.crearContactoPuntos);

// INSERTAR CONTACTO GENERICO
router.post('/contacto/generico', [validarJWT, esAdmin], controladorActividad.crearContactoGenerico);

// VER CONTACTO CONCRETO

router.get('/contacto', [
    check('idUsuario', 'El ID del usuario debe ser obligatorio').not().isEmpty(),
    check('idUsuario', 'El ID del usuario debe ser un numero').isNumeric,
    check('idActividad', 'El ID de la actividad debe ser obligatorio').not().isEmpty(),
    check('idActividad', 'El ID de la actividad debe ser un numero').isNumeric,
    check('premio', 'El ID de la actividad debe ser un numero').not().isEmpty(),
    validarCampos,
    validarJWT,
    esAdmin,
], controladorActividad.buscarContacto);

// VER CONTACTOS ACT. SECUNDARIA

router.get('/contactos/:id', controladorActividad.buscarContactosSecundaria);

// VER SI UN USUARIO TIENE TODOS LOS CONTACTOS EN UN CONCURSO

router.post('/contactos/completo', controladorActividad.comprobarSiContactosCompleto);

// VER PUNTUACION RESTANTE DE UN USUARIO EN UNA SECUNDARIA

router.post('/contactos/restantes/puntuacion/', controladorActividad.verPuntosRestantes);

// VER ACTIVIDADES SECUNDARIAS

router.get('/secundarias', [midsJWT.validarJWT, midsRoles.esOperador], controladorActividad.mostrarActSecundarias);

// VER UNA ACTIVIDAD SECUNDARIA EN CONCRETO

router.get('/secundarias/:id',[midsJWT.validarJWT, midsRoles.esOperador], controladorActividad.mostrarActSecundaria);

// MOSTRAR ACTIVIDADES SECUNDARIAS QUE NO PERTENECEN A UNA PRIMARIA

router.get('/actividades/secundarias/sin-principal',[midsJWT.validarJWT, midsRoles.esOperador],controladorActividad.mostrarActSecundariasSinPrincipal);

// MOSTRAR ACTIVIDADES SECUNDARIAS QUE PERTENECEN A UNA PRIMARIA

router.get('/actividades/secundarias/con-principal',[midsJWT.validarJWT, midsRoles.esOperador], controladorActividad.mostrarActSecundariasConPrincipal);

// MOSTRAR ACTIVIDADES SECUNDARIAS QUE PERTENECEN A UNA PRIMARIA EN PARTICULAR

router.get('/actividades/secundarias/con-principal/:id', [midsJWT.validarJWT, midsRoles.esOperador],controladorActividad.mostrarActSecundariasPorIdPrincipal);

// TERMINAR ACTIVIDADES SECUNDARIAS

router.put('/secundarias/terminar/:id', [midsJWT.validarJWT, midsRoles.esOperador], controladorActividad.terminarActSecundaria);

// DAR DE BAJA UNA ACTIVIDAD SECUNDARIA (ELIMINAR)

router.put('/actividades/secundarias/baja/:id', [midsJWT.validarJWT, midsRoles.esOperador], controladorActividad.eliminarActSecundaria);

// MODIFICAR ACTIVIDAD SECUNDARIA

router.put('/secundarias/modificar/:id', [
    check('id_operador', 'El ID del operador debe ser un numero').isNumeric,
    check('id_modo', 'El ID del modo debe ser un numero').isNumeric,
    check('id_modalidad', 'El ID de la modalidad debe ser un numero').isNumeric,
    midsJWT.validarJWT, midsRoles.esOperador], controladorActividad.modificarActSecundaria)

// ALTA ACTIVIDAD SECUNDARIA

router.post('/secundarias', [
    // check('id_operador', 'El ID del operador es obligatorio').not().isEmpty(),
    // check('id_operador', 'El ID del operador debe ser un numero').isNumeric,
    // check('id_modo', 'El ID del modo es obligatorio').not().isEmpty(),
    // check('id_modo', 'El ID del modo debe ser un numero').isNumeric,
    // check('id_modalidad', 'El ID de la modalidad es obligatorio').not().isEmpty(),
    // check('id_modalidad', 'El ID de la modalidad debe ser un numero').isNumeric,
    // check('nombre', 'El nombre de la actividad es obligatorio').not().isEmpty(),
    // check('localizacion', 'La localización de la actividad es obligatoria').not().isEmpty(),
    // check('fecha', 'La fecha de la actividad es obligatoria').not().isEmpty(),
    // check('frecuencia', 'La frecuencia de la actividad es obligatoria').not().isEmpty(),
    // check('banda', 'La banda de la actividad es obligatoria').not().isEmpty(),
    // check('completada', 'El estado de la actividad es obligatorio').not().isEmpty(),
    // validarCampos,
    midsJWT.validarJWT, midsRoles.esOperador], controladorActividad.altaActSecundaria)
    
// VER MODALIDADES

router.get('/modalidades', [midsJWT.validarJWT], controladorActividad.mostrarModalidades);

// VER PROGRESO ACT. SECUNDARIA

router.post('/contactos/restantes/letras', [midsJWT.validarJWT], controladorActividad.mostrarLetrasRestantes);

 // VER ACT. SECUNDARIAS USUARIO

router.get('/participante/secundarias/:id', [
    // check('idUsuario', 'El ID del usuario debe ser obligatorio').not().isEmpty(),
    // check('idUsuario', 'El ID del usuario debe ser un numero').isNumeric,
    // check('idPrincipal', 'El ID del concurso debe ser obligatorio').not().isEmpty(),
    // check('idPrincipal', 'El ID del concurso debe ser un numero').isNumeric,
    validarCampos,
    midsJWT.validarJWT,
    midsRoles.esAdmin
], controladorActividad.verSecundariasUsuario);

// VER USUARIOS ACT. SECUNDARIA

router.get('/secundarias/participantes/:id', [midsJWT.validarJWT], controladorActividad.mostrarUsuariosSecundaria);

// VER RESTANTES ACT. SECUNDARIA

router.post('/restantes', controladorActividad.mostrarLetrasRestantes);

// VER PRINCIPAL ACT. SECUNDARIA

router.post('/actividades/secundarias/principales', controladorActividad.mostrarPrincipalSecundaria);


module.exports = router;