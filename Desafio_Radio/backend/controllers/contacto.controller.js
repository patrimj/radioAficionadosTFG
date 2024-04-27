const { response, request } = require('express');
const ConexionContacto = require('../database/contacto.conexion');
const { subirArchivo } = require("../helpers/subir-archivo");

/**********************************************************************************************************************************
* Nombre consulta: registrarContacto                                                                                                  *
* Descripción: Esta consulta permite registrar a un contacto en la base de datos                                                  *
* Parametros: id_usuario, id_secundaria                                                                                           *
* Pantalla: Registrar contacto                                                                                                    *
* Rol: Operador                                                                                                                   *
**********************************************************************************************************************************/

const registrarContacto = async (req = request, res = response) => {

    const conx = new ConexionContacto();

    const { id_usuario, id_secundaria } = req.body;

    conx.registrarContacto(id_usuario, id_secundaria)
        .then(msg => {
            console.log('Contacto registrado correctamente');
            res.status(200).json({ message: 'Contacto registrado correctamente!', data: msg });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: "Error al registrar el contacto." })
        });
}

/***********************************************************************************************************************************
 * Nombre consulta: buscarContacto                                                                                                 *
 * Descripción: Esta consulta permite buscar un contacto en la base de datos                                                       *
 * Parametros: id_usuario, id_secundaria, premio                                                                                   *
 * Pantalla: Registrar contacto                                                                                                    *
 * Rol: Operador                                                                                                                   *
 **********************************************************************************************************************************/

const buscarContacto = async (req = request, res = response) => {

    const conx = new ConexionContacto();

    const { id_usuario, id_secundaria, premio } = req.body;

    conx.buscarContacto(id_usuario, id_secundaria, premio)
        .then(msg => {
            console.log('Contacto encontrado');
            res.status(200).json({ message: msg });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: "Error al buscar el contacto." })
        });
}

/**********************************************************************************************************************************
* Nombre consulta: verContactos                                                                                                   *
* Descripción: Esta consulta permite ver los contactos que se han registrado previamente en la base de datos                      * 
* Pantalla: Registrar contacto                                                                                                    *
* Rol: Operador                                                                                                                   *
**********************************************************************************************************************************/

const verContactos = async (req = request, res = response) => {

    const conx = new ConexionContacto();

    conx.verContactos()
        .then(msg => {
            console.log('Contactos obtenidos correctamente');
            res.status(200).json({ msg });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: "Error al obtener los contactos." })
        });
}

/**********************************************************************************************************************************
* Nombre consulta: verContactoConPremios                                                                                          *
* Descripción: Esta consulta permite ver un contacto específico y sus premios en una actividad determinada de la base de datos    *
* Parametros: id_usuario, id_secundaria                                                                                           *
* Nota Para asignarle premios que no tiene                                                                                        *  
* Pantalla: Registrar contacto                                                                                                    *
* Rol: Operador                                                                                                                   *
**********************************************************************************************************************************/

const verContactoConPremios = async (req = request, res = response) => {

    const conx = new ConexionContacto();

    const { id_usuario, id_secundaria } = req.body;

    conx.verContactoConPremios(id_usuario, id_secundaria)
        .then(msg => {
            console.log('Contacto obtenido correctamente');
            res.status(200).json({ msg });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: "Error al obtener el contacto." })
        });
}

/**********************************************************************************************************************************
* Nombre consulta: verPremios                                                                                                     *
* Descripción: Esta consulta permite ver todos los premios para una actividad secundaria específica                               *
* Parametros: id_secundaria                                                                                                       *
* Pantalla: Registrar contacto                                                                                                    *
* Rol: Operador                                                                                                                   *
**********************************************************************************************************************************/

const verPremios = async (req = request, res = response) => {

    const conx = new ConexionContacto();

    const { id_principal } = req.body;

    conx.verPremios(id_principal)
        .then(msg => {
            console.log('Premios obtenidos correctamente');
            res.status(200).json({ msg });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: "Error al obtener los premios." })
        });
}

/**********************************************************************************************************************************
* Nombre consulta: asignarPremio                                                                                                  *
* Descripción: Esta consulta permite asignar un nuevo premio a un contacto específico si no lo tiene ya en la base de datos       *
* Parametros: id_usuario, id_secundaria, nuevoPremio                                                                              *
* Pantalla: Registrar contacto                                                                                                    *
* Rol: Operador                                                                                                                   *
**********************************************************************************************************************************/

const asignarPremio = async (req = request, res = response) => {

    const conx = new ConexionContacto();

    const { id_usuario, id_secundaria, nuevoPremio } = req.body;

    conx.asignarPremio(id_usuario, id_secundaria, nuevoPremio)
        .then(msg => {
            console.log('Premio asignado correctamente');
            res.status(200).json({ message: msg });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: "Error al asignar el premio." })
        });
}

