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
    * Pantalla: Concursos y Actividades (selector varios contactos)                                                                   *
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
    * Parametros: id_principal                                                                                                        *
    * Pantalla: Concursos                                                                                                             *
    * Rol: Administrador                                                                                                              *
    **********************************************************************************************************************************/

    terminarConcurso = async (id_principal) => {
        try {
            this.conectar();
            let actividad = await models.ActividadPrincipal.findByPk(id_principal);
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
    * Parametros: id_principal                                                                                                        *
    * Pantalla: Concursos                                                                                                             *
    * Rol: Administrador                                                                                                              *
    **********************************************************************************************************************************/

    bajaConcurso = async (id_principal) => {
        try {
            this.conectar();
            let actividad = await models.ActividadPrincipal.findByPk(id_principal);
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
    * Parametros: id_principal                                                                                                         *
    * Pantalla: Concursos                                                                                                             *
    * Rol: Aficionado                                                                                                                 *
    **********************************************************************************************************************************/

    mostrarConcursoId = async (id_principal) => {
        try {
            this.conectar();
            const actividad = await models.ActividadPrincipal.findByPk(id_principal);
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

    /**********************************************************************************************************************************
    * Nombre consulta: verParticipantesConcurso                                                                                       *
    * Descripción: Esta consulta muestra los participantes de un concurso concreto de la base de datos                                *
    * Parametros: id_principal                                                                                                        *
    * Pantalla: Concursos y Registrar contacto                                                                                        *
    * Rol: Aficionado                                                                                                                 *
    **********************************************************************************************************************************/

    verParticipantesConcurso = async (id_principal) => {
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
                        attributes: ['nombre', 'url_foto', 'id_examen'],
                    },
                    {
                        model: models.ActividadPrincipal,
                        as: 'act_principal',
                        where: {
                            id: id_principal,
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

    /**********************************************************************************************************************************
    * Nombre consulta: getActividadesPorConcurso                                                                                      *
    * Descripción: Esta consulta obtiene las actividades de varios contactos asociadas a un concurso específico de la base de datos   *
    * Parametros: id_principal                                                                                                        * 
    * Pantalla: Concursos (modal)                                                                                                     *   
    * Rol: Aficionado                                                                                                                 *
    **********************************************************************************************************************************/

    getActividadesPorConcurso = async (id_principal) => {
        try {
            this.conectar();

            const actividadesSecundarias = await models.ActividadSecundaria.findAll({
                attributes: ['id', 'nombre', 'url_foto', 'localizacion', 'fecha', 'frecuencia', 'banda', 'completada'],
                include: [
                    {
                        model: models.PrincipalesSecundarias,
                        as: 'principales_secundarias',
                        where: {
                            id_principal: id_principal,
                            deleted_at: null
                        },
                        attributes: [],
                    },
                    {
                        model: models.Modalidad,
                        as: 'modalidad',
                        attributes: ['descripcion']
                    },
                    {
                        model: models.Modos_trabajo,
                        as: 'modo',
                        attributes: ['nombre']
                    }
                ]
            });

            this.desconectar();
            return actividadesSecundarias;
        } catch (error) {
            this.desconectar();
            console.error('Error al mostrar las actividades de varios contactos de un concurso', error);
            throw error;
        }
    }
}

module.exports = ConcursosConexion;