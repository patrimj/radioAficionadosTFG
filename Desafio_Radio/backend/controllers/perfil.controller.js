const { response, request } = require('express');
const ConexionPerfil = require('../database/perfil.conexion');
const { subirArchivo } = require("../helpers/subir-archivo");

/************************************************************************************************************************
* Nombre consulta: getActividadesUnicoContactoAficionado                                                                *
* Descripción: Esta consulta obtiene las actividades de un unico contacto de un usuario aficionado de la base de datos  *
* Parametros: id_usuario                                                                                                *
* Pantalla: Perfil                                                                                                      *  
* Rol: Aficionado                                                                                                       *  
************************************************************************************************************************/

const getActividadesUnicoContactoAficionado = async (req = request, res = response) => {

    const conx = new ConexionPerfil();

    const id_usuario = req.usuario.id

    conx.getActividadesUnicoContactoAficionado(id_usuario)
        .then(msg => {
            console.log('Actividades Unico Contacto del aficionado mostradas');
            res.status(200).json({ message: 'Actividades Unico Contacto mostradas correctamente!', data: msg });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: "Error al mostrar las actividades Unico Contacto." })
        });
}

/************************************************************************************************************************
* Nombre consulta: getActividadesVariosContactosAficionado                                                              *
* Descripción: Esta consulta obtiene todas las actividades de varios contactos que pertenece a un concurso              *
* Parametros: id_usuario                                                                                                *
* Pantalla: Perfil                                                                                                      *
* Rol: Aficionado                                                                                                       *
************************************************************************************************************************/

const getActividadesVariosContactosAficionado = async (req = request, res = response) => {

    const conx = new ConexionPerfil();

    const id_usuario = req.usuario.id

    conx.getActividadesVariosContactosAficionado(id_usuario)
        .then(msg => {
            console.log('Actividades Varios Contactos del aficionado mostradas');
            res.status(200).json({ message: 'Actividades Varios Contactos mostradas correctamente!', data: msg });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: 'Error al mostrar las actividades Varios Contactos' });
        });
}

/**********************************************************************************************************************************
* Nombre consulta: getActividadesPorConcurso                                                                                      *
* Descripción: Esta consulta obtiene las actividades de varios contactos asociadas a un concurso específico de la base de datos   *
* Parametros: id_principal                                                                                                        * 
* Pantalla: Perfil (modal)                                                                                                        *
* Rol: Aficionado                                                                                                                 *
**********************************************************************************************************************************/

const getActividadesPorConcurso = async (req = request, res = response) => {

    const conx = new ConexionPerfil();

    const id_principal = req.params.id_principal;

    conx.getActividadesPorConcurso(id_principal)
        .then(msg => {
            console.log('Las Actividades de varios contactos de un concurso mostradas');
            res.status(200).json({ message: 'Las Actividades de varios contactos de un concurso mostradas correctamente!', data: msg });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: 'Error al mostrar las actividades de varios contactos de un concurso' });
        });
}

/*********************************************************************************************************************************************
 * Nombre consulta: getTotalActividadesParticipado                                                                                           *
 * Descripción: Esta consulta permite obtener el total de actividades en las que ha participado un usuario concreto de la base de datos      *
 * Parametros: id_usuario                                                                                                                    *
 * Pantalla: Perfil                                                                                                                          *
 * Rol: Aficionado                                                                                                                           *
 * ******************************************************************************************************************************************/

const getTotalActividadesParticipado = async (req = request, res = response) => {

    const conx = new ConexionPerfil();

    const id_usuario = req.usuario.id

    conx.getTotalActividadesParticipado(id_usuario)
        .then(msg => {
            console.log('Total de actividades en las que ha participado mostrado');
            res.status(200).json({ message: 'Total de actividades en las que ha participado mostrado correctamente!', data: msg });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: 'Error al mostrar el total de actividades en las que ha participado' });
        });
}

/************************************************************************************************************************************
* Nombre consulta: getConcursosAficionado                                                                                           *
* Descripción: Esta consulta obtiene los concursos de un usuario aficionado de la base de datos                                     *  
* Parametros: id_usuario                                                                                                            *  
* Pantalla: Perfil                                                                                                                  *
* Rol: Aficionado                                                                                                                   *
************************************************************************************************************************************/

const getConcursosAficionado = async (req = request, res = response) => {

    const conx = new ConexionPerfil();

    const id_usuario = req.usuario.id;

    conx.getConcursosAficionado(id_usuario)
        .then(msg => {
            console.log('Concursos del aficionado mostrados');
            res.status(200).json({ message: 'Concursos del aficionado mostrados correctamente!', data: msg });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: "Error al mostrar los concursos del aficionado." })
        });
}

