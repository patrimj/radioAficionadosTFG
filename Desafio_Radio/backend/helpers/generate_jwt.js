const jwt = require('jsonwebtoken')

const generarJWT = (usuario) => {
    return jwt.sign({usuario: usuario}, process.env.SECRETORPRIVATEKEY, {
        expiresIn: '999y'
    });
}

module.exports ={
    generarJWT
}