const Conexion = require('./ConexionSequelize');
const { Sequelize, Op } = require('sequelize');
const models = require('../models/index.js');

class ActividadConexion {

    constructor() {
        this.conexion = new Conexion();
    }

    conectar = () => {
        this.conexion.conectar();
    }

    desconectar = () => {
        this.conexion.desconectar();
    }

    /************************************************************************************************************************
    * Nombre consulta: getActividadesUnicoContactoAficionado                                                                *
    * Descripción: Esta consulta obtiene las actividades de un unico contacto de un usuario aficionado de la base de datos  *
    * Parametros: id_usuario                                                                                                *
    * Pantalla: Perfil                                                                                                      *  
    * Rol: Aficionado                                                                                                       *  
    ************************************************************************************************************************/

    getActividadesUnicoContactoAficionado = async (id_usuario) => {
        try {
            this.conectar();

            const actividadesSecundariasAsociadas = await models.PrincipalesSecundarias.findAll({
                attributes: ['id_secundaria'],
            });

            const actividadesSecundarias = await models.ActividadSecundaria.findAll({
                where: {
                    id: { [models.Sequelize.Op.notIn]: actividadesSecundariasAsociadas.map(a => a.id_secundaria) },
                    '$act_secundarias_usuario.id_usuario$': id_usuario,
                    completada: true,
                    deleted_at: null
                },
                include: [
                    {
                        model: models.Usuario_secundarias,
                        as: 'act_secundarias_usuario',
                        attributes: [],
                    }
                ]
            });

            this.desconectar();
            return actividadesSecundarias;
        } catch (error) {
            this.desconectar();
            console.error('Error al mostrar las actividades de un unico contacto de un usuario', error);
            throw error;
        }
    }

    /************************************************************************************************************************
    * Nombre consulta: getActividadesVariosContactosAficionado                                                              *
    * Descripción: Esta consulta obtiene todas las actividades de varios contactos que pertenece a un concurso              *
    * Parametros: id_usuario                                                                                                *
    * Pantalla: Perfil                                                                                                      *
    * Rol: Aficionado                                                                                                       *
    ************************************************************************************************************************/

    getActividadesVariosContactosAficionado = async (id_usuario) => {
        try {
            this.conectar();

            const actividadesSecundariasAsociadas = await models.PrincipalesSecundarias.findAll({
                attributes: ['id_secundaria'],
            });

            const actividadesSecundarias = await models.ActividadSecundaria.findAll({
                where: {
                    id: { [models.Sequelize.Op.in]: actividadesSecundariasAsociadas.map(a => a.id_secundaria) },
                    '$act_secundarias_usuario.id_usuario$': id_usuario,
                    completada: true,
                    deleted_at: null
                },
                include: [
                    {
                        model: models.Usuario_secundarias,
                        as: 'act_secundarias_usuario',
                        attributes: [],
                    }
                ]
            });

            this.desconectar();
            return actividadesSecundarias;
        } catch (error) {
            this.desconectar();
            console.error('Error al mostrar las actividades de varios contactos de un usuario', error);
            throw error;
        }
    }

    /**********************************************************************************************************************************
    * Nombre consulta: getActividadesPorConcurso                                                                                      *
    * Descripción: Esta consulta obtiene las actividades de varios contactos asociadas a un concurso específico de la base de datos   *
    * Parametros: id_concurso                                                                                                         * 
    * Pantalla: Perfil y Concursos (modal)                                                                                            *
    * Rol: Aficionado                                                                                                                 *
    **********************************************************************************************************************************/

