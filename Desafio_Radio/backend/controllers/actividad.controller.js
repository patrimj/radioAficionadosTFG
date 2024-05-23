const { response, request } = require('express');
const ConexionActividades = require('../database/actividades.conexion');
const { subirArchivo } = require("../helpers/subir-archivo");

/**********************************************************************************************************************************
* Nombre consulta: mostrarActividades                                                                                             *
* Descripción: Esta consulta muestra todas las actividades de la base de datos                                                    *
* Parametros: Ninguno                                                                                                             *
* Pantalla: Actividades                                                                                                           *
* Rol: Aficionado                                                                                                                 *
**********************************************************************************************************************************/

const mostrarActividades = async (req = request, res = response) => {

    const conx = new ConexionActividades();

    conx.mostrarActividades()
        .then(msg => {
            console.log('Actividades mostradas');
            res.status(200).json({ message: 'Actividades mostradas correctamente!', data: msg });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: 'Error al mostrar las actividades' });
        });
}

/**********************************************************************************************************************************
* Nombre consulta: mostrarActividadesTerminadas                                                                                   *
* Descripción: Esta consulta muestra todas las actividades terminadas de la base de datos                                         *
* Parametros: Ninguno                                                                                                             *
* Pantalla: Actividades                                                                                                           *
* Rol: Aficionado                                                                                                                 *
**********************************************************************************************************************************/

const mostrarActividadesTerminadas = async (req = request, res = response) => {

    const conx = new ConexionActividades();

    conx.mostrarActividadesTerminadas()
        .then(msg => {
            console.log('Actividades terminadas mostradas');
            res.status(200).json({ message: 'Actividades terminadas mostradas correctamente!', data: msg });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: 'Error al mostrar las actividades terminadas' });
        });
}

/**********************************************************************************************************************************
* Nombre consulta: mostrarActividadesPendientes                                                                                   *
* Descripción: Esta consulta muestra todas las actividades pendientes de la base de datos                                         *
* Parametros: Ninguno                                                                                                             *
* Pantalla: Actividades                                                                                                           *
* Rol: Aficionado                                                                                                                 *
**********************************************************************************************************************************/

const mostrarActividadesPendientes = async (req = request, res = response) => {

    const conx = new ConexionActividades();

    conx.mostrarActividadesPendientes()
        .then(msg => {
            console.log('Actividades pendientes mostradas');
            res.status(200).json({ message: 'Actividades pendientes mostradas correctamente!', data: msg });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: 'Error al mostrar las actividades pendientes' });
        });
}

/**********************************************************************************************************************************
 * Nombre consulta: terminarActividad                                                                                             *
 * Descripción: Esta consulta permite terminar una actividad de la base de datos                                                  *
 * Parametros: id_secundaria                                                                                                      *
 * Pantalla: Actividades                                                                                                          *
 * Rol: Operador                                                                                                                  *
 * *******************************************************************************************************************************/

const terminarActividad = async (req = request, res = response) => {

    const conx = new ConexionActividades();

    conx.terminarActividad(req.params.id)
        .then(msg => {
            console.log('Actividad terminada correctamente!');
            res.status(200).json({ message: 'Actividad terminada correctamente!', data: msg });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: 'Error al terminar la actividad' });
        });
}

/**********************************************************************************************************************************
* Nombre consulta: mostrarActividadId                                                                                             *
* Descripción: Esta consulta muestra una actividad en concreto(id) de la base de datos                                            *
* Parametros: id_secundaria                                                                                                       *
* Pantalla: Actividades                                                                                                           *
* Rol: Aficionado                                                                                                                 *
**********************************************************************************************************************************/

const mostrarActividadId = async (req = request, res = response) => {

    const conx = new ConexionActividades();

    conx.mostrarActividadId(req.params.id)
        .then(msg => {
            console.log('Actividad mostrada correctamente!');
            res.status(200).json({ message: 'Actividad mostrada correctamente!', data: msg });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: 'Error al mostrar la actividad' });
        });
}

