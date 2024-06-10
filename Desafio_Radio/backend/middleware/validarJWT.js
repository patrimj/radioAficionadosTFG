const jwt = require('jsonwebtoken');
const { response, request } = require('express')

/***********************************************************************
 * Nombre Middleware: validarJWT                                       *
 * Descripción: Middleware que valida un token JWT                     *
 **********************************************************************/

const validarJWT = (req, res = response, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({ 'msg': 'No hay token en la petición.' });
    }

    try {
        const { usuario } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        req.usuario = usuario;

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ 'msg': 'Token no válido.' });
    }
}

module.exports = {
    validarJWT
}