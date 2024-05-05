const Conexion = require('./ConexionSequelize');
const { Sequelize, Op } = require('sequelize');
const models = require('../models/index.js');

class ConcursosConexion {

    constructor() {
        this.conexion = new Conexion();
    }

    conectar = () => {
        this.conexion.conectar();
    }

    desconectar = () => {
        this.conexion.desconectar();
    }

    /************************************************************************************************************************************
    * Nombre consulta: getConcursosAficionado                                                                                           *
    * Descripción: Esta consulta obtiene los concursos de un usuario aficionado de la base de datos                                     *  
    * Parametros: id_usuario                                                                                                            *  
    * Pantalla: Perfil                                                                                                                  *
    * Rol: Aficionado                                                                                                                   *
    ************************************************************************************************************************************/

    getConcursosAficionado = async (id_usuario) => {
        try {
            this.conectar();
            const concursos = await models.ActividadPrincipal.findAll({
                where: {
                    completada: true,
                    deleted_at: null
                },
                include: [
                    {
                        model: models.Usuario,
                        as: 'act_principales_usuario',
                        where: { id: id_usuario },
                        through: {
                            model: models.usuario_principal,
                            attributes: [],
                        },
                        attributes: [],
                    }

                ]
            });
            this.desconectar();
            return concursos;
        } catch (error) {
            this.desconectar();
            console.error('Error al mostrar los concursos del aficionado', error);
            throw error;
        }
    }

    /**********************************************************************************************************************************
    * Nombre consulta: mostrarConcursos                                                                                               *
    * Descripción: Esta consulta obtiene todos los concursos de la base de datos                                                      *
    * Parametros: Ninguno                                                                                                             *
    * Pantalla: Concursos                                                                                                             *
    * Rol: Aficionado                                                                                                                 *
    **********************************************************************************************************************************/

    mostrarConcursos = async () => {
        try {
            this.conectar();
            const actividades = await models.ActividadPrincipal.findAll({
                where: {
                    completada: false,
                    deleted_at: null
                }
            });
            this.desconectar();
            return actividades;
        } catch (error) {
            this.desconectar();
            console.error('Error al mostrar los concursos', error);
            throw error;
        }
    }

    /**********************************************************************************************************************************
    * Nombre consulta: mostrarConcursosTerminados                                                                                     *
    * Descripción: Esta consulta obtiene todos los concursos terminados de la base de datos                                           *
    * Parametros: Ninguno                                                                                                             *
    * Pantalla: Concursos                                                                                                             *
    * Rol: Aficionado                                                                                                                 *
    **********************************************************************************************************************************/

    mostrarConcursosTerminados = async () => {
        try {
            let actividades = [];
            this.conectar();
            actividades = await models.ActividadPrincipal.findAll({
                where: {
                    completada: true,
                    deleted_at: null
                }
            });
            this.desconectar();
            return actividades;
        } catch (error) {
            this.desconectar();
            console.error('Error al mostrar los concursos terminados', error);
            throw error;
        }
    }

    /**********************************************************************************************************************************
    * Nombre consulta: mostrarConcursosPendientes                                                                                     *
    * Descripción: Esta consulta obtiene todos los concursos pendientes de la base de datos                                           *
    * Parametros: Ninguno                                                                                                             *
    * Pantalla: Concursos                                                                                                             *
    * Rol: Aficionado                                                                                                                 *
    **********************************************************************************************************************************/

    mostrarConcursosPendientes = async () => {
        try {
            let actividades = [];
            this.conectar();
            actividades = await models.ActividadPrincipal.findAll({
                where: {
                    completada: false,
                    deleted_at: null
                }
            });
            this.desconectar();
            return actividades;
        } catch (error) {
            this.desconectar();
            console.error('Errror al mostrar los concursos pendientes', error);
            throw error;
        }
    }

    /**********************************************************************************************************************************
    * Nombre consulta: altaConcurso                                                                                                   *
    * Descripción: Esta consulta permite registrar un nuevo concurso en la base de datos                                              *
    * Parametros: nombre, descripcion, url_foto, completada, solucion                                                                 *
    * Pantalla: Concursos                                                                                                             *
    * Rol: Administrador                                                                                                              *
    **********************************************************************************************************************************/

    altaConcurso = async (body) => {
        try {
            let actividad = 0;
            this.conectar();
            const actividadNueva = await models.ActividadPrincipal.create(body);
            actividad = actividadNueva;
            this.desconectar();
            return actividad
        } catch (error) {
            this.desconectar();
            console.error('Error al dar de alta el concurso', error);
            throw error;
        }
    }

