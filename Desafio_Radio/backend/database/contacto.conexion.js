const Conexion = require('./ConexionSequelize');
const { Sequelize, Op, where } = require('sequelize');
const models = require('../models/index.js');

class ContactoConexion {

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
    * Nombre consulta: registrarContacto                                                                                              *
    * Descripción: Esta consulta permite registrar a un contacto en una actividad o concurso en la base de datos                      *
    * Nota: si es registrar en una actividad de un concurso (varios contactos) o si es registrar en una actividad (un unico contacto) *
    * Parametros: id_usuario, id_secundaria                                                                                           *
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

            const registroExistente = await models.Usuario_secundarias.findOne({
                where: {
                    id_usuario: body.id_usuario,
                    id_secundaria: body.id_secundaria
                }
            });

            if (registroExistente) {
                throw new Error('El usuario ya está registrado en esta actividad');
            }

            const actividadSecundariaPremio = await models.PrincipalesSecundarias.findOne({
                where: {
                    id_secundaria: body.id_secundaria
                }
            });

            const premio = actividadSecundariaPremio ? actividadSecundariaPremio.premio : null;

            const contacto = await models.Usuario_secundarias.create({
                id_usuario: body.id_usuario,
                id_secundaria: body.id_secundaria,
                premio: premio
            });

            if (body.id_principal) { //significa que estamos registrando una actividad de varios contactos (concurso)
                const registroPrincipalExistente = await models.Usuario_principales.findOne({
                    where: {
                        id_usuario: body.id_usuario,
                        id_principal: body.id_principal
                    }
                });

                if (!registroPrincipalExistente) {
                    await models.Usuario_principales.create({
                        id_usuario: body.id_usuario,
                        id_principal: body.id_principal
                    });
                }
            }

