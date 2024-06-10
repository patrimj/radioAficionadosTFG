const { response, request } = require('express');
const InicioConexion = require('../database/inicio.conexion');

/************************************************************************************************************************************
 * Nombre consulta: mostrarNoticias                                                                                                 *
 * Descripción: Esta consulta permite mostrar las noticias de la base de datos                                                      *
 * Parametros: ninguno                                                                                                              *
 * Pantalla: Inicio                                                                                                                 *
 * Rol: aficionado, admin, operador                                                                                                 *
 ***********************************************************************************************************************************/

const mostrarNoticias = async (req = request, res = response) => {

    const conx = new InicioConexion();

    conx.mostrarNoticias()
        .then(msg => {
            console.log('Noticias mostradas correctamente');
            res.status(200).json({ message: 'Noticias mostradas correctamente', data: msg });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Error al mostrar las noticias' });
        });
}

/************************************************************************************************************************************
* Nombre consulta: eliminarNoticia                                                                                                 *
* Descripción: Esta consulta permite eliminar una noticia de la base de datos                                                      *
* Parametros: id                                                                                                                   *
* Pantalla: Inicio                                                                                                                 *
* Rol: admin                                                                                                                       *
***********************************************************************************************************************************/

const eliminarNoticia = async (req = request, res = response) => {

    const conx = new InicioConexion();

    conx.eliminarNoticia(req.params.id)
        .then(msg => {
            console.log('Noticia eliminada correctamente');
            res.status(200).json({ message: 'Noticia eliminada correctamente', data: msg });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Error al eliminar la noticia' });
        });
}

/************************************************************************************************************************************
 * Nombre consulta: modificarNoticia                                                                                                *
 * Descripción: Esta consulta permite modificar una noticia de la base de datos                                                     *
 * Parametros: id, nombre, descripción, fecha                                                                                       *
 * Pantalla: Inicio                                                                                                                 *
 * Rol: admin                                                                                                                       *
 ***********************************************************************************************************************************/

const modificarNoticia = async (req = request, res = response) => {

    const conx = new InicioConexion();

    conx.modificarNoticia(req.params.id, req.body)
        .then(msg => {
            console.log('Noticia modificada correctamente');
            res.status(200).json({ message: 'Noticia modificada correctamente', data: msg });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Error al modificar la noticia' });
        });
}

/************************************************************************************************************************************
* Nombre consulta: crearNoticia                                                                                                    *
* Descripción: Esta consulta permite crear una noticia en la base de datos                                                         *
* Parametros: nombre, descripción, fecha                                                                                           *
* Pantalla: Inicio                                                                                                                 *
* Rol: admin                                                                                                                       *
***********************************************************************************************************************************/

const crearNoticia = async (req = request, res = response) => {

    const conx = new InicioConexion();

    conx.crearNoticia(req.body)
        .then(msg => {
            console.log('Noticia creada correctamente');
            res.status(200).json({ message: 'Noticia creada correctamente', data: msg });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Error al crear la noticia' });
        });
}

/************************************************************************************************************************************
 * Nombre consulta: mostrarAdmin                                                                                                    *
 * Descripción: Esta consulta permite mostrar los administradores de la base de datos                                               *
 * Parametros: ninguno                                                                                                              *
 * Pantalla: Inicio                                                                                                                 *
 * Rol: admin, operador, admin                                                                                                      *   
 ***********************************************************************************************************************************/

const mostrarAdmin = async (req = request, res = response) => {

    const conx = new InicioConexion();

    conx.mostrarAdmin()
        .then(msg => {
            console.log('Administradores mostrados correctamente');
            res.status(200).json({ message: 'Administradores mostrados correctamente', data: msg });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Error al mostrar los administradores' });
        });
}

/************************************************************************************************************************************
* Nombre consulta: mostrarOperadores                                                                                               *
* Descripción: Esta consulta permite mostrar los operadores de la base de datos                                                    *
* Parametros: ninguno                                                                                                              *
* Pantalla: Inicio                                                                                                                 *
* Rol: admin, operador, admin                                                                                                      *
* *********************************************************************************************************************************/

const mostrarOperadores = async (req = request, res = response) => {

    const conx = new InicioConexion();

    conx.mostrarOperadores()
        .then(msg => {
            console.log('Operadores mostrados correctamente');
            res.status(200).json({ message: 'Operadores mostrados correctamente', data: msg });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Error al mostrar los operadores' });
        });
}

module.exports = {
    mostrarNoticias,
    eliminarNoticia,
    modificarNoticia,
    crearNoticia,
    mostrarAdmin,
    mostrarOperadores
}