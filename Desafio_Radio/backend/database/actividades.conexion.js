const Conexion = require('./ConexionSequelize');
const { Sequelize, Op } = require('sequelize');
const models = require('../models/index.js');
const ConexionSql = require("./conexionSql");
const conxSql = new ConexionSql();

class ActividadConexion {

    constructor() {
        this.conexion = new Conexion();
        this.conexionSql = new ConexionSql()
    }

    conectar = () => {
        this.conexion.conectar();
    }

    desconectar = () => {
        this.conexion.desconectar();
    }

    /************************************************************************************************************************************
    * Nombre consulta: getConcursosAficionado                                                                                          *
    * Descripción: Esta consulta obtiene los concursos de un usuario aficionado de la base de datos                                    *    
    * Pantalla: Perfil                                                                                                                 *
    * Rol: Aficionado                                                                                                                  *
    ************************************************************************************************************************************/

    getConcursosAficionado = async (id_usuario) => {
        try {
            this.conectar();
            const actividadesPrincipales = await models.ActividadPrincipal.findAll({
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
            return actividadesPrincipales;
        } catch (error) {
            this.desconectar();
            console.error('Error al mostrar los concursos del aficionado', error);
            throw error;
        }
    }

    /************************************************************************************************************************
    * Nombre consulta: getActividadesUnicoContactoAficionado                                                                *
    * Descripción: Esta consulta obtiene las actividades de un unico contacto de un usuario aficionado de la base de datos  *
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
    * Nombre consulta: mostrarConcursos                                                                                               *
    * Descripción: Esta consulta obtiene todos los concursos de la base de datos                                                      *
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
    * Pantalla: Concursos                                                                                                             *
    * Rol: Administrador                                                                                                              *
    **********************************************************************************************************************************/

    terminarConcurso = async (id) => {
        try {
            this.conectar();
            let actividad = await models.ActividadPrincipal.findByPk(id);
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
    * Pantalla: Concursos                                                                                                             *
    * Rol: Administrador                                                                                                              *
    **********************************************************************************************************************************/

    bajaConcurso = async (id) => {
        try {
            this.conectar();
            let actividad = await models.ActividadPrincipal.findByPk(id);
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
    * Pantalla: Concursos                                                                                                             *
    * Rol: Aficionado                                                                                                                 *
    **********************************************************************************************************************************/

    mostrarConcursoId = async (id) => {
        try {
            this.conectar();
            const actividad = await models.ActividadPrincipal.findByPk(id);
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
    * Nombre consulta: mostrarActividades                                                                                             *
    * Descripción: Esta consulta muestra todas las actividades de la base de datos                                                    *
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
     * Pantalla: Actividades                                                                                                           *
     * Rol: Operador                                                                                                                 *
     * **********************************************************************************************************************************/

    terminarActividad = async (id) => {
        try {
            this.conectar();
            let actividad = await models.ActividadSecundaria.findByPk(id);
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
    * Pantalla: Actividades                                                                                                           *
    * Rol: Aficionado                                                                                                                 *
    **********************************************************************************************************************************/

    mostrarActividadId = async (id) => {
        this.conectar();

        let contacto = await models.ActividadSecundaria.findOne({
            where: {
                id: id,
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
            throw error;
        }
    }

    /**********************************************************************************************************************************
    * Nombre consulta: mostrarActividadNombre                                                                                          *
    * Descripción: Esta consulta muestra una actividad por su nombre de la base de datos                                                *
    * Pantalla: Actividades                                                                                                             *
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
     * Nombre consulta: mostrarActividadSinConcurso                                                                                *
     * Descripción: Esta consulta permite mostrar las actividades que no pertenecen a un concurso de la base de datos                    *     
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
     * Nombre consulta: mostrarActividadPorIdConcurso                                                                              *
     * Descripción: Esta consulta permite mostrar las actividades que pertenecen a un concurso en particular de la base de datos       *
     * Pantalla: Actividades                                                                                                           *
     * Rol: Aficionado                                                                                                                 *
     ***********************************************************************************************************************************/

    mostrarActividadPorIdConcurso = async (idPrincipal) => {
        try {
            const secundarias = await PrincipalesSecundarias.findAll({
                where: {
                    id_principal: idPrincipal,
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
     * Nombre consulta: mostrarActividadConConcurso                                                                               *
     * Descripción: Esta consulta permite mostrar las actividades que pertenecen a un concurso en particular                            *
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
    * Nombre consulta: mostrarConcursoPorActividad                                                                                    *
    * Descripción: Esta consulta muestra el concurso al que pertenece la actividad de la base de datos                                *
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

    /**********************************************************************************************************************************
    * Nombre consulta: getConcursoActividad                                                                                           *
    * Descripción: Esta consulta muestra el concurso al que pertenece la actividad de la base de datos                                *
    * Nota: Mostrará los datos del concurso solo                                                                                      *
    * Pantalla: Actividades                                                                                                           *
    * Rol: Aficionado                                                                                                                 *
    **********************************************************************************************************************************/

    getConcursoActividad = async (id) => {
        try {
            const concurso = await models.PrincipalesSecundarias.findOne({
                where: { id_secundaria: id },
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
        }catch(error){
            console.error('Error al mostrar el concurso de la actividad', error);
            throw error;
        }
    }

    /**********************************************************************************************************************************
    * Nombre consulta: verParticipantesConcurso                                                                                       *
    * Descripción: Esta consulta muestra los participantes de un concurso concreto de la base de datos                                *
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

    /**********************************************************************************************************************************
    * Nombre consulta: verParticipantesActividad                                                                                      *
    * Descripción: Esta consulta muestra los participantes de una actividad concreta de la base de datos                              *
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

    /**********************************************************************************************************************************
    * Nombre consulta: crearContacto                                                                                                  *
    * Descripción: Esta consulta permite registrar a un contacto en la base de datos                                                  *
    * Pantalla: Registrar contacto                                                                                                    *
    * Rol: Operador                                                                                                                   *
    **********************************************************************************************************************************/

    registrarContacto = async (body) => {
        try {
            this.conectar();

            const usuario = await models.Usuario.findByPk(body.id_usuario);
            if (!usuario) {
                throw new Error('Usuario no encontrado');
            }

            const actividadSecundaria = await models.ActividadSecundaria.findByPk(body.id_secundaria);
            if (!actividadSecundaria) {
                throw new Error('Actividad no encontrada');
            }

            const contacto = await models.Usuario_secundarias.create(body);

            this.desconectar();
            return contacto;
        } catch (error) {
            this.desconectar();
            console.error('Error al crear el contacto', error);
            throw error;
        }
    }

    /**********************************************************************************************************************************
    * Nombre consulta: verContactos                                                                                                   *
    * Descripción: Esta consulta permite ver los contactos que se han registrado previamente en la base de datos                      * 
    * Pantalla: Registrar contacto                                                                                                    *
    * Rol: Operador                                                                                                                   *
    **********************************************************************************************************************************/

    verContactos = async () => {
        try {
            this.conectar();
            const contactos = await models.Usuario_secundarias.findAll({
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
                            deleted_at: null
                        },
                        attributes: ['nombre'],
                    }
                ],
                attributes: []
            });
            this.desconectar();
            return contactos;
        } catch (error) {
            this.desconectar();
            console.error('Error al mostrar los contactos', error);
            throw error;
        }
    }

    /**********************************************************************************************************************************
    * Nombre consulta: verificarRegistro                                                                                              *
    * Descripción: Esta consulta permite verificar si un usuario ya está registrado en una actividad específica en la base de datos   * 
    * Nota: Si existe devolverá true                                                                                                  *
    * Pantalla: Registrar contacto                                                                                                    *
    * Rol: Operador                                                                                                                   *
    **********************************************************************************************************************************/

    verificarRegistro = async (id_usuario, id_secundaria) => {
        try {
            this.conectar();

            const contacto = await models.Usuario_secundarias.findOne({
                where: {
                    id_usuario: id_usuario,
                    id_secundaria: id_secundaria,
                    deleted_at: null
                }
            });

            this.desconectar();
            return !!contacto;

        } catch (error) {
            this.desconectar();
            console.error('Error al verificar el registro', error);
            throw error;
        }
    }

    /**********************************************************************************************************************************
    * Nombre consulta: verContactoConPremios                                                                                          *
    * Descripción: Esta consulta permite ver un contacto específico y sus premios en una actividad determinada de la base de datos    *
    * Nota Para asignarle premios que no tiene                                                                                        *  
    * Pantalla: Registrar contacto                                                                                                    *
    * Rol: Operador                                                                                                                   *
    **********************************************************************************************************************************/

    verContactoConPremio = async (id_usuario, id_secundaria) => {
        try {
            this.conectar();

            const contacto = await models.Usuario_secundarias.findAll({
                where: {
                    id_usuario: id_usuario,
                    id_secundaria: id_secundaria,
                    deleted_at: null
                },
                attributes: ['id', 'id_usuario', 'id_secundaria', 'premio']
            });

            this.desconectar();

            return contacto;
        } catch (error) {
            this.desconectar();
            console.error('Error al obtener el contacto y su premio', error);
            throw error;
        }
    }

    /**********************************************************************************************************************************
    * Nombre consulta: verPremios                                                                                                     *
    * Descripción: Esta consulta permite ver todos los premios para una actividad secundaria específica                   *
    * Pantalla: Registrar contacto                                                                                                    *
    * Rol: Operador                                                                                                                   *
    **********************************************************************************************************************************/

    verPremios = async (id_secundaria) => {
        try {
            this.conectar();

            const premios = await models.PrincipalesSecundarias.findAll({
                where: {
                    id_secundaria: id_secundaria
                },
                attributes: ['premio']
            });

            this.desconectar();

            return premios;
        } catch (error) {
            this.desconectar();
            console.error('Error al obtener los premios', error);
            throw error;
        }
    }

    /**********************************************************************************************************************************
    * Nombre consulta: asignarPremio                                                                                                  *
    * Descripción: Esta consulta permite asignar un nuevo premio a un contacto específico si no lo tiene ya en la base de datos       *
    * Pantalla: Registrar contacto                                                                                                    *
    * Rol: Operador                                                                                                                   *
    **********************************************************************************************************************************/

    asignarPremio = async (id_usuario, id_secundaria, nuevoPremio) => {
        try {
            this.conectar();

            const contacto = await models.Usuario_secundarias.findOne({
                where: {
                    id_usuario: id_usuario,
                    id_secundaria: id_secundaria,
                    deleted_at: null
                },
                attributes: ['id', 'id_usuario', 'id_secundaria', 'premio']
            });

            if (contacto.premio === nuevoPremio) {
                throw new Error('El contacto ya tiene este premio');
            }

            await models.Usuario_secundarias.update(
                { premio: nuevoPremio },
                { where: { id: contacto.id } }
            );

            this.desconectar();

            return contacto;
        } catch (error) {
            this.desconectar();
            console.error('Error al asignar el premio', error);
            throw error;
        }
    }

    /************************************************************************************************************************************
     * Nombre consulta: eliminarActividad                                                                                               *
     * Descripción: Esta consulta permite eliminar una actividad de la base de datos                                                    *
     * Pantalla: Actividades                                                                                                            *
     * Rol: Operador                                                                                                                    *
     ***********************************************************************************************************************************/

    eliminarActividad = async (id) => {
        try {
            this.conectar();
            let actividad = await models.ActividadSecundaria.findByPk(id);
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
     * Descripción: Esta consulta permite crear una actividad de la base de datos                                                       *
     * Pantalla: Registrar contacto                                                                                                     *
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

    /**********************************************************************************************************************************************
     * Nombre consulta: getConcursosActividadesIncompletasUsuario                                                                             *
     * Descripción: Esta consulta permite obtener los concursos (pendientes) y sus respectivas actividades (pendientes) de un usuario en concreto *                                       
     * Pantalla: Registrar contacto                                                                                                               *
     * Rol: Operador                                                                                                                              *
     *********************************************************************************************************************************************/

    getConcursosActividadesIncompletasUsuario = async (idUsuario) => {
        try {
            const principales = await models.ActividadPrincipal.findAll({
                where: { completada: false },
                include: [
                    {
                        model: models.ActividadSecundaria,
                        as: 'act_secundarias',
                        attributes: ['id', 'nombre', 'url_foto', 'localizacion', 'fecha'],
                        through: { attributes: [] },
                        where: {
                            completada: false
                        },
                        include: [
                            {
                                model: models.Modalidad,
                                as: 'modalidad'
                            },
                            {
                                model: models.Usuario_secundarias,
                                as: 'act_secundarias_usuario',
                                where: { id_usuario: idUsuario }
                            }
                        ]
                    },
                ]
            });
    
            return principales;
        } catch (e) {
            console.error(e.message)
            return false
        }
    }

    /**********************************************************************************************************************************************
     * Nombre consulta: getConcursosActividadesCompletasUsuario                                                                                   *
     * Descripción: Esta consulta permite buscar todas las actividades no completadas asociadas a un usuario y devuelve sus respectivos premios   *
     * Pantalla: Registrar contacto                                                                                                               *
     * Rol: Operador                                                                                                                              *
     *********************************************************************************************************************************************/

    getPremiosPendientes = async (idUsuario) => {
        try {
            const actividades = await models.ActividadSecundaria.findAll({
                attributes: ['id', 'nombre', 'premio'],
                through: { attributes: [] },
                where: {
                    completada: false
                },
                include: [
                    {
                        model: models.Usuario_secundarias,
                        as: 'act_secundarias_usuario',
                        where: { id_usuario: idUsuario }
                    }
                ]
            });
    
            const premiosPendientes = actividades.map(actividad => actividad.premio);
    
            return premiosPendientes;
        } catch (e) {
            console.error(e.message)
            return false
        }
    }

    /**********************************************************************************************************************************************
     * Nombre consulta: getModalidadActividad                                                                                                     *
     * Descripción: Esta consulta permite obtener la modalidad de una actividad en concreto                                                       *
     * Pantalla:  Actividades                                                                                                                     *
     * Rol: Aficionado                                                                                                                            *
     *********************************************************************************************************************************************/

    getModalidadActividad = async (idActividad) => {
        try {
            this.conectar();
            const modalidad = await models.ActividadSecundaria.findOne({
                where: { id: idActividad },
                include: {
                    model: models.Modalidad,
                    as: 'modalidad'
                }
            });
            this.desconectar();
            return modalidad;
        }catch(error){
            this.desconectar();
            console.error('Error al obtener la modalidad de la actividad', error);
            throw error;
        }
    }

}

module.exports = ActividadConexion;