/*******************************************************************************************************************************************
 * Nombre consulta: getTotalConcursosParticipado                                                                                           *
 * Descripción: Esta consulta permite obtener el total de concursos en las que ha participado un usuario concreto de la base de datos      *
 * Parametros: id_usuario                                                                                                                  *
 * Pantalla: Perfil                                                                                                                        *
 * Rol: Aficionado                                                                                                                         *
 * ****************************************************************************************************************************************/

const getTotalConcursosParticipado = async (req = request, res = response) => {

    const conx = new ConexionPerfil();

    const id_usuario = req.usuario.id;

    conx.getTotalConcursosParticipado(id_usuario)
        .then(msg => {
            console.log('Total de concursos en los que ha participado mostrado');
            res.status(200).json({ message: 'Total de concursos en los que ha participado mostrado correctamente!', data: msg });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: 'Error al mostrar el total de concursos en los que ha participado' });
        });
}

/************************************************************************************************************************************
* Nombre consulta: cambiarPassword                                                                                                  *
* Descripción: Esta consulta permite cambiar la contraseña de un usuario en la base de datos                                        *
* Parametros: email, password                                                                                                       *
* Pantalla: Perfil                                                                                                                  *
* Rol: aficionado, admin, operador                                                                                                  *
************************************************************************************************************************************/

const cambiarPassword = async (req = request, res = response) => {

    const conx = new ConexionPerfil();

    conx.cambiarPassword(req.body.email, req.body.password)
        .then(msg => {
            console.log('Cambio de contraseña exitoso');
            res.status(200).json({ message: 'Cambio de contraseña exitoso', data: msg });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: 'Error al cambiar contraseña ' });
        });
}

/************************************************************************************************************************************
 * Nombre consulta: mostrarPerfil                                                                                                   *
 * Descripción: Esta consulta permite mostrar el perfil de un usuario en la base de datos                                           *
 * Parametros: id_usuario                                                                                                           *
 * Pantalla: Perfil                                                                                                                 *
 * Rol: aficionado, admin, operador                                                                                                 *
 ***********************************************************************************************************************************/

const mostrarPerfil = async (req = request, res = response) => {

    const conx = new ConexionPerfil();

    conx.mostrarPerfil(req.body.id_usuario)
        .then(msg => {
            console.log('Perfil mostrado exitosamente');
            res.status(200).json({ message: 'Perfil mostrado exitosamente', data: msg });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: 'Error al mostrar perfil ' });
        });
}

/************************************************************************************************************************************
* Nombre consulta: modificarPerfil                                                                                                  *  
* Descripción: Esta consulta permite modificar el perfil de un usuario en la base de datos                                          *
* Parametros: id_usuario, email, nombre, apellido_uno, apellido_dos, url_foto, id_examen, id_rol                                    *
* Pantalla: Perfil                                                                                                                  *
* Rol: aficionado, admin, operador                                                                                                  *
************************************************************************************************************************************/

const modificarPerfil = async (req, res = response) => {

    const conx = new ConexionPerfil();

    if (!req.files || !req.files.archivo) {
        return res.status(400).json({ msg: 'No se subió ninguna imagen' });
    }

    try {
        const resultadoSubida = await subirArchivo(req.files.archivo, undefined, 'usuario');

        if (resultadoSubida && resultadoSubida.secure_url) {
            req.body.url_foto = resultadoSubida.secure_url;
        } else {
            throw new Error('Error al subir el archivo');
        }

        conx.modificarPerfil(req.params.id, req.body)
            .then(msg => {
                console.log('Perfil modificado correctamente !');
                res.status(200).json({ message: 'Perfil modificado correctamente!', data: msg });
            })
            .catch(err => {
                console.log(err);
                res.status(200).json({ msg: 'No se han encontrado registros' });
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error al subir la imagen o al modificar el perfil' });
    }
}

/**************************************************************************************************************************************
 * Nombre consulta: crearDiploma                                                                                                      *
 * Descripción: Esta función se encarga de generar un diploma. Crea un nuevo documento PDF con la librería 'pdf-lib' y lo guarda en   *
 * la carpeta 'temp' con el nombre del 'identificador'.pdf.                                                                           *
 * Pantalla: Perfil                                                                                                                   *
 * Rol: aficionado                                                                                                                    *
 * ***********************************************************************************************************************************/

const crearDiploma = async (req = request, res = response) => {
    const conx = new ConexionPerfil();

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
    const conx = new ConexionPerfil();

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
    getActividadesUnicoContactoAficionado,
    getActividadesVariosContactosAficionado,
    getActividadesPorConcurso,
    getTotalActividadesParticipado,
    getConcursosAficionado,
    getTotalConcursosParticipado,
    cambiarPassword,
    mostrarPerfil,
    modificarPerfil,
    crearDiploma,
    generarYEnviarDiploma
}