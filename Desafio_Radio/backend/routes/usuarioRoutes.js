const { Router } = require('express');
const controladorUsuario = require('../controllers/usuario.controller');
const router = Router();
const { check } = require('express-validator');
const { validarArchivoSubir } = require('../middleware/validar-archivo'); // Middleware para validar imagenes
const {validarCampos} = require("../middleware/validar-campos");
const {validarJWT} = require("../middleware/validarJWT");
const {esAdmin} = require("../middleware/validarRoles"); 

// ------------------------------------------------------  PANTALLA LOGIN Y REGISTRO ------------------------------------------------------ \\

// LOGIN

router.post('/login', controladorUsuario.login);

// REGISTRO

router.post('/registro',
    [
        check('email', 'El correo electrónico es obligatorio').isEmail(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('apellido_uno', 'El primer apellido es obligatorio').not().isEmpty(),
        check('apellido_dos', 'El segundo apellido es obligatorio').not().isEmpty(),
        check('url_foto', 'La URL de la foto es obligatoria').not().isEmpty(),
        check('id_examen', 'El id del examen es obligatorio').not().isEmpty(),
    ], 
    validarCampos, 
    controladorUsuario.registro
);

// RECUPERAR CONTRASEÑA

router.post('/usuarios/recuperar', [
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('email', 'El email no tiene un formato correcto').isEmail(),
    validarCampos
], controladorUsuario.recuperarContrasena);

// ------------------------------------------------------  PANTALLA PERFIL ------------------------------------------------------ \\

// MOSTRAR PERFIL

router.get('/perfil', [validarJWT], controladorUsuario.mostrarPerfil);

// MODIFICAR PERFIL

router.put('/usuario/perfil/:id',
    [
        check('id', 'El id del usuario es obligatorio').not().isEmpty(),
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('apellido_uno', 'El primer apellido es obligatorio').not().isEmpty(),
        check('apellido_dos', 'El segundo apellido es obligatorio').not().isEmpty(),
        check('url_foto', 'La URL de la foto es obligatoria').not().isEmpty(),
        check('id_examen', 'El id del examen es obligatorio').not().isEmpty(),
    ], 
    validarCampos, 
    controladorUsuario.modificarPerfil
);

// CAMBIAR CONTRASEÑA

router.put('/cambiar-password',
    [
        check('email', 'El correo electrónico es obligatorio').isEmail(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
    ], 
    validarCampos, 
    controladorUsuario.cambiarPassword
);


// ------------------------------------------------------  PANTALLA GESTIÓN USUARIOS ------------------------------------------------------ \\

// BUSCAR USUARIO POR NOMBRE

router.get('/usuario/buscarNombre/:nombre', [validarJWT, esAdmin], controladorUsuario.buscarUsuario);

// BUSCAR USUARIO POR INDICATIVO

router.get('/usuario/buscarIndicativo/:id_examen', [validarJWT, esAdmin], controladorUsuario.mostrarIdUsuarioPorIndicativo);

// ALTA COMPLETA DE USUARIO

router.post('/usuario/alta/:id_rol',validarArchivoSubir,
    [
        check('nombre', 'El nombre del usuario es obligatorio').not().isEmpty(),
        check('email', 'El correo del usuario no es válido').isEmail(),
        check('apellido_uno', 'El apellido es obligatorio').not().isEmpty(),
        check('apellido_dos', 'El apellido es obligatorio').not().isEmpty(),
        check('id_examen', 'El Identificador es obligatorio').not().isEmpty().isNumeric(),
        check('password', 'La contraseña debe de ser más de 6 letras').isLength({ min: 6 }),
        check('id_rol', 'El rol es obligatorio').optional().isNumeric()
    ], validarCampos, [validarJWT, esAdmin],  controladorUsuario.altaUsuarioCompleto);

// BAJA DE USUARIOS

router.delete('/usuario/baja/:id', [validarJWT, esAdmin],  controladorUsuario.bajaUsuario);

// MODIFICAR USUARIOS

router.put('/usuario/modificar/:id', validarArchivoSubir, validarCampos
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El correo no es válido').isEmail(),
        check('apellido_uno', 'El nombre es obligatorio').not().isEmpty(),
        check('apellido_dos', 'El nombre es obligatorio').not().isEmpty(),
        check('id_examen', 'El Identificador es obligatorio').not().isEmpty(),
        check('password', 'La contraseña debe de ser más de 6 letras').isLength({ min: 6 }),
        check('id_rol', 'El rol es obligatorio').optional().isNumeric()
    ], validarCampos, [validarJWT, esAdmin],  controladorUsuario.modificarUsuario);

// ASIGNAR ROL

router.post('/usuario/asignar/:id_rol/:id_usuario',
    [
        check('id_rol', 'El rol es obligatorio').not().isEmpty().isNumeric(),
        check('id_usuario', 'El usuario es obligatorio').not().isEmpty().isNumeric(),
    ], validarCampos, [validarJWT, esAdmin], controladorUsuario.asignarRol);

// VER UN USUARIO CON DIPLOMA

router.get('/usuario/diploma/:email',[validarJWT, esAdmin], controladorUsuario.mostrarUsuarioConDiploma);

// VER USUARIOS CON DIPLOMA

router.get('/usuarios/diploma', [validarJWT, esAdmin], controladorUsuario.mostrarUsuariosConDiploma);

// VER USUARIOS

router.get('/usuarios', [validarJWT,  esAdmin], controladorUsuario.mostrarUsuarios);

module.exports = router;