const DiplomaConexion = require('../database/diploma.conexion');
const { response, request } = require('express');

/**************************************************************************************************************************************
 * Nombre consulta: crearDiploma                                                                                                      *
 * Descripción: Esta función se encarga de generar un diploma. Crea un nuevo documento PDF con la librería 'pdf-lib' y lo guarda en   *
 * la carpeta 'temp' con el nombre del 'identificador'.pdf.                                                                           *
 * Pantalla: Perfil                                                                                                                   *
 * Rol: aficionado                                                                                                                    *
 * ***********************************************************************************************************************************/

const crearDiploma = async (req = request, res = response) => {
    const conx = new DiplomaConexion();

    try {
        const resultado = await conx.generarDiploma(req.body.identificador, req.body.actividad, req.body.url);
        res.send(resultado);
    } catch (error) {
        res.send(error);
        console.log(error);
    }
}

/************************************************************************************************************************************
 * Nombre consulta: generarYEnviarDiploma                                                                                           *
 * Descripción: Esta función se encarga de generar un diploma y enviarlo por correo electrónico.                                    *
 * Pantalla: Perfil                                                                                                                 *
 * Rol: aficionado                                                                                                                  *
 * *********************************************************************************************************************************/

const generarYEnviarDiploma = async (req = request, res = response) => {
    const conx = new DiplomaConexion();

    identificador = req.usuario.id_examen;
    email = req.usuario.email;
    console.log(identificador);
    console.log(email);

    try {
        await conx.generarYEnviarDiploma(identificador, req.body.actividad, req.body.url, email);
        res.send('Diploma generado y enviado por correo electrónico');
    } catch (error) {
        res.status(500).send('Error al generar y enviar el diploma');
        console.log(error);
    }
}

module.exports = {
    crearDiploma,
    generarYEnviarDiploma
}