/**********************************************************************************************************************************
* Nombre consulta: mostrarActividadNombre                                                                                         *
* Descripción: Esta consulta muestra una actividad por su nombre de la base de datos                                              *
* Parametros: nombre                                                                                                              *
* Pantalla: Actividades                                                                                                           *
* Rol: Aficionado                                                                                                                 *
**********************************************************************************************************************************/

const mostrarActividadNombre = async (req = request, res = response) => {

    const conx = new ConexionActividades();

    conx.mostrarActividadNombre(req.params.nombre)
        .then(msg => {
            console.log('Actividad mostrada correctamente!');
            res.status(200).json({ message: 'Actividad mostrada correctamente!', data: msg });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: 'Error al mostrar la actividad' });
        });
}

/**********************************************************************************************************************************
* Nombre consulta: verParticipantesActividad                                                                                      *
* Descripción: Esta consulta muestra los participantes de una actividad concreta de la base de datos                              *
* Parametros: id_secundaria                                                                                                       *
* Pantalla: Actividades                                                                                                           *
* Rol: Aficionado                                                                                                                 *
**********************************************************************************************************************************/

const verParticipantesActividad = async (req = request, res = response) => {

    const conx = new ConexionActividades();

    conx.verParticipantesActividad(req.params.id)
        .then(msg => {
            console.log('Participantes de actividad mostrados');
            res.status(200).json({ message: 'Participantes de actividad mostrados correctamente!', data: msg });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: 'Error al mostrar los participantes de la actividad' });
        });
}

/************************************************************************************************************************************
 * Nombre consulta: eliminarActividad                                                                                               *
 * Descripción: Esta consulta permite eliminar una actividad de la base de datos                                                    *
 * Parametros: id_secundaria                                                                                                        *
 * Pantalla: Actividades                                                                                                            *
 * Rol: Operador                                                                                                                    *
 ***********************************************************************************************************************************/

const eliminarActividad = async (req = request, res = response) => {

    const conx = new ConexionActividades();

    conx.eliminarActividad(req.params.id)
        .then(msg => {
            console.log('Actividad eliminada correctamente!');
            res.status(200).json({ message: 'Actividad eliminada correctamente!', data: msg });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: 'Error al eliminar la actividad' });
        });
}

/************************************************************************************************************************************
 * Nombre consulta: modificarActividad                                                                                              *
 * Descripción: Esta consulta permite modificar una actividad de la base de datos                                                   *
 * Parametros: id, nombre, url_foto, localizacion, fecha, frecuencia, banda, id_modo, id_modalidad, completada, id_operador         *                                                                                                             
 * Pantalla: Actividades                                                                                                            *
 * Rol: Operador                                                                                                                    *
 ***********************************************************************************************************************************/

const modificarActividad = async (req, res = response) => {

    const conx = new ConexionActividades();

    if (!req.files || !req.files.archivo) {
        return res.status(400).json({ msg: 'No se subió ninguna imagen' });
    }

    try {
        const resultadoSubida = await subirArchivo(req.files.archivo, undefined, 'actividades');

        if (resultadoSubida && resultadoSubida.secure_url) {
            req.body.url_foto = resultadoSubida.secure_url;
        } else {
            throw new Error('Error al subir el archivo');
        }

        conx.modificarActividad(req.params.id, req.body)
            .then(msg => {
                console.log('Actividad modificada correctamente!');
                res.status(200).json({ message: 'Actividad modificada correctamente!', data: msg });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ msg: 'Error al modificar la actividad' });
            });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error al subir la imagen o al modificar la actividad' });
    }
}

/************************************************************************************************************************************
 * Nombre consulta: altaActividadUnicoContacto                                                                                      *
 * Descripción: Esta consulta permite crear una actividad de un unico contacto en la base de datos                                  *
 * Parametros: nombre, url_foto, localizacion, fecha, frecuencia, banda, id_modo, id_modalidad, completada, id_operador             *
 * Pantalla: Actividades                                                                                                            *
 * Rol: Operador                                                                                                                    *
 ***********************************************************************************************************************************/

