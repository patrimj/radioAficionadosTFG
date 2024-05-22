const { Router } = require('express');
const controladorPerfil = require('../controllers/perfil.controller');
const router = Router();
const { check } = require('express-validator');
const {validarJWT} = require("../middleware/validarJWT");
const {esOperador} = require("../middleware/validarRoles");
const { validarArchivoSubir } = require('../middleware/validar-archivo');
const {validarCampos} = require("../middleware/validar-campos");

// ------------------------------------------------------ PANTALLA PERFIL ------------------------------------------------------ \\

// VER ACTIVIDADES DE UN UNICO CONTACTO (AFICIONADO)

router.get('/actividades/unicoContacto/aficionado', [validarJWT], controladorPerfil.getActividadesUnicoContactoAficionado);

// VER ACTIVIDADES DE VARIOS CONTACTOS Y CONCURSO (AFICIONADO)

router.get('/actividades/variosContactos/aficionado', [validarJWT], controladorPerfil.getActividadesVariosContactosAficionado);

// VER ACTIVIDADES DE UN CONCURSO (MODAL) (AFICIONADO) *** Pantalla concurso ***

router.get('/perfil/actividades/:id_principal', [validarJWT], controladorPerfil.getActividadesPorConcurso);

// MOSTRAR TOTAL ACTIVIDADES EN LAS QUE HA PARTICIPADO UN USUARIO (AFICIONADO)

router.get('/actividades/total', [validarJWT], controladorPerfil.getTotalActividadesParticipado);

// CONCURSOS DE UN USUARIO (AFICIONADO)

router.get('/concursos/aficionado', [validarJWT], controladorPerfil.getConcursosAficionado);

// MOSTRAR EL TOTAL DE CONCURSOS EN LOS QUE HA PARTICIPADO UN USUARIO (AFICIONADO)

router.get('/concursos/total', [validarJWT], controladorPerfil.getTotalConcursosParticipado);

// MOSTRAR PERFIL

router.get('/perfil', [validarJWT], controladorPerfil.mostrarPerfil);

// MODIFICAR PERFIL

router.put('/usuario/perfil/:id', validarArchivoSubir,
    [
        check('id', 'El id del usuario es obligatorio').not().isEmpty(),
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('apellido_uno', 'El primer apellido es obligatorio').not().isEmpty(),
        check('apellido_dos', 'El segundo apellido es obligatorio').not().isEmpty(),
        check('id_examen', 'El id del examen es obligatorio').not().isEmpty(),
    ], 
    validarCampos, 
    controladorPerfil.modificarPerfil
);

// CAMBIAR CONTRASEÑA

router.put('/cambiar-password',
    [
        check('email', 'El correo electrónico es obligatorio').isEmail(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
    ], 
    validarCampos, 
    controladorPerfil.cambiarPassword
);

//CREAR DIPLOMA DE LA ACTIVIDAD 

router.post('/diploma', [validarJWT], controladorPerfil.crearDiploma);

// CREAR Y PEDIR DIPLOMA DE ACTIVIDAD 

router.post('/diploma/enviar', [validarJWT], controladorPerfil.generarYEnviarDiploma);


module.exports = router;