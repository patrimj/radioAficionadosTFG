const { response, request } = require('express');
const ConexionConcursos = require('../database/concursos.conexion');
const { subirArchivo } = require("../helpers/subir-archivo");

/************************************************************************************************************************************
* Nombre consulta: getConcursosAficionado                                                                                           *
* Descripción: Esta consulta obtiene los concursos de un usuario aficionado de la base de datos                                     *  
* Parametros: id_usuario                                                                                                            *  
* Pantalla: Perfil                                                                                                                  *
* Rol: Aficionado                                                                                                                   *
************************************************************************************************************************************/

const getConcursosAficionado = async (req = request, res = response) => {

    const conx = new ConexionConcursos();

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

/**********************************************************************************************************************************
* Nombre consulta: mostrarConcursos                                                                                               *
* Descripción: Esta consulta obtiene todos los concursos de la base de datos                                                      *
* Parametros: Ninguno                                                                                                             *
* Pantalla: Concursos                                                                                                             *
* Rol: Aficionado                                                                                                                 *
**********************************************************************************************************************************/

const mostrarConcursos = async (req = request, res = response) => {

    const conx = new ConexionConcursos();

    conx.mostrarConcursos()
        .then(msg => {
            console.log('Concursos mostrados');
            res.status(200).json({ message: 'Concursos mostrados correctamente!', data: msg });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: 'Error al mostrar los concursos' });
        });
}

/**********************************************************************************************************************************
* Nombre consulta: mostrarConcursosTerminados                                                                                     *
* Descripción: Esta consulta obtiene todos los concursos terminados de la base de datos                                           *
* Parametros: Ninguno                                                                                                             *
* Pantalla: Concursos                                                                                                             *
* Rol: Aficionado                                                                                                                 *
**********************************************************************************************************************************/

const mostrarConcursosTerminados = async (req = request, res = response) => {

    const conx = new ConexionConcursos();

    conx.mostrarConcursosTerminados()
        .then(msg => {
            console.log('Concursos terminados mostrados');
            res.status(200).json({ message: 'Concursos terminados mostrados correctamente!', data: msg });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: 'Error al mostrar los concursos terminados' });
        });
}

/**********************************************************************************************************************************
* Nombre consulta: mostrarConcursosPendientes                                                                                     *
* Descripción: Esta consulta obtiene todos los concursos pendientes de la base de datos                                           *
* Parametros: Ninguno                                                                                                             *
* Pantalla: Concursos                                                                                                             *
* Rol: Aficionado                                                                                                                 *
**********************************************************************************************************************************/

const mostrarConcursosPendientes = async (req = request, res = response) => {

    const conx = new ConexionConcursos();

    conx.mostrarConcursosPendientes()
        .then(msg => {
            console.log('Concursos pendientes mostrados');
            res.status(200).json({ message: 'Concursos pendientes mostrados correctamente!', data: msg });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: 'Error al mostrar los concursos pendientes' });
        });
}

/**********************************************************************************************************************************
* Nombre consulta: altaConcurso                                                                                                   *
* Descripción: Esta consulta permite registrar un nuevo concurso en la base de datos                                              *
* Parametros: body                                                                                                                *
* Pantalla: Concursos                                                                                                             *
* Rol: Administrador                                                                                                              *
**********************************************************************************************************************************/

const altaConcurso = async (req, res = response) => {

    const conx = new ConexionConcursos();

    if (!req.files || !req.files.archivo) {
        return res.status(400).json({ msg: 'No se subió ninguna imagen' });
    }

    try {
        const resultadoSubida = await subirArchivo(req.files.archivo, undefined, 'concursos');

        if (resultadoSubida && resultadoSubida.secure_url) {
            req.body.url_foto = resultadoSubida.secure_url;
        } else {
            throw new Error('Error al subir el archivo');
        }

        conx.altaConcurso(req.body)
            .then(msg => {
                console.log('Concurso creado correctamente!');
                res.status(200).json({ message: 'Concurso creado correctamente!', data: msg });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ msg: 'Error al crear el concurso' });
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error al subir la imagen o al crear el concurso' });
    }
}

/**********************************************************************************************************************************
* Nombre consulta: modificarConcurso                                                                                              *
* Descripción: Esta consulta permite modificar un concurso en la base de datos                                                    *
* Parametros: id, nombre, descripcion, url_foto, completada, solucion                                                             *
* Pantalla: Concursos                                                                                                             *
* Rol: Administrador                                                                                                              *
**********************************************************************************************************************************/

const modificarConcurso = async (req, res = response) => {

    const conx = new ConexionConcursos();

    if (!req.files || !req.files.archivo) {
        return res.status(400).json({ msg: 'No se subió ninguna imagen' });
    }

    try {
        const resultadoSubida = await subirArchivo(req.files.archivo, undefined, 'concursos');

        if (resultadoSubida && resultadoSubida.secure_url) {
            req.body.url_foto = resultadoSubida.secure_url;
        } else {
            throw new Error('Error al subir el archivo');
        }

        conx.modificarConcurso(req.params.id, req.body)
            .then(msg => {
                console.log('Concurso modificado correctamente!');
                res.status(200).json({ message: 'Concurso modificado correctamente!', data: msg });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ msg: 'Error al modificar el concurso' });
            });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error al subir la imagen o al modificar el concurso' });
    }
}

/**********************************************************************************************************************************
* Nombre consulta: terminarConcurso                                                                                               *
* Descripción: Esta consulta permite terminar un concurso de la base de datos                                                     *
* Parametros: id_concurso                                                                                                         *
* Pantalla: Concursos                                                                                                             *
* Rol: Administrador                                                                                                              *
**********************************************************************************************************************************/

