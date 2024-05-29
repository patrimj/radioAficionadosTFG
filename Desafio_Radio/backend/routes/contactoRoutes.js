const { Router } = require('express');
const controladorContacto = require('../controllers/contacto.controller');
const router = Router();
const { check } = require('express-validator');
const {validarJWT} = require("../middleware/validarJWT");
const {esOperador} = require("../middleware/validarRoles");
const {validarCampos} = require("../middleware/validar-campos");

// ------------------------------------------------------  PANTALLA CONTACTO ------------------------------------------------------ \\ 

// REGISTRAR CONTACTO (Botón final)

router.post('/contacto/registrar',
    [
        check('id_usuario', 'El id del usuario es obligatorio').not().isEmpty(),
        check('id_secundaria', 'El id de la actividad secundaria es obligatorio').not().isEmpty(),
        check('id_principal', 'El id de la actividad principal es opcional').optional(),
    ], validarCampos, [validarJWT], controladorContacto.registrarContacto);

// LISTAR USUARIOS 

router.get('/contacto/usuarios', [validarJWT, esOperador], controladorContacto.getUsuarios);

// MOSTRAR TODOS LOS CONTACTOS DETALLADOS

router.get('/contacto/contactos', [validarJWT, esOperador], controladorContacto.getContactosConDetalles);

// ************************** REGISTRAR USUARIO EN UNA ACTIVIDAD DE VARIOS CONTACTOS ************************** //

// LISTAR CONCURSOS

router.get('/contacto/concursos', [validarJWT, esOperador], controladorContacto.getConcursosContacto);

// MOSTRAR SOLUCIÓN CONCURSO

router.get('/contacto/concurso/solucion/:id_principal', [validarJWT, esOperador], controladorContacto.getSolucionConcurso);

// MOSTRAR ACTIVIDADES QUE PERTENECEN A UN CONCURSO

router.get('/contacto/concurso/actividades/:id_principal', [validarJWT, esOperador], controladorContacto.getActividadesVariosContactos);

// MOSTRAR PREMIO DE LA ACTIVIDAD

router.get('/contacto/actividad/premio/:id_secundaria', [validarJWT, esOperador], controladorContacto.getPremioActividad);

// MOSTRAR LOS PREMIOS DE UN USUARIO EN UN CONCURSO

router.get('/contacto/usuario/premios/:id_usuario/:id_principal', [validarJWT], controladorContacto.getPremiosUsuarioConcurso);

// ************************** REGISTRAR USUARIO EN UNA ACTIVIDAD DE VARIOS CONTACTOS ************************** //

// MOSTRAR TODAS LAS ACTIVIDADES

router.get('/contacto/actividades', [validarJWT], controladorContacto.getActividadesContacto);

// MOSTRAR LA MODALIDAD DE LA ACTIVIDAD

router.get('/contacto/actividad/modalidad/:id_secundaria', [validarJWT], controladorContacto.getModalidadActividad);

module.exports = router;