            this.desconectar();
            return contacto;
        } catch (error) {
            this.desconectar();
            console.error('Error al crear el contacto', error);
            throw error;
        }
    }

    /**********************************************************************************************************************************
    * Nombre consulta: getUsuarios                                                                                                    *
    * Descripción: Esta consulta permite ver los usuarios registrados previamente en la base de datos                                 * 
    * Nota: el usuario se identificará con el id_examen al operador en el contacto (llamada)                                          *
    * Pantalla: Registrar contacto (selector de usuarios)                                                                             *
    * Rol: Operador                                                                                                                   *
    **********************************************************************************************************************************/

    getUsuarios = async () => {
        try {
            this.conectar();
            const usuarios = await models.Usuario.findAll({
                where: {
                    deleted_at: null
                },
                attributes: ['id', 'id_examen']
            });
            this.desconectar();
            return usuarios;
        } catch (error) {
            this.desconectar();
            console.error('Error al mostrar los usuarios', error);
            throw error;
        }
    }

    /**********************************************************************************************************************************
     * Nombre consulta: getConcursosContacto                                                                                                  *
     * Descripción: Esta consulta permite ver los concursos registrados previamente en la base de datos                               *
     * Pantalla: Registrar contacto (selector de concursos)                                                                           *
     * Rol: Operador                                                                                                                  *
     *********************************************************************************************************************************/

    getConcursosContacto = async () => {
        try {
            this.conectar();
            const concursos = await models.ActividadPrincipal.findAll({
                where: {
                    completada: false,
                    deleted_at: null
                },
                attributes: ['id', 'nombre']
            });
            this.desconectar();
            return concursos;
        } catch (error) {
            this.desconectar();
            console.error('Error al mostrar los concursos', error);
            throw error;
        }
    }

    /**********************************************************************************************************************************
     * Nombre consulta: getSolucionConcurso                                                                                           *
     * Descripción: Esta consulta permite ver la solución de un concurso en concreto en la base de datos                              *
     * Parametros: id_principal                                                                                                       *
     * Pantalla: Registrar contacto                                                                                                   *
     * Rol: Operador                                                                                                                  *
    **********************************************************************************************************************************/

    getSolucionConcurso = async (id_principal) => {
        try {
            this.conectar();
            const solucion = await models.ActividadPrincipal.findOne({
                where: {
                    id: id_principal
                },
                attributes: ['solucion']
            });
            this.desconectar();
            return solucion;
        } catch (error) {
            this.desconectar();
            console.error('Error al obtener la solución del concurso', error);
            throw error;
        }
    }

    /**********************************************************************************************************************************
    * Nombre consulta: getActividadesVariosContactos                                                                                  *
    * Descripción: Esta consulta obtiene las actividades de varios contactos asociadas a un concurso específico de la base de datos   *
    * Parametros: id_concurso                                                                                                         * 
    * Pantalla: Perfil y Concursos (modal)  y Registrar Contacto                                                                      *
    * Rol: Aficionado                                                                                                                 *
    **********************************************************************************************************************************/

    getActividadesVariosContactos = async (id_concurso) => {
        try {
            this.conectar();

            const actividadesSecundarias = await models.ActividadSecundaria.findAll({
                where: {
                    completada: false,
                    deleted_at: null
                },
                attributes: ['id', 'nombre'],
                include: [
                    {
                        model: models.PrincipalesSecundarias,
                        as: 'principales_secundarias',
                        where: {
                            id_principal: id_concurso,
                            deleted_at: null
                        },
                        attributes: [],
                    },
                    {
                        model: models.Modalidad,
                        as: 'modalidad',
                        attributes: ['descripcion']
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
     * Nombre consulta: getPremioActividad                                                                                            *
     * Descripción: Esta consulta obtiene el premio de una actividad específica de la base de datos                                   *
     * Parametros: id_actividad                                                                                                       *
     * Pantalla: Registrar Contacto                                                                                                   *
     * Rol: Aficionado                                                                                                                *
     **********************************************************************************************************************************/

    getPremioActividad = async (id_actividad) => {
        try {
            this.conectar();
            const premio = await models.PrincipalesSecundarias.findOne({
                where: {
                    id_secundaria: id_actividad,
                    deleted_at: null
                },
                attributes: ['premio']
            });
            this.desconectar();
            return premio;
        } catch (error) {
            this.desconectar();
            console.error('Error al obtener el premio de la actividad', error);
            throw error;
        }
    }

    /**********************************************************************************************************************************
    * Nombre consulta: getPremiosUsuarioConcurso                                                                                      *
    * Descripción: Esta consulta permite ver los premios de un usuario en concreto en un concurso de la base de datos                 *
    * Parametros: id_usuario, id_principal                                                                                            *
    * Nota Para asignarle premios que no tiene                                                                                        *  
    * Pantalla: Registrar contacto                                                                                                    *
    * Rol: Operador                                                                                                                   *
    **********************************************************************************************************************************/

    getPremiosUsuarioConcurso = async (id_usuario, id_principal) => {
        try {
            this.conectar();
            const premios = await models.Usuario_secundarias.findAll({
                where: {
                    id_usuario: id_usuario,
                    deleted_at: null
                },
                include: [{
                    model: models.PrincipalesSecundarias,
                    as: 'principales_secundarias',
                    where: {
                        id_principal: id_principal,
                        deleted_at: null
                    },
                    attributes: ['premio'],
                }],
                attributes: []
            });
            this.desconectar();
            return premios;
        } catch (error) {
            this.desconectar();
            console.error('Error al obtener los premios del usuario en el concurso', error);
            throw error;
        }
    }

    getActividadesContacto = async () => {
        try {
            let actividades = [];
            this.conectar();
            actividades = await models.ActividadSecundaria.findAll({
                where: {
                    completada: false,
                    deleted_at: null
                },
                attributes: ['id', 'nombre']
            });
            this.desconectar();
            return actividades;
        } catch (error) {
            this.desconectar();
            console.error('Error al mostrar todas las actividades:', error);
            throw error;
        }
    }

}

module.exports = ContactoConexion;
