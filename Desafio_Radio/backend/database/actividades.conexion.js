const Conexion = require('./ConexionSequelize');
const { Sequelize, Op, where } = require('sequelize');
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
                        model: models.ActividadPrincipal,
                        as: 'act_primarias'
                    },
                    {
                        model: models.Modalidad,
                        as: 'modalidad'
                    },
                    {
                        model: models.Modos_trabajo,
                        as: 'modo',
                        attributes: ['nombre']
                    }
                ],
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
                    },
                    {
                        model: models.Modos_trabajo,
                        as: 'modo',
                        attributes: ['nombre']
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
                    },
                    {
                        model: models.Modos_trabajo,
                        as: 'modo',
                        attributes: ['nombre']
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
     * Parametros: id_secundaria                                                                                                      *
     * Pantalla: Actividades                                                                                                          *
     * Rol: Operador                                                                                                                  *
     * *******************************************************************************************************************************/

    terminarActividad = async (id_secundaria) => {
        try {
            this.conectar();
            let actividad = await models.ActividadSecundaria.findByPk(id_secundaria);
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
    * Parametros: id_secundaria                                                                                                       *
    * Pantalla: Actividades                                                                                                           *
    * Rol: Aficionado                                                                                                                 *
    **********************************************************************************************************************************/

    mostrarActividadId = async (id_secundaria) => {
        this.conectar();

        let contacto = await models.ActividadSecundaria.findOne({
            where: {
                id: id_secundaria,
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'deletedAt']
            },
            include: [
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
                },
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'deletedAt']
                },
                include: [
                    {
                        model: models.Modalidad,
                        as: 'modalidad'
                    },
                    {
                        model: models.Modos_trabajo,
                        as: 'modo',
                        attributes: ['nombre']
                    }
                ]
            });
            this.desconectar();
            return actividades;
        } catch (error) {
            this.desconectar();
            console.error('Error al mostrar la actividad', error);
            throw error;
        }
    }

    /**********************************************************************************************************************************
    * Nombre consulta: verParticipantesActividad                                                                                      *
    * Descripción: Esta consulta muestra los participantes de una actividad concreta de la base de datos                              *
    * Parametros: id_secundaria                                                                                                       *
    * Pantalla: Actividades                                                                                                           *
    * Rol: Aficionado                                                                                                                 *
    **********************************************************************************************************************************/

    verParticipantesActividad = async (id_secundaria) => {
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
                            id: id_secundaria,
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
     * Parametros: id_secundaria                                                                                                        *
     * Pantalla: Actividades                                                                                                            *
     * Rol: Operador                                                                                                                    *
     ***********************************************************************************************************************************/

    eliminarActividad = async (id_secundaria) => {
        try {
            this.conectar();
            let actividad = await models.ActividadSecundaria.findByPk(id_secundaria);
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
     * Nombre consulta: altaActividadUnicoContacto                                                                                      *
     * Descripción: Esta consulta permite crear una actividad de un unico contacto en la base de datos                                  *
     * Parametros: nombre, url_foto, localizacion, fecha, frecuencia, banda, id_modo, id_modalidad, completada, id_operador             *
     * Pantalla: Actividades                                                                                                            *
     * Rol: Operador                                                                                                                    *
     ***********************************************************************************************************************************/

    altaActividadUnicoContacto = async (body) => {
        try {
            this.conectar();
            body.completada = 0;
            let actividad = await models.ActividadSecundaria.create(body);
            return actividad;
        } catch (error) {
            this.desconectar();
            console.error('Error al dar de alta una actividad de un unico contacto', error);
            throw error;
        }
    }

    /************************************************************************************************************************************************
     * Nombre consulta: altaActividadVariosContactos                                                                                                *
     * Descripción: Esta consulta permite crear una actividad de varios contactos en la base de datos                                               *
     * Parametros: nombre, url_foto, localizacion, fecha, frecuencia, banda, id_modo, id_modalidad, completada, id_operador y id_principal, premio  *
     * Pantalla: Actividades                                                                                                                        *
     * Rol: Operador                                                                                                                                *
     * *********************************************************************************************************************************************/

    altaActividadVariosContactos = async (body, id_principal, premio) => {
        try {
            this.conectar();
            body.completada = 0;
            let actividad = await models.ActividadSecundaria.create(body);
            let principal_secundaria = await models.PrincipalesSecundarias.create({
                id_principal: id_principal,
                id_secundaria: actividad.id,
                premio: premio
            });
            return { actividad, principal_secundaria };
        } catch (error) {
            this.desconectar();
            console.error('Error al dar de alta una actividad de varios contactos', error);
            throw error;
        }
    }

    /*********************************************************************************************************************************************
     * Nombre consulta: getModalidades                                                                                                           *
     * Descripción: Esta consulta permite obtener las modalidades de la base de datos                                                            *
     * Parametros: Ninguno                                                                                                                       *
     * Pantalla: Actividades                                                                                                                     *
     * Rol: Operador                                                                                                                             *
     * ******************************************************************************************************************************************/

    getModalidades = async () => {
        try {
            this.conectar();
            const modalidades = await models.Modalidad.findAll({
                where: {
                    deleted_at: null
                },
                attributes: ['id', 'descripcion']

            });
            return modalidades;
        } catch (error) {
            this.desconectar();
            console.error('Error al obtener las modalidades')
        }
    }

    /*********************************************************************************************************************************************
     * Nombre consulta: getModos                                                                                                                 *
     * Descripción: Esta consulta permite obtener los modos de la base de datos                                                                  *
     * Parametros: Ninguno                                                                                                                       *
     * Pantalla: Actividades                                                                                                                     *
     * Rol: Operador                                                                                                                             *
     * ******************************************************************************************************************************************/

    getModos = async () => {
        try {
            this.conectar();
            const modos = await models.Modos_trabajo.findAll({
                where: {
                    deleted_at: null
                },
                attributes: ['id', 'nombre']

            });
            return modos;
        } catch (error) {
            this.desconectar();
            console.error('Error al obtener los modos')
        }
    }
}

module.exports = ActividadConexion;