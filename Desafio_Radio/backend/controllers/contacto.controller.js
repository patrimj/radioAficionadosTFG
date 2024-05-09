const { response, request } = require('express');
const ConexionContacto = require('../database/contacto.conexion');

/**********************************************************************************************************************************
* Nombre consulta: registrarContacto                                                                                              *
* Descripción: Esta consulta permite registrar a un contacto en una actividad o concurso en la base de datos                      *
* Nota: si es registrar en una actividad de un concurso (varios contactos) o si es registrar en una actividad (un unico contacto) *
* Parametros: id_usuario, id_secundaria                                                                                           *
* Pantalla: Registrar contacto                                                                                                    *
* Rol: Operador                                                                                                                   *
**********************************************************************************************************************************/

const registrarContacto = async (req = request, res = response) => {

    const conx = new ConexionContacto();

    conx.registrarContacto(req.body)
        .then(msg => {
            console.log('Contacto registrado correctamente');
            res.status(200).json({ message: 'Contacto registrado correctamente!', data: msg });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: "Error al registrar el contacto." })
        });
}

/**********************************************************************************************************************************
* Nombre consulta: getUsuarios                                                                                                    *
* Descripción: Esta consulta permite ver los usuarios registrados previamente en la base de datos                                 * 
* Nota: el usuario se identificará con el id_examen al operador en el contacto (llamada)                                          *
* Pantalla: Registrar contacto (selector de usuarios)                                                                             *
* Rol: Operador                                                                                                                   *
**********************************************************************************************************************************/

const getUsuarios = async (req = request, res = response) => {

    const conx = new ConexionContacto();

    conx.getUsuarios()
        .then(usuarios => {
            console.log('Usuarios obtenidos correctamente');
            res.status(200).json({ message: 'Usuarios obtenidos correctamente!', data: usuarios });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: "Error al obtener los usuarios." })
        });
}

/**********************************************************************************************************************************
 * Nombre consulta: getConcursosContacto                                                                                          *
 * Descripción: Esta consulta permite ver los concursos registrados previamente en la base de datos                               *
 * Pantalla: Registrar contacto (selector de concursos)                                                                           *
 * Rol: Operador                                                                                                                  *
 *********************************************************************************************************************************/

const getConcursosContacto = async (req = request, res = response) => {

    const conx = new ConexionContacto();

    conx.getConcursos()
        .then(concursos => {
            console.log('Concursos obtenidos correctamente');
            res.status(200).json({ message: 'Concursos obtenidos correctamente!', data: concursos });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: "Error al obtener los concursos." })
        });
}

/**********************************************************************************************************************************
 * Nombre consulta: getSolucionConcurso                                                                                           *
 * Descripción: Esta consulta permite ver la solución de un concurso en concreto en la base de datos                              *
 * Parametros: id_principal                                                                                                       *
 * Pantalla: Registrar contacto                                                                                                   *
 * Rol: Operador                                                                                                                  *
**********************************************************************************************************************************/

const getSolucionConcurso = async (req = request, res = response) => {

    const conx = new ConexionContacto();
    const { id_principal } = req.params;

    conx.getSolucionConcurso(id_principal)
        .then(solucion => {
            console.log('Solución obtenida correctamente');
            res.status(200).json({ message: 'Solución obtenida correctamente!', data: solucion });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: "Error al obtener la solución del concurso." })
        });
}

/**********************************************************************************************************************************
* Nombre consulta: getActividadesVariosContactos                                                                                  *
* Descripción: Esta consulta obtiene las actividades de varios contactos asociadas a un concurso específico de la base de datos   *
* Parametros: id_principal                                                                                                        * 
* Pantalla: Perfil y Concursos (modal)  y Registrar Contacto                                                                      *
* Rol: Aficionado                                                                                                                 *
**********************************************************************************************************************************/

const getActividadesVariosContactos = async (req = request, res = response) => {

    const conx = new ConexionContacto();
    const { id_principal } = req.params;

    conx.getActividadesVariosContactos(id_principal)
        .then(actividadesSecundarias => {
            console.log('Actividades secundarias obtenidas correctamente');
            res.status(200).json({ message: 'Actividades secundarias obtenidas correctamente!', data: actividadesSecundarias });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: "Error al obtener las actividades secundarias." })
        });
}

