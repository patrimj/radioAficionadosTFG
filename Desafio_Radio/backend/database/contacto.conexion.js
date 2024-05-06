const Conexion = require('./ConexionSequelize');
const { Sequelize, Op } = require('sequelize');
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
    * Descripción: Esta consulta permite registrar a un contacto en la base de datos                                                  *
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
     * Nombre consulta: contactoNombre                                                                                                *
     * Descripción: Esta consulta permite buscar un contacto por su nombre en la base de datos                                        *
     * Parametros: nombre                                                                                                              *
     * Pantalla: Registrar contacto                                                                                                    *
     * Rol: Operador                                                                                                                   *
     **********************************************************************************************************************************/

    contactoNombre = async (nombre) => {
        try {
            this.conectar();

            const contacto = await models.Usuario_secundarias.findAll({
                where: {
                    deleted_at: null
                },
                include: [
                    {
                        model: models.Usuario,
                        as: 'usuario_secundarias_secundarias',
                        where: {
                            nombre: {
                                [Op.like]: `%${nombre}%`
                            }
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
            return contacto;
        } catch (error) {
            this.desconectar();
            console.error('Error al buscar el contacto por nombre', error);
            throw error;
        }
    }

    /***********************************************************************************************************************************
     * Nombre consulta: buscarContacto                                                                                                 *
     * Descripción: Esta consulta permite buscar un contacto en la base de datos                                                       *
     * Parametros: id_usuario, id_secundaria, premio                                                                                   *
     * Pantalla: Registrar contacto                                                                                                    *
     * Rol: Operador                                                                                                                   *
     **********************************************************************************************************************************/

    buscarContacto = async (id_usuario, id_secundaria, premio) => {
        try {
            this.conectar();

            const contacto = await models.Usuario_secundarias.findOne({
                where: {
                    id_usuario: id_usuario,
                    id_secundaria: id_secundaria,
                    premio: premio,
                    deleted_at: null
                }
            });

            this.desconectar();
            return contacto;
        } catch (error) {
            this.desconectar();
            console.error('Error al buscar el contacto', error);
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
     * Nombre consulta: getConcursos                                                                                                  *
     * Descripción: Esta consulta permite ver los concursos registrados previamente en la base de datos                               *
     * Pantalla: Registrar contacto (selector de concursos)                                                                           *
     * Rol: Operador                                                                                                                  *
     *********************************************************************************************************************************/

    getConcursos = async () => {
        try {
            this.conectar();
            const concursos = await models.ActividadPrincipal.findAll({
                where: {
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

    


    //TODO:ELIMINAR
    /**********************************************************************************************************************************
    * Nombre consulta: verPremioConcurso                                                                                                     *
    * Descripción: Esta consulta permite ver todos los premios para un concurso específico                                            *
    * Parametros: id_principal                                                                                                        *
    * Pantalla: Registrar contacto                                                                                                    *
    * Rol: Operador                                                                                                                   *
    **********************************************************************************************************************************/

    verPremioConcurso = async (id_principal) => {
        try {
            this.conectar();

            const premios = await models.PrincipalesSecundarias.findAll({
                where: {
                    id_principal: id_principal
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
    * Parametros: id_usuario, id_secundaria, nuevoPremio                                                                              *
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
                {
                    premio: nuevoPremio,
                    completada: true
                },
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

    /**********************************************************************************************************************************************
     * Nombre consulta: getConcursosActividadesIncompletasUsuario                                                                                 *
     * Descripción: Esta consulta permite obtener los concursos (pendientes) y sus respectivas actividades (pendientes) de un usuario en concreto *                                       
     * Parametros: id_usuario, id_principal                                                                                                       *
     * Pantalla: Registrar contacto                                                                                                               *
     * Rol: Operador                                                                                                                              *
     *********************************************************************************************************************************************/

    getConcursosActividadesIncompletasUsuario = async (id_usuario, id_principal) => {
        try {
            const principales = await models.ActividadPrincipal.findAll({
                where: {
                    completada: false,
                    id: id_principal
                },
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
                                where: { id_usuario: id_usuario }
                            }
                        ]
                    },
                ]
            });

            return principales;
        } catch (error) {
            console.error('Error al obtener los concursos y actividades incompletas de un usuario', error);
            return false;
        }
    }

    /*********************************************************************************************************************************************************
     * Nombre consulta: getPremiosPendientes                                                                                                                 *
     * Descripción: Esta consulta permite buscar todas las actividades no completadas asociadas a un usuario y concurso y devuelve sus respectivos premios   *
     * Parametros: id_usuario, id_principal                                                                                                                  *                                                                                                                      
     * Pantalla: Registrar contacto                                                                                                                          *
     * Rol: Operador                                                                                                                                         *
     ********************************************************************************************************************************************************/

    getPremiosPendientes = async (id_usuario, id_principal) => {
        try {
            const actividades = await models.ActividadSecundaria.findAll({
                attributes: ['id', 'nombre'],
                through: { attributes: [] },
                where: {
                    completada: false
                },
                include: [
                    {
                        model: models.Usuario_secundarias,
                        as: 'act_secundarias_usuario',
                        where: {
                            id_usuario: id_usuario,
                            deleted_at: null
                        }
                    },
                    {
                        model: models.PrincipalesSecundarias,
                        as: 'principal  ',
                        where: {
                            id_principal: id_principal
                        },
                        attributes: ['premio']
                    }
                ]
            });

            const premiosPendientes = actividades.map(actividad => actividad.principal.premio);

            return premiosPendientes;
        } catch (e) {
            console.error(e.message)
            return false
        }
    }

    /**********************************************************************************************************************************************
     * Nombre consulta: getModalidadActividad                                                                                                     *
     * Descripción: Esta consulta permite obtener la modalidad de una actividad en concreto                                                       *
     * Parametros: id_actividad                                                                                                                   *
     * Pantalla:  Actividades                                                                                                                     *
     * Rol: Aficionado                                                                                                                            *
     *********************************************************************************************************************************************/

    getModalidadActividad = async (id_actividad) => {
        try {
            this.conectar();
            const modalidad = await models.ActividadSecundaria.findOne({
                where: { id: id_actividad },
                include: {
                    model: models.Modalidad,
                    as: 'modalidad'
                }
            });
            this.desconectar();
            return modalidad;
        } catch (error) {
            this.desconectar();
            console.error('Error al obtener la modalidad de la actividad', error);
            throw error;
        }
    }

}

module.exports = ContactoConexion;