    getActividadesPorConcurso = async (id_concurso) => {
        try {
            this.conectar();

            const actividadesSecundarias = await models.ActividadSecundaria.findAll({
                include: [
                    {
                        model: models.PrincipalesSecundarias,
                        as: 'principales_secundarias',
                        where: {
                            id_principal: id_concurso,
                            deleted_at: null
                        },
                        attributes: [],
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

    /**********************************************************************************************************************************
    * Nombre consulta: mostrarActividades                                                                                             *
    * Descripción: Esta consulta muestra todas las actividades de la base de datos                                                    *
    * Parametros: Ninguno                                                                                                             *
    * Pantalla: Actividades                                                                                                           *
    * Rol: Aficionado                                                                                                                 *
    **********************************************************************************************************************************/

    mostrarActividades = async () => {
        try {
            let actividades = [];
            this.conectar();
            actividades = await models.ActividadSecundaria.findAll({
                where: {
                    deleted_at: null
                },
                include: [
                    {
                        model: models.Modalidad,
                        as: 'modalidad',
                        attributes: ['descripcion']
                    }
                ]
            });
            this.desconectar();
            return actividades;
        } catch (error) {
            this.desconectar();
            console.error('Error al mostrar todas las actividades:', error);
            throw error;
        }
    }

    /**********************************************************************************************************************************
    * Nombre consulta: mostrarActividadesTerminadas                                                                                   *
    * Descripción: Esta consulta muestra todas las actividades terminadas de la base de datos                                         *
    * Parametros: Ninguno                                                                                                             *
    * Pantalla: Actividades                                                                                                           *
    * Rol: Aficionado                                                                                                                 *
    **********************************************************************************************************************************/

    mostrarActividadesTerminadas = async () => {
        try {
            let actividades = [];
            this.conectar();
            actividades = await models.ActividadSecundaria.findAll({
                where: {
                    completada: true,
                    deleted_at: null
                },
                include: [
                    {
                        model: models.Modalidad,
                        as: 'modalidad',
                        attributes: ['descripcion']
                    }
                ]
            });
            this.desconectar();
            return actividades;
        } catch (error) {
            this.desconectar();
            console.error('Error al mostrar las actividades terminadas', error);
            throw error;
        }
    }

    /**********************************************************************************************************************************
    * Nombre consulta: mostrarActividadesPendientes                                                                                   *
    * Descripción: Esta consulta muestra todas las actividades pendientes de la base de datos                                         *
    * Parametros: Ninguno                                                                                                             *
    * Pantalla: Actividades                                                                                                           *
    * Rol: Aficionado                                                                                                                 *
    **********************************************************************************************************************************/

    mostrarActividadesPendientes = async () => {
        try {
            let actividades = [];
            this.conectar();
            actividades = await models.ActividadSecundaria.findAll({
                where: {
                    completada: false,
                    deleted_at: null
                },
                include: [
                    {
                        model: models.Modalidad,
                        as: 'modalidad',
                        attributes: ['descripcion']
                    }
                ]
            });
            this.desconectar();
            return actividades;
        } catch (error) {
            this.desconectar();
            console.error('Error al mostrar las actividades pendientes', error);
            throw error;
        }
    }

    /**********************************************************************************************************************************
     * Nombre consulta: terminarActividad                                                                                             *
     * Descripción: Esta consulta permite terminar una actividad de la base de datos                                                  *
     * Parametros: id_actividad                                                                                                       *
     * Pantalla: Actividades                                                                                                          *
     * Rol: Operador                                                                                                                  *
     * *******************************************************************************************************************************/

    terminarActividad = async (id_actividad) => {
        try {
            this.conectar();
            let actividad = await models.ActividadSecundaria.findByPk(id_actividad);
            if (!actividad) {
                this.desconectar();
                throw error;
            }
            await actividad.update({ completada: true });
            this.desconectar();
            return actividad;
        } catch (error) {
            this.desconectar();
            console.error('Error al terminar la actividad', error);
            throw error;
        }
    }

    /**********************************************************************************************************************************
    * Nombre consulta: mostrarActividadId                                                                                             *
    * Descripción: Esta consulta muestra una actividad en concreto(id) de la base de datos                                            *
    * Parametros: id_actividad                                                                                                        *
    * Pantalla: Actividades                                                                                                           *
    * Rol: Aficionado                                                                                                                 *
    **********************************************************************************************************************************/

    mostrarActividadId = async (id_actividad) => {
        this.conectar();

        let contacto = await models.ActividadSecundaria.findOne({
            where: {
                id: id_actividad,
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'deletedAt']
            },
            include: [
                {
                    model: models.Modalidad,
                    as: 'modalidad'
                }
            ]
        });
        if (contacto) {
            return contacto;
        } else {
            this.desconectar();
            console.error('Error al mostrar la actividad', error);
            throw error;
        }
    }

    /**********************************************************************************************************************************
    * Nombre consulta: mostrarActividadNombre                                                                                         *
    * Descripción: Esta consulta muestra una actividad por su nombre de la base de datos                                              *
    * Parametros: nombre                                                                                                              *
    * Pantalla: Actividades                                                                                                           *
    * Rol: Aficionado                                                                                                                 *
    **********************************************************************************************************************************/

    mostrarActividadNombre = async (nombre) => {
        try {
            this.conectar();
            const actividades = await models.ActividadSecundaria.findAll({
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
            console.error('Error al mostrar la actividad', error);
            throw error;
        }
    }

    /*************************************************************************************************************************************
     * Nombre consulta: mostrarActividadSinConcurso                                                                                      *
     * Descripción: Esta consulta permite mostrar las actividades que no pertenecen a un concurso de la base de datos                    *
     * Parametros: Ninguno                                                                                                               *     
     * Pantalla: Actividades                                                                                                             *
     * Rol: Aficionado                                                                                                                   *
     * **********************************************************************************************************************************/

    mostrarActividadSinConcurso = async () => {
        try {
            const actividades = await ActividadSecundaria.findAll({
                where: {
                    [Op.notIn]: Sequelize.literal(`(SELECT id_secundaria FROM principales_secundarias)`),
                    deleted_at: null
                },
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'deletedAt']
                },
                include: [
                    {
                        model: models.Modalidad,
                        as: 'modalidad'
                    }
                ]
            });
            return actividades;
        } catch (error) {
            console.error('Error al mostrar las actividades secundarias sin actividad principal', error);
            throw error;
        }
    }

    /***********************************************************************************************************************************
     * Nombre consulta: mostrarActividadPorIdConcurso                                                                                  *
     * Descripción: Esta consulta permite mostrar las actividades que pertenecen a un concurso en particular de la base de datos       *
     * Parametros: id_concurso                                                                                                         *
     * Pantalla: Actividades                                                                                                           *
     * Rol: Aficionado                                                                                                                 *
     ***********************************************************************************************************************************/

    mostrarActividadPorIdConcurso = async (id_concurso) => {
        try {
            const secundarias = await PrincipalesSecundarias.findAll({
                where: {
                    id_principal: id_concurso,
                    deleted_at: null
                },
                include: [
                    {
                        model: ActividadSecundaria,
                        as: 'secundaria'
                    },
                    {
                        model: ActividadPrincipal,
                        as: 'principal'
                    },
                    {
                        model: models.Modalidad,
                        as: 'modalidad'
                    }
                ],
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'deletedAt']
                }
            });
            return secundarias;
        } catch (error) {
            console.error('Error al mostrar las actividades secundarias por ID de actividad principal', error);
            throw error;
        }
    }

    /************************************************************************************************************************************
     * Nombre consulta: mostrarActividadConConcurso                                                                                     *
     * Descripción: Esta consulta permite mostrar las actividades que pertenecen a un concurso en particular                            *
     * Parametros: Ninguno                                                                                                              *
     * Pantalla: Actividades                                                                                                            *
     * Rol: Aficionado                                                                                                                  *
     ***********************************************************************************************************************************/

    mostrarActividadConConcurso = async () => {
        try {
            const secundarias = await PrincipalesSecundarias.findAll({
                where: {
                    deleted_at: null
                },
                include: [
                    {
                        model: ActividadSecundaria,
                        as: 'secundaria'
                    },
                    {
                        model: ActividadPrincipal,
                        as: 'principal'
                    },
                    {
                        model: models.Modalidad,
                        as: 'modalidad'
                    }
                ],
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'deletedAt']
                }
            });
            return secundarias;
        } catch (error) {
            console.error('Error al mostrar las actividades secundarias con actividad principal', error);
            throw error;
        }
    }

    /**********************************************************************************************************************************
    * Nombre consulta: verParticipantesActividad                                                                                      *
    * Descripción: Esta consulta muestra los participantes de una actividad concreta de la base de datos                              *
    * Parametros: id_actividad                                                                                                        *
    * Pantalla: Actividades                                                                                                           *
    * Rol: Aficionado                                                                                                                 *
    **********************************************************************************************************************************/

    verParticipantesActividad = async (id_actividad) => {
        try {
            this.conectar();
            const usuariosActividad = await models.Usuario_secundarias.findAll({
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
                        model: models.ActividadSecundaria,
                        as: 'act_secundaria',
                        where: {
                            id: id_actividad,
                            deleted_at: null
                        },
                        attributes: ['nombre'],
                    }
                ],
                attributes: []
            });
            this.desconectar();
            return usuariosActividad;
        } catch (error) {
            this.desconectar();
            console.error('Error al mostrar los participantes de la actividad', error);
            throw error;
        }
    }

    /************************************************************************************************************************************
     * Nombre consulta: eliminarActividad                                                                                               *
     * Descripción: Esta consulta permite eliminar una actividad de la base de datos                                                    *
     * Parametros: id_actividad                                                                                                         *
     * Pantalla: Actividades                                                                                                            *
     * Rol: Operador                                                                                                                    *
     ***********************************************************************************************************************************/

    eliminarActividad = async (id_actividad) => {
        try {
            this.conectar();
            let actividad = await models.ActividadSecundaria.findByPk(id_actividad);
            if (actividad) {
                await actividad.destroy();
                return actividad;
            } else {
                this.desconectar();
                throw error;
            }
        } catch (error) {
            this.desconectar();
            console.error('Error al eliminar la actividad', error);
            throw error;
        }
    }

    /************************************************************************************************************************************
     * Nombre consulta: modificarActividad                                                                                              *
     * Descripción: Esta consulta permite modificar una actividad de la base de datos                                                   *
     * Parametros: id, nombre, url_foto, localizacion, fecha, frecuencia, banda, id_modo, id_modalidad, completada, id_operador         *                                                                                                             
     * Pantalla: Actividades                                                                                                            *
     * Rol: Operador                                                                                                                    *
     ***********************************************************************************************************************************/

    modificarActividad = async (id, body) => {
        try {
            this.conectar();
            let actividad = await models.ActividadSecundaria.findByPk(id);
            if (actividad) {
                await actividad.update(body);
                return actividad;
            } else {
                this.desconectar();
                throw error;
            }
        } catch (error) {
            this.desconectar();
            console.error('Error al modificar la actividad', error);
            throw error;
        }
    }

    /************************************************************************************************************************************
     * Nombre consulta: altaActividad                                                                                                   *
     * Descripción: Esta consulta permite crear una actividad de la base de datos                                                       *
     * Parametros: nombre, url_foto, localizacion, fecha, frecuencia, banda, id_modo, id_modalidad, completada, id_operador             *
     * Pantalla: Actividades                                                                                                            *
     * Rol: Operador                                                                                                                    *
     ***********************************************************************************************************************************/

    altaActividad = async (body) => {
        try {
            this.conectar();
            let actividad = await models.ActividadSecundaria.create(body);
            return actividad;
        } catch (error) {
            this.desconectar();
            console.error('Error al dar de alta una actividad', error);
            throw error;
        }
    }

    /************************************************************************************************************************************
     * Nombre consulta: getModalidades                                                                                                  *
     * Descripción: Esta consulta permite ver todas las modalidades que existen en la base de datos                                     *
     * Parametros: ninguno                                                                                                              *
     * Pantalla: Actividades                                                                                                            *
     * Rol: Operador                                                                                                                    *
     ***********************************************************************************************************************************/

    getModalidades = async () => {
        try {
            this.conectar();
            const modalidades = await models.Modalidad.findAll();
            return modalidades;
        } catch (error) {
            this.desconectar();
            console.error('Error al mostrar las modalidades', error);
            throw error;
        }
    }

}

module.exports = ActividadConexion;