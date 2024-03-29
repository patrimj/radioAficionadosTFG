const mysql = require('mysql2');
const Conexion = require('./ConexionSequelize');
const { Sequelize, Op } = require('sequelize'); // Op es para los operadores de sequelize
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

    // ---------------------------- RUTAS CUALQUIER USUARIO ----------------------------

    // VER ACTIVIDADES PROPIAS 
    getActividadesPrincipalesAficionado = async (id_usuario) => {
        try {
            this.conectar();
            const actividadesPrincipales = await models.ActividadPrincipal.findAll({
                where: {completada : true},
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
            console.error('Error al mostrar las actividades del usuario', error);
            throw error;
        }
    }

    getActividadesSecundariasAficionado = async (id_usuario) => {
        try {
            this.conectar();

            const actividadesSecundariasAsociadas = await models.PrincipalesSecundarias.findAll({
                attributes: ['id_secundaria'],
            });

            const actividadesSecundarias = await models.ActividadSecundaria.findAll({
                where: {
                    id: { [models.Sequelize.Op.notIn]: actividadesSecundariasAsociadas.map(a => a.id_secundaria) },
                    '$act_secundarias_usuario.id_usuario$': id_usuario,
                    completada: true
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
            console.error('Error al mostrar las actividades secundarias de un usuario', error);
            throw error;
        }
    }

    // ---------------------------- RUTAS ADMINISTRADOR ----------------------------

    // VER TODAS LAS ACTIVIDADES PRINCIPALES

    mostrarActividadesPrincipales = async () => {
        try {
            let actividades = [];
            this.conectar();
            actividades = await models.ActividadPrincipal.findAll();
            this.desconectar();
            return actividades;
        } catch (error) {
            this.desconectar();
            console.error('Error al mostrar las actividades principales:', error);
            throw error;
        }
    }

    // VER TODAS LAS ACTIVIDADES SECUNDARIAS

    mostrarActividadesSecundarias = async () => {
        try {
            let actividades = [];
            this.conectar();
            actividades = await models.ActividadSecundaria.findAll();
            this.desconectar();
            return actividades;
        } catch (error) {
            this.desconectar();
            console.error('Error al mostrar las actividades secundarias:', error);
            throw error;
        }
    }

    // VER TODAS LAS ACTIVIDADES SECUNDARIAS TERMINADAS 

    mostrarActividadesSecundariasTerminadas = async () => {
        try {
            let actividades = [];
            this.conectar();
            actividades = await models.ActividadSecundaria.findAll({
                where: {
                    completada: true
                }
            });
            this.desconectar();
            return actividades;
        } catch (error) {
            this.desconectar();
            console.error('Error al mostrar las actividades secundarias terminadas', error);
            throw error;
        }
    }

    // VER TODAS LAS ACTIVIDADES SECUNDARIAS NO TERMINADAS

    mostrarActividadesSecundariasPendientes = async () => {
        try {
            let actividades = [];
            this.conectar();
            actividades = await models.ActividadSecundaria.findAll({
                where: {
                    completada: false
                }
            });
            this.desconectar();
            return actividades;
        } catch (error) {
            this.desconectar();
            console.error('Error al mostrar las actividades secundarias pendientes', error);
            throw error;
        }
    }

    // VER TODAS LAS ACTIVIDADES PRINCIPALES TERMINADAS 

    mostrarActividadesPrincipalTerminadas = async () => {
        try {
            let actividades = [];
            this.conectar();
            actividades = await models.ActividadPrincipal.findAll({
                where: {
                    completada: true
                }
            });
            this.desconectar();
            return actividades;
        } catch (error) {
            this.desconectar();
            console.error('Error al mostrar las actividades principales terminadas', error);
            throw error;
        }
    }

    // VER TODAS LAS ACTIVIDADES NO TERMINADAS

    mostrarActividadesPrincipalPendientes = async () => {
        try {
            let actividades = [];
            this.conectar();
            actividades = await models.ActividadPrincipal.findAll({
                where: {
                    completada: false
                }
            });
            this.desconectar();
            return actividades;
        } catch (error) {
            this.desconectar();
            console.error('Errror al mostrar las actividades principales pendientes', error);
            throw error;
        }
    }

    // ALTA ACTIVIDAD

    altaActividadPrincipal = async (body) => {
        try {
            let actividad = 0;
            this.conectar();
            const actividadNueva = await models.ActividadPrincipal.create(body);
            actividad = actividadNueva;
            this.desconectar();
            return actividad
        } catch (error) {
            this.desconectar();
            console.error('Error al dar de alta una actividad principal', error);
            throw error;
        }
    }

    // MODIFICAR ACTIVIDAD

    modificarActividadPrincipal = async (id, body) => {
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
            console.error('Error al modificar la actividad prinicpal', error);
            throw error;
        }
    }

    // BAJA ACTIVIDAD

    bajaActividadPrincipal = async (id) => {
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
            console.error('Error al dar de baja una actividad principal', error);
        }
    }

    // VER ACTIVIDAD PRINCIPAL POR ID

    mostrarActividadPrincipalId = async (id) => {
        try {
            this.conectar();
            const actividad = await models.ActividadPrincipal.findByPk(id);
            this.desconectar();
            return actividad
        } catch (error) {
            this.desconectar();
            console.error('error al mostrar la actividad principal', error);
            throw error;
        }
    }

    // VER ACTIVIDAD SECUNDARIA POR ID

    mostrarActividadSecundariaPorId = async (id) => {
        try {
            this.conectar();
            const actividad = await models.ActividadSecundaria.findByPk(id);
            this.desconectar();
            return actividad;
        } catch (error) {
            this.desconectar();
            console.error('Error al mostrar la actividad secundaria', error);
            throw error;
        }
    }

    // VER PARTICIPANTES ACTIVIDADES PRINCIPALES

    participantesActividadesPrincipales = async () => {
        try {
            this.conectar();
            const usuariosPrincipales = await models.usuario_principal.findAll({
                include: [
                    {
                        model: models.Usuario,
                        as: 'usuario',
                        attributes: ['nombre', 'email', 'apellido_uno', 'apellido_dos', 'url_foto', 'id_examen'],
                    }, 
                    {
                        model: models.ActividadPrincipal,
                        as: 'actividad_principal', 
                        attributes: ['nombre'], 
                    }
                ],
                attributes: []
            });
            this.desconectar();
            return usuariosPrincipales;
        } catch (error) {
            this.desconectar();
            console.error('Error al mostrar los usuarios en actividades principales', error);
            throw error;
        }
    }

    // VER PARTICIPANTES ACTIVIDADES SECUNDARIAS

    participantes = async () => {
        try {
            this.conectar();
            const usuariosSecundarios = await models.Usuario_secundarias.findAll({
                include: [
                    {
                        model: models.Usuario,
                        as: 'usuario_secundarias_secundarias',
                        attributes: ['nombre', 'email', 'apellido_uno', 'apellido_dos', 'url_foto', 'id_examen'],
                    },
                    {
                        model: models.ActividadSecundaria,
                        as: 'act_secundaria',
                        attributes: ['nombre'], 
                    }
                ],
                attributes: []
            });
            this.desconectar();
            return usuariosSecundarios;
        } catch (error) {
            this.desconectar();
            console.error('Error al mostrar los usuarios en actividades secundarias', error);
            throw error;
        }
    }



    // ---------------------------- RUTAS OPERADOR ----------------------------

    // CREAR CONTACTO

    /**
     *
     * @author JuanNavarrete
     */
    crearContacto = async (data) => {
        try {
            this.conectar();

            await models.Usuario_secundarias.create(data);

            this.desconectar();

            return true;
        } catch (e) {
            console.log(e.message)
            return false;
        }
    }

    // VER TODOS LOS CONTACTOS

    // VER CONTACTO CONCRETO (para ver sus premios y poder asignarle unos que no tenga)

    // VER ACTIVIDADES SECUNDARIAS

    mostrarActSecundarias = async (idOperador) => {
        let resultados = [];
        this.conectar();

        resultados = await models.ActividadSecundaria.findAll({
            where: {
                id_operador: idOperador,
                deleted_at: null,
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'deletedAt']
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
        return resultados;
    }

    // VER UNA ACTIVIDAD SECUNDARIA EN CONCRETO

    mostrarActSecundaria = async (id) => {
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


    // MOSTRAR ACTIVIDADES SECUNDARIAS QUE NO PERTENECEN A UNA PRIMARIA
    mostrarActSecundariasSinPrincipal = async (idOperador) => {
        try {
            const actividades = await ActividadSecundaria.findAll({
                where: {
                    id_operador: idOperador,
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

    // MOSTRAR ACTIVIDADES SECUNDARIAS QUE PERTENECEN A UNA PRIMARIA
    mostrarActSecundariasConPrincipal = async (idOperador) => {
        try {
            const secundarias = await PrincipalesSecundarias.findAll({
                where: {
                    id_operador: idOperador,
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


    // MOSTRAR ACTIVIDADES SECUNDARIAS QUE PERTENECEN A UNA PRIMARIA EN PARTICULAR
    mostrarActSecundariasPorIdPrincipal = async (idPrincipal, idOperador) => {
        try {
            const secundarias = await PrincipalesSecundarias.findAll({
                where: {
                    id_operador: idOperador,
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


    // TERMINAR ACTIVIDAD SECUNDARIA

    terminarActSecundaria = async (id) => {
        this.conectar();

        let actividad = await models.ActividadSecundaria.findByPk(id);
        if (actividad) {
            await actividad.update({ completada: true });
            return actividad;
        } else {
            this.desconectar();
            throw error;
        }
    }

    // DAR DE BAJA UNA ACTIVIDAD SECUNDARIA

    eliminarActSecundaria = async (id) => {
        this.conectar();

        let actividad = await models.ActividadSecundaria.findByPk(id);
        actividad.destroy();
    }

    // MODIFICAR ACTIVIDAD SECUNDARIA

    modificarActSecundaria = async (id, body) => {
        this.conectar();

        let actividad = await models.ActividadSecundaria.findByPk(id);
        if (actividad) {
            await actividad.update(body);
            return actividad;
        } else {
            this.desconectar();
            throw error;
        }
    }

    // ALTA ACTIVIDAD SECUNDARIA

    altaActSecundaria = async (body) => {
        try {
            this.conectar();
            let actividad = await models.ActividadSecundaria.create(body);
            return actividad
        } catch (error) {
            throw (error);
        } finally {
            this.desconectar();
        }
    }

    // VER MODALIDADES

    /**
     *
     * @author JuanNavarrete
     */
    verModalidades = async () => {
        try {
            this.conectar();

            const modalidades = await models.Modalidad.findAll();

            this.desconectar();

            return modalidades;
        } catch (e) {
            console.log(e.message)
            return false;
        }
    }

    // PROGRESO USUARIO SECUNDARIA

    /**
     *
     * @author JuanNavarrete
     */
    verContactos = async (idUsuario, idSecundaria) => {
        try {
            this.conectar();

            const progreso = await models.Usuario_secundarias.findAll({
                where: {
                    [Op.and]: [
                        { id_usuario: idUsuario }, { id_secundaria: idSecundaria }]
                },

                attributes: ['premio']
            },);

            this.desconectar();

            return progreso.map(item => item.premio);
        } catch (e) {
            console.error(e.message);
            return false;
        }
    }

    /**
     * @author JuanNavarrete
     */
    verUsuariosSecundaria = async (idActividad) => {
        try {
            const usuarios = await this.conexionSql.query('SELECT DISTINCT id_usuario FROM usuario_secundarias WHERE id_secundaria = ?', [idActividad]);

            return usuarios.map(item => item.id_usuario);
        } catch (e) {
            console.log(e.message)
            return false
        }
    }

    /**
     * @author JuanNavarrete
     */
    verPrincipalesUsuario = async (idUsuario) => {
        try {
            const principales = await models.ActividadPrincipal.findAll({
                where: {id_usuario: idUsuario}
            })

            return principales;
        } catch (e) {
            console.error(e.message)
            return false
        }
    }

    verUsuariosSecundaria = async (idActividad) => {
        try {
            try {
                const usuarios = await conxSql.query('SELECT DISTINCT id_usuario FROM usuario_secundarias WHERE id_secundaria = ?', [idActividad]);

                return usuarios.map(item => item.id_usuario);
            } catch (error) {
                throw error;
            }
        } catch (e) {
            console.log(e.message)
            return false;
        }
    }

    /**
     * @author JuanNavarrete
     */
    verPrincipalSecundaria = async (id) => {
        try {
            const datos = await models.PrincipalesSecundarias.findOne(
                {
                    where: {id_secundaria: id},
                    attributes: [],
                    include: {
                        model: models.ActividadPrincipal,
                        as: 'principal'
                    }
                },
            );

            return datos.principal
        } catch (error) {
            console.log(error.message);
            return false;
        }
    }

    /**
     * @author JuanNavarrete
     */
    buscarContactosSecundaria = async (idSecundaria) => {
        try {
            const datos = await models.Usuario_secundarias.findAll(
                {
                    where: {id_secundaria: idSecundaria},
                    include: {
                        model: models.Usuario,
                        as: 'usuario_secundarias_secundarias',
                        attributes: ['id', 'id_examen']
                    }
                },
            );

            console.log(datos)

            return datos
        } catch (error) {
            console.log(error.message);
            return false;
        }
    }

    /**
     * @author JuanNavarrete
     */
    buscarContactosPrincipal = async (idPrincipal) => {
        try {
            const secundaria = await models.PrincipalesSecundarias.findOne(
                {
                    where: {id_principal: idPrincipal},
                    attributes: [],
                    include: {
                        model: models.ActividadSecundaria,
                        as: 'secundaria'
                    }
                },
            );

            console.log(secundaria)

            const datos = await models.Usuario_secundarias.findAll(
                {
                    where: {id_secundaria: secundaria.id},
                    attributes: []
                },
            );

            return datos.principal
        } catch (error) {
            console.log(error.message);
            return false;
        }
    }

    /**
     * @author JuanNavarrete
     */
    buscarContactoLetra = async (idUsuario, idSecundaria, premio) => {
        try {
            const datos = await models.Usuario_secundarias.findOne(
                {
                    where: {
                        [Op.and]: [
                            {id_secundaria: idSecundaria},
                            {id_usuario: idUsuario},
                            {premio: premio},
                        ]
                    },
                },
            );

            if (!datos) return false;

            return datos.principal
        } catch (error) {
            console.log(error.message);
            return false;
        }
    }

    /**
     * @author JuanNavarrete
     */
    verSecundariasUsuarioPrincipal = async (idUsuario) => {
        try {

            const usuarioSecundarias = await models.Usuario_secundarias.findAll({
                where: { id_usuario: idUsuario },
                attributes: ['id_secundaria']
            });

            // No es lo eficiente hacerlo de esta forma, ya que consulto dos veces los contactos,
            // pero es la más sencilla. Probando con una asociación más grande no ha sido posible.
            const secundariasIds = usuarioSecundarias.map(usuarioSec => usuarioSec.id_secundaria);

            const principales = await models.ActividadPrincipal.findAll({
                where: {completada: false},
                include: [
                    {
                        model: models.ActividadSecundaria,
                        as: 'act_secundarias',
                        attributes: ['id', 'nombre', 'url_foto', 'localizacion', 'fecha'],
                        through: { attributes: [] },
                        where: {
                            id: secundariasIds,
                            completada: false
                        },
                        include:  [
                            {
                                model: models.Modalidad,
                                as: 'modalidad'
                            },
                            {
                                model: models.Usuario_secundarias,
                                as: 'act_secundarias_usuario',
                                where: {id_usuario: idUsuario}
                            }
                        ]
                    },
                ]
            });

            // principales.forEach(principal => {
            //     const solucion = principal.solucion;
            //     if (!isNaN(solucion)) {
            //         const solucionNum = Number(solucion);
            //
            //         let suma = 0;
            //         let secundarias = principal.act_secundarias;
            //
            //         for (let i = 0; i < secundarias; i++) {
            //             suma += Number(secundarias[i].premio);
            //         }
            //     }
            // })

            return principales;
        } catch (e) {
            console.error(e.message)
            return false
        }
    }

    /**
     * @author JuanNavarrete
     */
    mostrarSecundariaModalidad = async (idActividad) => {
        const datos = await models.ActividadSecundaria.findOne(
            {
                where: {id: idActividad},
                include: {
                    model: models.Modalidad,
                    as: 'modalidad'
                }
            },
        );

        return datos;
    }
}

module.exports = ActividadConexion;