    /**********************************************************************************************************************************
    * Nombre consulta: modificarConcurso                                                                                              *
    * Descripción: Esta consulta permite modificar un concurso en la base de datos                                                    *
    * Parametros: id, nombre, descripcion, url_foto, completada, solucion                                                             *
    * Pantalla: Concursos                                                                                                             *
    * Rol: Administrador                                                                                                              *
    **********************************************************************************************************************************/

    modificarConcurso = async (id, body) => {
        try {
            this.conectar();
            let actividad = await models.ActividadPrincipal.findByPk(id);
            if (!actividad) {
                this.desconectar();
                throw error;
            }
            await actividad.update(body);
            this.desconectar();
            return actividad;
        } catch (error) {
            this.desconectar();
            console.error('Error al modificar el concurso', error);
            throw error;
        }
    }

    /**********************************************************************************************************************************
    * Nombre consulta: terminarConcurso                                                                                               *
    * Descripción: Esta consulta permite terminar un concurso de la base de datos                                                     *
    * Parametros: id_concurso                                                                                                         *
    * Pantalla: Concursos                                                                                                             *
    * Rol: Administrador                                                                                                              *
    **********************************************************************************************************************************/

    terminarConcurso = async (id_concurso) => {
        try {
            this.conectar();
            let actividad = await models.ActividadPrincipal.findByPk(id_concurso);
            if (!actividad) {
                this.desconectar();
                throw error;
            }
            await actividad.update({ completada: true });
            this.desconectar();
            return actividad;
        } catch (error) {
            this.desconectar();
            console.error('Error al terminar el concurso', error);
            throw error;
        }
    }

    /**********************************************************************************************************************************
    * Nombre consulta: bajaConcurso                                                                                                   *
    * Descripción: Esta consulta permite eliminar un concurso en la base de datos                                                     *
    * Parametros: id_concurso                                                                                                         *
    * Pantalla: Concursos                                                                                                             *
    * Rol: Administrador                                                                                                              *
    **********************************************************************************************************************************/

    bajaConcurso = async (id_concurso) => {
        try {
            this.conectar();
            let actividad = await models.ActividadPrincipal.findByPk(id_concurso);
            if (!actividad) {
                this.desconectar();
                throw error;
            }
            await actividad.destroy();
            this.desconectar();
            return actividad;
        } catch (error) {
            this.desconectar();
            console.error('Error al dar de baja el concurso', error);
        }
    }

    /**********************************************************************************************************************************
    * Nombre consulta: mostrarConcursoId                                                                                              *
    * Descripción: Esta consulta muestra un concurso en concreto(id) de la base de datos                                              *
    * Parametros: id_concurso                                                                                                         *
    * Pantalla: Concursos                                                                                                             *
    * Rol: Aficionado                                                                                                                 *
    **********************************************************************************************************************************/

    mostrarConcursoId = async (id_concurso) => {
        try {
            this.conectar();
            const actividad = await models.ActividadPrincipal.findByPk(id_concurso);
            this.desconectar();
            return actividad
        } catch (error) {
            this.desconectar();
            console.error('error al mostrar el concurso', error);
            throw error;
        }
    }

    /**********************************************************************************************************************************
    * Nombre consulta: mostrarConcursoNombre                                                                                          *
    * Descripción: Esta consulta muestra un concurso por su nombre de la base de datos                                                *
    * Parametros: nombre                                                                                                              *
    * Pantalla: Concursos                                                                                                             *
    * Rol: Aficionado                                                                                                                 *
    **********************************************************************************************************************************/

    mostrarConcursoNombre = async (nombre) => {
        try {
            this.conectar();
            const actividades = await models.ActividadPrincipal.findAll({
                where: {
                    nombre: {
                        [models.Sequelize.Op.like]: '%' + nombre + '%'
                    },
                    deleted_at: null
                }
            });
            this.desconectar();
            return actividades;
        } catch (error) {
            this.desconectar();
            console.error('Error al mostrar el concurso', error);
            throw error;
        }
    }
    //TODO:ELIMINAR YA SE HACE EN ACTIVIDAD.CONEXION MOSTRAR ACTIVIDADES QUE SE MUETSRA SU CONCURSO TAMB
    /**********************************************************************************************************************************
    * Nombre consulta: mostrarConcursoPorActividad                                                                                    *
    * Descripción: Esta consulta muestra el concurso al que pertenece la actividad de la base de datos                                *
    * Parametros: id_actividad                                                                                                        *
    * Nota: Mostrará los datos del concurso y de la actividad                                                                         *
    * Pantalla: Actividades                                                                                                           *
    * Rol: Aficionado                                                                                                                 *
    **********************************************************************************************************************************/