const terminarConcurso = async (req, res = response) => {

    const conx = new ConexionConcursos();

    conx.terminarConcurso(req.params.id)
        .then(msg => {
            console.log('Concurso terminado correctamente!');
            res.status(200).json({ message: 'Concurso terminado correctamente!', data: msg });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: 'Error al terminar el concurso' });
        });
}

/**********************************************************************************************************************************
* Nombre consulta: bajaConcurso                                                                                                   *
* Descripción: Esta consulta permite eliminar un concurso en la base de datos                                                     *
* Parametros: id_concurso                                                                                                         *
* Pantalla: Concursos                                                                                                             *
* Rol: Administrador                                                                                                              *
**********************************************************************************************************************************/

const bajaConcurso = async (req, res = response) => {

    const conx = new ConexionConcursos();

    conx.bajaConcurso(req.params.id)
        .then(msg => {
            console.log('Concurso eliminado correctamente!');
            res.status(200).json({ message: 'Concurso eliminado correctamente!', data: msg });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: 'Error al eliminar el concurso' });
        });
}

/**********************************************************************************************************************************
* Nombre consulta: mostrarConcursoId                                                                                              *
* Descripción: Esta consulta muestra un concurso en concreto(id) de la base de datos                                              *
* Parametros: id_concurso                                                                                                         *
* Pantalla: Concursos                                                                                                             *
* Rol: Aficionado                                                                                                                 *
**********************************************************************************************************************************/

const mostrarConcursoId = async (req = request, res = response) => {

    const conx = new ConexionConcursos();

    conx.mostrarConcursoId(req.params.id)
        .then(msg => {
            console.log('Concurso mostrado correctamente!');
            res.status(200).json({ message: 'Concurso mostrado correctamente!', data: msg });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: 'Error al mostrar el concurso' });
        });
}

/**********************************************************************************************************************************
* Nombre consulta: mostrarConcursoNombre                                                                                          *
* Descripción: Esta consulta muestra un concurso por su nombre de la base de datos                                                *
* Parametros: nombre                                                                                                              *
* Pantalla: Concursos                                                                                                             *
* Rol: Aficionado                                                                                                                 *
**********************************************************************************************************************************/

const mostrarConcursoNombre = async (req = request, res = response) => {

    const conx = new ConexionConcursos();

    conx.mostrarConcursoNombre(req.params.nombre)
        .then(msg => {
            console.log('Concurso mostrado correctamente!');
            res.status(200).json({ message: 'Concurso mostrado correctamente!', data: msg });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: 'Error al mostrar el concurso' });
        });
}

/**********************************************************************************************************************************
* Nombre consulta: mostrarConcursoPorActividad                                                                                    *
* Descripción: Esta consulta muestra el concurso al que pertenece la actividad de la base de datos                                *
* Parametros: id_actividad                                                                                                        *
* Nota: Mostrará los datos del concurso y de la actividad                                                                         *
* Pantalla: Actividades                                                                                                           *
* Rol: Aficionado                                                                                                                 *
**********************************************************************************************************************************/

const mostrarConcursoPorActividad = async (req = request, res = response) => {

    const conx = new ConexionConcursos();

    conx.mostrarConcursoPorActividad(req.params.id)
        .then(msg => {
            console.log('Concurso por actividad mostrado');
            res.status(200).json({ message: 'Concurso por actividad mostrado correctamente!', data: msg });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: 'Error al mostrar el concurso por actividad' });
        });
}

/**********************************************************************************************************************************
* Nombre consulta: getConcursoActividad                                                                                           *
* Descripción: Esta consulta muestra el concurso al que pertenece la actividad de la base de datos                                *
* Parametros: id_actividad                                                                                                        *
* Nota: Mostrará los datos del concurso solo                                                                                      *
* Pantalla: Actividades                                                                                                           *
* Rol: Aficionado                                                                                                                 *
**********************************************************************************************************************************/

const getConcursoActividad = async (req = request, res = response) => {

    const conx = new ConexionConcursos();

    conx.getConcursoActividad(req.params.id)
        .then(msg => {
            console.log('Concurso por actividad mostrado');
            res.status(200).json({ message: 'Concurso por actividad mostrado correctamente!', data: msg });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: 'Error al mostrar el concurso por actividad' });
        });
}

/**********************************************************************************************************************************
* Nombre consulta: verParticipantesConcurso                                                                                       *
* Descripción: Esta consulta muestra los participantes de un concurso concreto de la base de datos                                *
* Parametros: id_concurso                                                                                                         *
* Pantalla: Concursos y Registrar contacto                                                                                        *
* Rol: Aficionado                                                                                                                 *
**********************************************************************************************************************************/

const verParticipantesConcurso = async (req = request, res = response) => {

    const conx = new ConexionConcursos();

    conx.verParticipantesConcurso(req.params.id)
        .then(msg => {
            console.log('Participantes del concurso mostrados');
            res.status(200).json({ message: 'Participantes del concurso mostrados correctamente!', data: msg });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: 'Error al mostrar los participantes del concurso' });
        });
}

module.exports = {
    getConcursosAficionado,
    mostrarConcursos,
    mostrarConcursosTerminados,
    mostrarConcursosPendientes,
    altaConcurso,
    modificarConcurso,
    terminarConcurso,
    bajaConcurso,
    mostrarConcursoId,
    mostrarConcursoNombre,
    mostrarConcursoPorActividad,
    getConcursoActividad,
    verParticipantesConcurso
}
