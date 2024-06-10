/***********************************************************************
 * Nombre: aleatorio                                                   * 
 * Descripción: Función que genera un número aleatorio entre un rango  *
 **********************************************************************/              

const aleatorio = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}

/***********************************************************************
 * Nombre: generarCodigoExamen                                         *
 * Descripción: Función que genera un código de examen aleatorio       *
 **********************************************************************/

const generarCodigoExamen = () => {
    return Math.random().toString(36).slice(8).replace(".", "");
}

/***********************************************************************
 * Nombre: generarContrasena                                           *
 * Descripción: Función que genera una contraseña aleatoria            *
 **********************************************************************/

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