const { Router } = require('express');
const controladorUsuario = require('../controllers/usuario.controller');
const controladorAuth = require('../controllers/auth.controller');
const router = Router();
const { check } = require('express-validator');

const midsJWT = require("../middleware/validarJWT"); // Middleware para validar el token
const { validarArchivoSubir } = require('../middleware/validar-archivo'); // Middleware para validar imagenes
const midsRoles = require('../middleware/validarRoles');
const {maxPassword, minPassword} = require("../helpers/constantes");
const {validarCampos} = require("../middleware/validar-campos");
const {validarJWT} = require("../middleware/validarJWT");
const {esAdmin} = require("../middleware/validarRoles"); // Middleware para validar los roles

// ---------------------------- RUTAS CUALQUIER USUARIO ----------------------------

// LOGIN

router.post('/login', controladorAuth.login);

// REGISTRO

// NOTICIAS

router.get('/noticias', controladorUsuario.mostrarNoticias);

// ---------------------------- RUTAS ADMINISTRADOR ----------------------------

// ELIMINAR NOTICIAS

router.delete('/noticia/eliminar/:id', [midsJWT.validarJWT,  midsRoles.esAdmin], controladorUsuario.eliminarNoticia);

// MODIFICAR NOTICIAS

router.put('/noticia/modificar/:id',
    [
        check('nombre', 'El nombre de la noticia es obligatorio').not().isEmpty(),
        check('fecha', 'La fecha debe completarse').not().isDate(),
        check('descripcion', 'La descripción de la noticia es obligatoria').not().isEmpty(),
    ], [midsJWT.validarJWT,  midsRoles.esAdmin], controladorUsuario.modificarNoticia);

// CREAR NOTICIAS

router.post('/noticia/crear',
    [
        check('nombre', 'El nombre de la noticia es obligatorio').not().isEmpty(),
        check('fecha', 'La fecha debe completarse').not().isDate(),
        check('descripcion', 'La descripción de la noticia es obligatoria').not().isEmpty(),
    ], [midsJWT.validarJWT,  midsRoles.esAdmin], controladorUsuario.crearNoticia);

// VER UN USUARIO

router.get('/usuario/:id',
    [
        validarJWT,
        esAdmin,
    ], [midsJWT.validarJWT,  midsRoles.esAdmin],
    controladorUsuario.mostrarUsuarioPorId);

// VER UN USUARIO POR EMAIL

router.get('/usuario/email/:email', [midsJWT.validarJWT,  midsRoles.esAdmin],controladorUsuario.mostrarUsuarioPorEmail);

// VER PERFIL

router.get('/usuario/perfil/:id',
    [
        validarJWT
    ],controladorUsuario.verPerfil);

// MODIFICAR PERFIL

router.put('/usuario/perfil/:id', controladorUsuario.modificarPerfil);

// CAMBIAR CONTRASEÑA
router.put('/usuario/contrasena/:id', controladorUsuario.cambiarContrasena);

// VER USUARIOS

router.get('/usuarios',[midsJWT.validarJWT], controladorUsuario.verUsuarios);

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
    ], [midsJWT.validarJWT, midsRoles.esAdmin],  controladorUsuario.altaUsuarioCompleto);

// BAJA DE USUARIOS

router.delete('/usuario/baja/:id', [midsJWT.validarJWT, midsRoles.esAdmin],  controladorUsuario.bajaUsuario);

// MODIFICAR USUARIOS

router.put('/usuario/modificar/:id', validarArchivoSubir,
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El correo no es válido').isEmail(),
        check('apellido_uno', 'El nombre es obligatorio').not().isEmpty(),
        check('apellido_dos', 'El nombre es obligatorio').not().isEmpty(),
        check('id_examen', 'El Identificador es obligatorio').not().isEmpty(),
        check('password', 'La contraseña debe de ser más de 6 letras').isLength({ min: 6 }),
        check('id_rol', 'El rol es obligatorio').optional().isNumeric()
    ],[midsJWT.validarJWT, midsRoles.esAdmin],  controladorUsuario.modificarUsuario);

// ASIGNAR ROL

router.post('/usuario/asignar/:id_rol/:id_usuario',
    [
        check('id_rol', 'El rol es obligatorio').not().isEmpty().isNumeric(),
        check('id_usuario', 'El usuario es obligatorio').not().isEmpty().isNumeric(),
    ], [midsJWT.validarJWT,  midsRoles.esAdmin], controladorUsuario.asignarRol);

// VER UN USUARIO CON DIPLOMA

router.get('/usuario/diploma/:email',[midsJWT.validarJWT,  midsRoles.esAdmin], controladorUsuario.mostrarUsuarioConDiploma);

// VER USUARIOS CON DIPLOMA

router.get('/usuarios/diploma', [midsJWT.validarJWT,  midsRoles.esAdmin], controladorUsuario.mostrarUsuariosConDiploma);

// RECUPERAR CONTRASEÑA

router.post('/usuarios/recuperar', [
        check('email', 'El email es obligatorio').not().isEmpty(),
        check('email', 'El email no tiene un formato correcto').isEmail(),
        validarCampos
], controladorUsuario.recuperarContrasena);

// REGISTRAR USUARIO

router.post('/usuarios/registrar', [
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('email', 'El email no tiene un formato correcto').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('password', 'El email no tiene un tiene una longitud correcta.').isLength({min: 2, max: 24}),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('nombre', 'El nombre debe ser un string').isString(),
    check('nombre', 'El nombre no tiene un formato correcto').isLength({min: 2, max: 15}),
    check('apellido_uno', 'El primer apellido debe ser un string').isString(),
    check('apellido_uno', 'El primer apellido no tiene un formato correcto').isLength({min: 2, max: 25}),
    check('apellido_dos', 'El segundo apellido debe ser un string').isString(),
    check('apellido_dos', 'El segundo apellido no tiene un formato correcto').isLength({min: 2, max: 25}),
], controladorUsuario.registro);

module.exports = router;