/**********************************************************************************************************************************************
* Nombre consulta: getConcursosActividadesIncompletasUsuario                                                                                  *
* Descripción: Esta consulta permite obtener los concursos (pendientes) y sus respectivas actividades (pendientes) de un usuario en concreto  *                                       
* Parametros: id_usuario                                                                                                                      *
* Pantalla: Registrar contacto                                                                                                                *
* Rol: Operador                                                                                                                               *
**********************************************************************************************************************************************/

const getConcursosActividadesIncompletasUsuario = async (req = request, res = response) => {

    const conx = new ConexionContacto();

    const { id_usuario } = req.body;

    conx.getConcursosActividadesIncompletasUsuario(id_usuario)
        .then(msg => {
            console.log('Concursos y actividades obtenidos correctamente');
            res.status(200).json({ msg });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: "Error al obtener los concursos y actividades." })
        });
}

/*********************************************************************************************************************************************************
 * Nombre consulta: getPremiosPendientes                                                                                                                 *
 * Descripción: Esta consulta permite buscar todas las actividades no completadas asociadas a un usuario y concurso y devuelve sus respectivos premios   *
 * Parametros: id_usuario, id_principal                                                                                                                  *                                                                                                                      
 * Pantalla: Registrar contacto                                                                                                                          *
 * Rol: Operador                                                                                                                                         *
 ********************************************************************************************************************************************************/

const getPremiosPendientes = async (req = request, res = response) => {

    const conx = new ConexionContacto();

    const { id_usuario, id_principal } = req.body;

    conx.getPremiosPendientes(id_usuario, id_principal)
        .then(msg => {
            console.log('Premios obtenidos correctamente');
            res.status(200).json({ msg });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: "Error al obtener los premios." })
        });
}

/**********************************************************************************************************************************************
 * Nombre consulta: getModalidadActividad                                                                                                     *
 * Descripción: Esta consulta permite obtener la modalidad de una actividad en concreto                                                       *
 * Parametros: id_actividad                                                                                                                   *
 * Pantalla:  Actividades                                                                                                                     *
 * Rol: Aficionado                                                                                                                            *
 *********************************************************************************************************************************************/

const getModalidadActividad = async (req = request, res = response) => {

    const conx = new ConexionContacto();

    const { id_actividad } = req.body;

    conx.getModalidadActividad(id_actividad)
        .then(modalidad => {
            res.status(200).json({ modalidad });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: "Error al obtener la modalidad." })
        });
}

/**********************************************************************************************************************************************
 * Nombre consulta: registrarYAsignarPremio                                                                                                   *
 * Descripción: Esta consulta permite registrar a un contacto y asignarle un premio en la base de datos                                       *
 * Parametros: id_usuario, id_secundaria, nuevoPremio                                                                                         *
 * Pantalla: Registrar contacto                                                                                                               *
 * Rol: Operador                                                                                                                              *
 * Nota: Se registrará el contacto y se asignará el premio si no existe ya en la base de datos                                                *
 *********************************************************************************************************************************************/

const registrarYAsignarPremio = async (req, res) => {
    const conx = new ContactoConexion();

    try {
        const { id_usuario, id_secundaria, nuevoPremio } = req.body;

        const registrado = await conx.registrarContacto(id_usuario, id_secundaria);
        const existeRegistro = await conx.verificarRegistro(id_usuario, id_secundaria);

        if (!registrado || !existeRegistro) return res.status(400).json(
            { msg: "Error al registrar el contacto o el contacto ya existe", data: false }
        );

        const contacto = await conx.verContactoConPremios(id_usuario, id_secundaria);
        const premios = await conx.verPremios(id_secundaria);

        if (!contacto || !premios) return res.status(400).json(
            { msg: "Error al obtener el contacto o los premios", data: false }
        );

        const asignado = await conx.asignarPremio(id_usuario, id_secundaria, nuevoPremio);

        if (!asignado) return res.status(400).json(
            { msg: "Error al asignar el premio", data: false }
        );

        const modalidades = await conx. ();
        const concursos = await conx.getConcursosActividadesIncompletasUsuario(id_usuario);
        const premiosPendientes = await conx.getPremiosPendientes(id_usuario);
        const modalidadActividad = await conx.getModalidadActividad(id_secundaria);

        return res.status(200).json({
            msg: "Contacto registrado y premio asignado correctamente",
            data: {
                contacto,
                premios,
                asignado,
                modalidades,
                concursos,
                premiosPendientes,
                modalidadActividad
            }
        });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}

module.exports = {
    registrarContacto,
    verContactos,
    verContactoConPremios,
    verPremios,
    asignarPremio,
    getConcursosActividadesIncompletasUsuario,
    getPremiosPendientes,
    getModalidadActividad,
    buscarContacto,
    registrarYAsignarPremio
}

