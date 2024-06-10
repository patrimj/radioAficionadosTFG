const { validationResult } = require('express-validator');

/***********************************************************************
 * Nombre Middleware: validarCampos                                    *
 * Descripción: Middleware que valida los campos de una petición       *
 **********************************************************************/

const validarCampos = (req, res, next) => {
    const errors = validationResult(req);

    console.log(errors)

    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    next();
}

module.exports = {
    validarCampos
}