    mostrarConcursoPorActividad = async (id_actividad) => {
        try {
            this.conectar();
            const actividadSecundaria = await models.ActividadSecundaria.findOne({
                where: {
                    id: id_actividad,
                    deleted_at: null
                },
                include: [
                    {
                        model: models.PrincipalesSecundarias,
                        as: 'principales_secundarias',
                        include: [
                            {
                                model: models.ActividadPrincipal,
                                as: 'actividad_principal'
                            }
                        ]
                    }
                ]
            });
            this.desconectar();
            return actividadSecundaria;
        } catch (error) {
            this.desconectar();
            console.error('Error al mostrar el concurso de la actividad', error);
            throw error;
        }
    }
    //TODO:ELIMINAR YA SE HACE EN ACTIVIDAD.CONEXION MOSTRAR ACTIVIDADES QUE SE MUETSRA SU CONCURSO TAMB
    /**********************************************************************************************************************************
    * Nombre consulta: getConcursoActividad                                                                                           *
    * Descripción: Esta consulta muestra el concurso al que pertenece la actividad de la base de datos                                *
    * Parametros: id_actividad                                                                                                        *
    * Nota: Mostrará los datos del concurso solo                                                                                      *
    * Pantalla: Actividades                                                                                                           *
    * Rol: Aficionado                                                                                                                 *
    **********************************************************************************************************************************/

    getConcursoActividad = async (id_actividad) => {
        try {
            const concurso = await models.PrincipalesSecundarias.findOne({
                where: { id_secundaria: id_actividad },
                attributes: [],
                include: {
                    model: models.ActividadPrincipal,
                    as: 'principal'
                }
            });
            if (concurso) {
                return concurso;
            } else {
                throw new Error('Concurso no encontrado');
            }
        } catch (error) {
            console.error('Error al mostrar el concurso de la actividad', error);
            throw error;
        }
    }

    /**********************************************************************************************************************************
    * Nombre consulta: verParticipantesConcurso                                                                                       *
    * Descripción: Esta consulta muestra los participantes de un concurso concreto de la base de datos                                *
    * Parametros: id_concurso                                                                                                         *
    * Pantalla: Concursos y Registrar contacto                                                                                        *
    * Rol: Aficionado                                                                                                                 *
    **********************************************************************************************************************************/

    verParticipantesConcurso = async (id_concurso) => {
        try {
            this.conectar();
            const usuariosConcurso = await models.Usuario_secundarias.findAll({
                where: {
                    deleted_at: null
                },
                include: [
                    {
                        model: models.Usuario,
                        as: 'usuario_secundarias_secundarias',
                        where: {
                            deleted_at: null
                        },
                        attributes: ['nombre', 'email', 'apellido_uno', 'apellido_dos', 'url_foto', 'id_examen'],
                    },
                    {
                        model: models.ActividadPrincipal,
                        as: 'act_principal',
                        where: {
                            id: id_concurso,
                            deleted_at: null
                        },
                        attributes: ['nombre'],
                    }
                ],
                attributes: []
            });
            this.desconectar();
            return usuariosConcurso;
        } catch (error) {
            this.desconectar();
            console.error('Error al mostrar los participantes del concurso', error);
            throw error;
        }
    }

/*******************************************************************************************************************************************
 * Nombre consulta: getTotalConcursosParticipado                                                                                           *
 * Descripción: Esta consulta permite obtener el total de concursos en las que ha participado un usuario concreto de la base de datos      *
 * Parametros: id_usuario                                                                                                                  *
 * Pantalla: Perfil                                                                                                                        *
 * Rol: Aficionado                                                                                                                         *
 * ****************************************************************************************************************************************/

getTotalConcursosParticipado = async (id_usuario) => {
        try {
            this.conectar();
            const actividades = await models.usuario_principal.count({
                where: { id_usuario: id_usuario }
            });
            return actividades;
        } catch (error) {
            this.desconectar();
            console.error('Error al obtener el total de actividades', error);
            throw error;
        }
    }

}

module.exports = ConcursosConexion;