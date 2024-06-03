const { Router } = require('express');
const controladorInicio = require('../controllers/inicio.controller');
const router = Router();
const { check } = require('express-validator');
const {validarCampos} = require("../middleware/validar-campos");
const {validarJWT} = require("../middleware/validarJWT");
const {esAdmin} = require("../middleware/validarRoles"); // Middleware para validar los roles

// ------------------------------------------------------  PANTALLA CONTACTO ------------------------------------------------------ \\ 

// MOSTRAR NOTICIAS

router.get('/noticias', controladorInicio.mostrarNoticias);

// ELIMINAR NOTICIAS

router.delete('/noticia/eliminar/:id', [validarJWT, esAdmin], controladorInicio.eliminarNoticia);

// MODIFICAR NOTICIAS

router.put('/noticia/modificar/:id',
    [
        check('nombre', 'El nombre de la noticia es obligatorio').not().isEmpty(),
        check('fecha', 'La fecha debe completarse').not().isDate(),
        check('descripcion', 'La descripción de la noticia es obligatoria').not().isEmpty(),
    ], validarCampos, [validarJWT,  esAdmin], controladorInicio.modificarNoticia);

// CREAR NOTICIAS

router.post('/noticia/crear',
    [
        check('nombre', 'El nombre de la noticia es obligatorio').not().isEmpty(),
        check('fecha', 'La fecha debe completarse').isDate(),
        check('descripcion', 'La descripción de la noticia es obligatoria').not().isEmpty(),
    ], validarCampos, [validarJWT,  esAdmin], controladorInicio.crearNoticia);

// MOSTRAR ADMIN (Sección Sobre Nosotros)

router.get('/administradores', controladorInicio.mostrarAdmin);

// MOSTRAR OPERADORES

router.get('/operadores', controladorInicio.mostrarOperadores);

module.exports = router;