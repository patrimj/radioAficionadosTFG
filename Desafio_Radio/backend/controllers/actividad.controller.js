const { response, request } = require('express');
const ConexionActividades = require('../database/actividades.conexion');
const { subirArchivo } = require("../helpers/subir-archivo");

/************************************************************************************************************************
* Nombre consulta: getActividadesUnicoContactoAficionado                                                                *
* Descripción: Esta consulta obtiene las actividades de un unico contacto de un usuario aficionado de la base de datos  *
* Parametros: id_usuario                                                                                                *
* Pantalla: Perfil                                                                                                      *  
* Rol: Aficionado                                                                                                       *  
************************************************************************************************************************/

const getActividadesUnicoContactoAficionado = async (req = request, res = response) => {

    const conx = new ConexionActividades();

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

    const conx = new ConexionActividades();

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
* Parametros: id_concurso                                                                                                         * 
* Pantalla: Perfil y Concursos (modal)                                                                                            *
* Rol: Aficionado                                                                                                                 *
**********************************************************************************************************************************/

const getActividadesPorConcurso = async (req = request, res = response) => {

    const conx = new ConexionActividades();

    const id_concurso = req.params.id;

    conx.getActividadesPorConcurso(id_concurso)
        .then(msg => {
            console.log('Las Actividades de varios contactos de un concurso mostradas');
            res.status(200).json({ message: 'Las Actividades de varios contactos de un concurso mostradas correctamente!', data: msg });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: 'Error al mostrar las actividades de varios contactos de un concurso' });
        });
}

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
 * Parametros: id_actividad                                                                                                       *
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
* Parametros: id_actividad                                                                                                        *
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

/*************************************************************************************************************************************
 * Nombre consulta: mostrarActividadSinConcurso                                                                                      *
 * Descripción: Esta consulta permite mostrar las actividades que no pertenecen a un concurso de la base de datos                    *
 * Parametros: Ninguno                                                                                                               *     
 * Pantalla: Actividades                                                                                                             *
 * Rol: Aficionado                                                                                                                   *
 * **********************************************************************************************************************************/

const mostrarActividadSinConcurso = async (req = request, res = response) => {

    const conx = new ConexionActividades();

    conx.mostrarActividadSinConcurso()
        .then(msg => {
            console.log('Actividades sin concurso mostradas');
            res.status(200).json({ message: 'Actividades sin concurso mostradas correctamente!', data: msg });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: 'Error al mostrar las actividades sin concurso' });
        });
}

/***********************************************************************************************************************************
 * Nombre consulta: mostrarActividadPorIdConcurso                                                                                  *
 * Descripción: Esta consulta permite mostrar las actividades que pertenecen a un concurso en particular de la base de datos       *
 * Parametros: id_concurso                                                                                                         *
 * Pantalla: Actividades                                                                                                           *
 * Rol: Aficionado                                                                                                                 *
 ***********************************************************************************************************************************/

const mostrarActividadPorIdConcurso = async (req = request, res = response) => {

    const conx = new ConexionActividades();

    conx.mostrarActividadPorIdConcurso(req.params.id)
        .then(msg => {
            console.log('Actividades por concurso mostradas');
            res.status(200).json({ message: 'Actividades por concurso mostradas correctamente!', data: msg });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: 'Error al mostrar las actividades por concurso' });
        });
}

/************************************************************************************************************************************
 * Nombre consulta: mostrarActividadConConcurso                                                                                     *
 * Descripción: Esta consulta permite mostrar las actividades que pertenecen a un concurso en particular                            *
 * Parametros: Ninguno                                                                                                              *
 * Pantalla: Actividades                                                                                                            *
 * Rol: Aficionado                                                                                                                  *
 ***********************************************************************************************************************************/

const mostrarActividadConConcurso = async (req = request, res = response) => {

    const conx = new ConexionActividades();

    conx.mostrarActividadConConcurso()
        .then(msg => {
            console.log('Actividades con concurso mostradas');
            res.status(200).json({ message: 'Actividades con concurso mostradas correctamente!', data: msg });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: 'Error al mostrar las actividades con concurso' });
        });
}

/**********************************************************************************************************************************
* Nombre consulta: verParticipantesActividad                                                                                      *
* Descripción: Esta consulta muestra los participantes de una actividad concreta de la base de datos                              *
* Parametros: id_actividad                                                                                                        *
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
 * Parametros: id_actividad                                                                                                         *
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
 * Nombre consulta: altaActividad                                                                                                   *
 * Descripción: Esta consulta permite crear una actividad de la base de datos                                                       *
 * Parametros: nombre, url_foto, localizacion, fecha, frecuencia, banda, id_modo, id_modalidad, completada, id_operador             *
 * Pantalla: Actividades                                                                                                            *
 * Rol: Operador                                                                                                                    *
 ***********************************************************************************************************************************/

const altaActividad = async (req, res = response) => {

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

        conx.altaActividad(req.body)
            .then(msg => {
                console.log('Actividad creada correctamente!');
                res.status(200).json({ message: 'Actividad creada correctamente!', data: msg });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ msg: 'Error al crear la actividad' });
            });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error al subir la imagen o al crear la actividad' });
    }
}

/************************************************************************************************************************************
 * Nombre consulta: getModalidades                                                                                                  *
 * Descripción: Esta consulta permite ver todas las modalidades que existen en la base de datos                                     *
 * Parametros: ninguno                                                                                                              *
 * Pantalla: Actividades                                                                                                            *
 * Rol: Operador                                                                                                                    *
 ***********************************************************************************************************************************/

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

module.exports = {
    getActividadesUnicoContactoAficionado,
    getActividadesVariosContactosAficionado,
    getActividadesPorConcurso,
    mostrarActividades,
    mostrarActividadesTerminadas,
    mostrarActividadesPendientes,
    terminarActividad,
    mostrarActividadId,
    mostrarActividadNombre,
    mostrarActividadSinConcurso,
    mostrarActividadPorIdConcurso,
    mostrarActividadConConcurso,
    verParticipantesActividad,
    eliminarActividad,
    modificarActividad,
    altaActividad,
    getModalidades
}