const altaActividadUnicoContacto = async (req, res = response) => {

    const conx = new ConexionActividades();

    if (!req.files || !req.files.archivo) {
        return res.status(400).json({ msg: 'No se subió ninguna imagen' });
    }

    try {
        const resultadoSubida = await subirArchivo(req.files.archivo, undefined, 'actividades');

        if (resultadoSubida && resultadoSubida.secure_url) {
            req.body.url_foto = resultadoSubida.secure_url;
        } else {
            throw new Error('Error al subir el archivo');
        }

        conx.altaActividadUnicoContacto(req.body)
            .then(msg => {
                console.log('Actividad creada correctamente!');
                res.status(200).json({ message: 'Actividad unico contacto creada correctamente!', data: msg });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ msg: 'Error al crear la actividad de unico contacto ' });
            });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error al subir la imagen o al crear la actividad unico contacto' });
    }
}

/************************************************************************************************************************************************
 * Nombre consulta: altaActividadVariosContactos                                                                                                *
 * Descripción: Esta consulta permite crear una actividad de varios contactos en la base de datos                                               *
 * Parametros: nombre, url_foto, localizacion, fecha, frecuencia, banda, id_modo, id_modalidad, completada, id_operador y id_principal, premio  *
 * Pantalla: Actividades                                                                                                                        *
 * Rol: Operador                                                                                                                                *
 * *********************************************************************************************************************************************/

const altaActividadVariosContactos = async (req, res = response) => {

    const conx = new ConexionActividades();

    if (!req.files || !req.files.archivo) {
        return res.status(400).json({ msg: 'No se subió ninguna imagen' });
    }

    try {
        const resultadoSubida = await subirArchivo(req.files.archivo, undefined, 'actividades');

        if (resultadoSubida && resultadoSubida.secure_url) {
            req.body.url_foto = resultadoSubida.secure_url;
        } else {
            throw new Error('Error al subir el archivo');
        }

        const id_principal = req.body.id_principal;
        const premio = req.body.premio;

        conx.altaActividadVariosContactos(req.body, id_principal, premio)
            .then(msg => {
                console.log('Actividad creada correctamente!');
                res.status(200).json({ message: 'Actividad varios contactos creada correctamente!', data: msg });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ msg: 'Error al crear la actividad varios contactos' });
            });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error al subir la imagen o al crear la actividad varios contactos' });
    }
}

/*********************************************************************************************************************************************
 * Nombre consulta: getModalidades                                                                                                           *
 * Descripción: Esta consulta permite obtener las modalidades de la base de datos                                                            *
 * Parametros: Ninguno                                                                                                                       *
 * Pantalla: Actividades                                                                                                                     *
 * Rol: Operador                                                                                                                             *
 * ******************************************************************************************************************************************/

const getModalidades = async (req = request, res = response) => {

    const conx = new ConexionActividades();

    conx.getModalidades()
        .then(msg => {
            console.log('Modalidades mostradas');
            res.status(200).json({ message: 'Modalidades mostradas correctamente!', data: msg });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: 'Error al mostrar las modalidades' });
        });
}

/*********************************************************************************************************************************************
 * Nombre consulta: getModos                                                                                                                 *
 * Descripción: Esta consulta permite obtener los modos de la base de datos                                                                  *
 * Parametros: Ninguno                                                                                                                       *
 * Pantalla: Actividades                                                                                                                     *
 * Rol: Operador                                                                                                                             *
 * ******************************************************************************************************************************************/

const getModos = async (req = request, res = response) => {

    const conx = new ConexionActividades();

    conx.getModos()
        .then(msg => {
            console.log('Modos mostrados');
            res.status(200).json({ message: 'Modos mostrados correctamente!', data: msg });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: 'Error al mostrar los modos' });
        });
}

module.exports = {
    mostrarActividades,
    mostrarActividadesTerminadas,
    mostrarActividadesPendientes,
    terminarActividad,
    mostrarActividadId,
    mostrarActividadNombre,
    verParticipantesActividad,
    eliminarActividad,
    modificarActividad,
    altaActividadUnicoContacto,
    altaActividadVariosContactos,
    getModalidades,
    getModos
}