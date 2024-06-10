const jwt = require('jsonwebtoken')

/***********************************************************************
 * Nombre: generarJWT                                                  *
 * Descripción: Función que genera un token JWT                        *
 **********************************************************************/

const generarJWT = (usuario) => {
    return jwt.sign({ usuario: usuario }, process.env.SECRETORPRIVATEKEY, {
        expiresIn: '999y'
    });
}

module.exports = {
    generarJWT
}