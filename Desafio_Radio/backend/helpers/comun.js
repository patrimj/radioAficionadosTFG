const {debug} = require("nodemon/lib/utils");
/**
 * @return {Number} Numero aleatorio entre `min` y `max`.
 * @author JuanNavarrete
 */
const aleatorio = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}

const generarCodigoExamen = () => {
    return Math.random().toString(36).slice(8).replace(".", "");
}

function generarContrasena(caracteres) {
    let contrasena = '';
    const caracteresPermitidos = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$';

    for (let i = 0; i < caracteres; i++) {
        const char = Math.floor(Math.random() * caracteresPermitidos.length);

        contrasena += caracteresPermitidos[char];
    }

    return contrasena;
}

module.exports = {
    aleatorio,
    generarCodigoExamen,
    generarContrasena
}