/**********************************************************************************************************************************
 * Nombre consulta: getPremioActividad                                                                                            *
 * Descripción: Esta consulta obtiene el premio de una actividad específica de la base de datos                                   *
 * Parametros: id_secundaria                                                                                                       *
 * Pantalla: Registrar Contacto                                                                                                   *
 * Rol: Aficionado                                                                                                                *
 **********************************************************************************************************************************/

const getPremioActividad = async (req = request, res = response) => {

    const conx = new ConexionContacto();
    const { id_secundaria } = req.params;

    conx.getPremioActividad(id_secundaria)
        .then(premio => {
            console.log('Premio obtenido correctamente');
            res.status(200).json({ message: 'Premio obtenido correctamente!', data: premio });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: "Error al obtener el premio de la actividad." })
        });
}

/**********************************************************************************************************************************
* Nombre consulta: getPremiosUsuarioConcurso                                                                                      *
* Descripción: Esta consulta permite ver los premios de un usuario en concreto en un concurso de la base de datos                 *
* Parametros: id_usuario, id_principal                                                                                            *
* Nota Para asignarle premios que no tiene                                                                                        *  
* Pantalla: Registrar contacto                                                                                                    *
* Rol: Operador                                                                                                                   *
**********************************************************************************************************************************/

const getPremiosUsuarioConcurso = async (req = request, res = response) => {

    const conx = new ConexionContacto();
    const { id_usuario, id_principal } = req.params;

    conx.getPremiosUsuarioConcurso(id_usuario, id_principal)
        .then(premios => {
            console.log('Premios obtenidos correctamente');
            res.status(200).json({ message: 'Premios obtenidos correctamente!', data: premios });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: "Error al obtener los premios del usuario en el concurso." })
        });
}

/**********************************************************************************************************************************
 * Nombre consulta: getActividadesContacto                                                                                        *
 * Descripción: Esta consulta permite ver las actividades registradas previamente en la base de datos                             *
 * Pantalla: Registrar contacto                                                                                                   *
 * Rol: Operador                                                                                                                  *
 *********************************************************************************************************************************/

const getActividadesContacto = async (req = request, res = response) => {

    const conx = new ConexionContacto();

    conx.getActividadesContacto()
        .then(actividades => {
            console.log('Actividades obtenidas correctamente');
            res.status(200).json({ message: 'Actividades obtenidas correctamente!', data: actividades });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: "Error al obtener las actividades." })
        });
}

/**********************************************************************************************************************************
 * Nombre consulta: getContactosConDetalles                                                                                       *
 * Descripción: Esta consulta permite ver los contactos registrados previamente en la base de datos con sus detalles              *
 * Pantalla: Registrar contacto                                                                                                   *
 * Rol: Operador                                                                                                                  *
 *********************************************************************************************************************************/

const getContactosConDetalles = async (req = request, res = response) => {

    const conx = new ConexionContacto();

    conx.getContactosConDetalles()
        .then(contactos => {
            console.log('Contactos obtenidos correctamente');
            res.status(200).json({ message: 'Contactos obtenidos correctamente!', data: contactos });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: "Error al obtener los contactos." })
        });
}

/**********************************************************************************************************************************
 * Nombre consulta: getModalidadActividad                                                                                         *
 * Descripción: Esta consulta permite ver la modalidad de una actividad en concreto en la base de datos                           *
 * Parametros: id_secundaria                                                                                                      *
 * Pantalla: Registrar contacto                                                                                                   *
 * Rol: Operador                                                                                                                  *
 *********************************************************************************************************************************/

const getModalidadActividad = async (req = request, res = response) => {

    const conx = new ConexionContacto();

    conx.getModalidadActividad(req.params.id_secundaria)
        .then(modalidad => {
            console.log('Modalidad obtenida correctamente');
            res.status(200).json({ message: 'Modalidad obtenida correctamente!', data: modalidad });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: "Error al obtener la modalidad de la actividad." })
        });
}

module.exports = {
    registrarContacto,
    getUsuarios,
    getConcursosContacto,
    getSolucionConcurso,
    getActividadesVariosContactos,
    getPremioActividad,
    getPremiosUsuarioConcurso,
    getActividadesContacto,
    getContactosConDetalles,
    getModalidadActividad
}
