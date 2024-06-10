const Conexion = require('./ConexionSequelize');
const { Sequelize, Op } = require('sequelize');
const models = require('../models/index.js');
const bcrypt = require("bcrypt");

class UsuarioConexion {

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
     * Nombre consulta: login                                                                                                           *                                                                                                  
     * Descripción: Esta consulta permite iniciar sesión si el usuario está registrado en la base de datos                              *                                                      
     * Parametros: email y password                                                                                                     *            
     * Pantalla: Login                                                                                                                  *                                                                                                            
     * Rol: aficionado, admin, operador                                                                                                 *                                                                                                                   
     ***********************************************************************************************************************************/

    login = async (email, password) => {
        try {
            this.conectar();

            const usuario = await models.Usuario.findOne({
                attributes:  { exclude: ['created_at', 'updated_at', 'deleted_at'] },
                where: { email: email },
                include: {
                    model: models.Rol,
                    as: 'roles'
                }
            });

            const passwordCorrecta = await bcrypt.compare(password, usuario.password)

            if (!passwordCorrecta) {
                this.desconectar();
                console.error('La contraseña es incorrecta');
                throw new Error("Contraseña incorrecta");
            } else {
                this.desconectar();
                console.log('LOGIN', usuario);
                return usuario;
            }

        } catch (error) {
            this.desconectar();
            console.error('Error al iniciar sesión', error);
            throw error;
        }
    }

    /************************************************************************************************************************************
     * Nombre consulta: registro                                                                                                        *
     * Descripción: Esta consulta permite registrar un usuario en la base de datos                                                      *
     * Parametros: email, password, nombre, apellido_uno, apellido_dos, url_foto, id_examen                                             *
     * Pantalla: Registro                                                                                                               *
     * Rol: aficionado, admin, operador                                                                                                 *
     * Nota: El id_rol siempre será 3, ya que es el rol "aficionado"                                                                    *
     ***********************************************************************************************************************************/

    registro = async (usuario) => {
        try {
            this.conectar();

            const contrasenaHasheada = await bcrypt.hash(usuario.password, 10);

            const nuevoUsuario = await models.Usuario.create({
                email: usuario.email,
                password: contrasenaHasheada,
                nombre: usuario.nombre,
                apellido_uno: usuario.apellido_uno,
                apellido_dos: usuario.apellido_dos,
                url_foto: usuario.url_foto,
                id_examen: usuario.id_examen
            });

            const rolAsignado = await models.RolAsignado.create({
                id_rol: usuario.id_rol,
                id_usuario: nuevoUsuario.id
            });

            this.desconectar();
            return nuevoUsuario;

        } catch (error) {
            this.desconectar();
            if (error instanceof Sequelize.UniqueConstraintError) {
                console.error(`El email ${usuario.email} ya existe en la base de datos.`);
            } else {
                console.error('Error al registrar el usuario', error);
            }
            throw error;
        }
    }

    /************************************************************************************************************************************
    * Nombre consulta: buscarUsuario                                                                                                    *
    * Descripción: Esta consulta permite buscar un usuario en la base de datos por su nombre                                            *
    * Parametros: nombre                                                                                                                *
    * Pantalla: Gestion de Usuarios                                                                                                     *
    * Rol: administrador                                                                                                                *
    ************************************************************************************************************************************/

    buscarUsuario = async (nombre) => {
        try {
            this.conectar();

            const usuarios = await models.Usuario.findAll({
                attributes:  { exclude: ['created_at', 'updated_at', 'deleted_at'] },
                where: {
                    nombre: {
                        [models.Sequelize.Op.like]: `%${nombre}%` 
                    },
                    deleted_at: null
                },
                include: [{
                    model: models.Rol,
                    through: {
                        model: models.RolAsignado,
                        attributes: [],
                    },
                    as: 'roles',
                    attributes: ['nombre']
                }]
            });
            this.desconectar();
            return usuarios;
        } catch (error) {
            this.desconectar();
            console.error('Error al buscar el usuario', error);
            throw error;
        }
    }

    /************************************************************************************************************************************
    * Nombre consulta: mostrarIdUsuarioPorIndicativo                                                                                    *
    * Descripción: Esta consulta permite buscar a un usuario por su indicativo en la base de datos                                      *
    * Parametros: id_examen                                                                                                             *
    * Pantalla: Gestion de Usuarios                                                                                                     *
    * Rol: administrador                                                                                                                *
    ************************************************************************************************************************************/

    mostrarIdUsuarioPorIndicativo = async (id_examen) => {
        try {
            this.conectar();
            const usuario = await models.Usuario.findAll({
                attributes:  { exclude: ['created_at', 'updated_at', 'deleted_at'] },
                where: {
                    id_examen: {
                        [models.Sequelize.Op.like]: `%${id_examen}%` 
                    },
                    deleted_at: null
                },
                include: [{
                    model: models.Rol,
                    through: {
                        model: models.RolAsignado,
                        attributes: [],
                    },
                    as: 'roles',
                    attributes: ['nombre']
                }]
            });
            this.desconectar();
            return usuario;
        } catch (error) {
            this.desconectar();
            console.error('Error al buscar el usuario', error);
            throw error;
        }
    }

    /************************************************************************************************************************************
    * Nombre consulta: altaUsuarioCompleto                                                                                              *
    * Descripción: Esta consulta permite dar de alta a un usuario en la base de datos con roles asignados                               *
    * Parametros: email, nombre, apellido_uno, apellido_dos, url_foto, id_examen, id_rol                                                * 
    * Pantalla: Gestion de Usuarios                                                                                                     *
    * Rol: administrador                                                                                                                *
    * Nota: la contraseña se manda por correo                                                                                           *
    ************************************************************************************************************************************/

    altaUsuarioCompleto = async (usuario, id_rol = 3) => {

        this.conectar();
        let resultado;
        try {
            const usuarioNuevo = await models.Usuario.create(usuario);
            let rolAsignado;
            if (usuarioNuevo) {
                rolAsignado = await models.RolAsignado.create({
                    id_rol: id_rol,
                    id_usuario: usuarioNuevo.id
                });
                if (!rolAsignado) {
                    throw new Error('Error al asignar el rol');
                }
            }
            resultado = { usuario: usuarioNuevo, rol: rolAsignado };
        } catch (error) {
            if (error instanceof Sequelize.UniqueConstraintError) {
                console.log(`El email ${usuario.email} ya existe en la base de datos.`);
            } else {
                console.log('Ocurrió un error desconocido: ', error);
            }
            throw error;
        } finally {
            this.desconectar();
        }
        return resultado;
    }

    /************************************************************************************************************************************
    * Nombre consulta: bajaUsuario                                                                                                      *
    * Descripción: Esta consulta permite dar de baja a un usuario en la base de datos                                                   *
    * Parametros: id                                                                                                                    * 
    * Pantalla: Gestion de Usuarios                                                                                                     *
    * Rol: administrador                                                                                                                *
    ************************************************************************************************************************************/

    bajaUsuario = async (id) => {
        try {
            this.conectar();
            let resultado = await models.Usuario.findByPk(id);
            if (!resultado) {
                this.desconectar();
                throw error;
            }
            let rolAsignado = await models.RolAsignado.findOne({ where: { id_usuario: id } });
            if (rolAsignado) {
                await rolAsignado.destroy();
            }

            await resultado.destroy();
            this.desconectar();
            return resultado;
        } catch (error) {
            this.desconectar();
            console.error('Error al dar de baja a el usuario', error);
            throw error;
        }
    }

    /************************************************************************************************************************************
    * Nombre consulta: modificarUsuario                                                                                                 *
    * Descripción: Esta consulta permite modificar a un usuario en la base de datos                                                     *
    * Parametros: id, email, nombre, apellido_uno, apellido_dos, url_foto, id_examen, id_rol                                            *
    * Pantalla: Gestion de Usuarios                                                                                                     *
    * Rol: administrador                                                                                                                *  
    ************************************************************************************************************************************/

    modificarUsuario = async (id, body) => {
        try {
            this.conectar();
            let resultado = await models.Usuario.findByPk(id);
            if (!resultado) {
                this.desconectar();
                throw error;
            }
            await resultado.update(body);
            let rolAsignado = await models.RolAsignado.findOne({ where: { id_usuario: id } });
            if (!rolAsignado) {
                this.desconectar();
                throw new Error('No se encontró el rol asignado para este usuario');
            }
            console.log(body.id_rol);
            await models.RolAsignado.update({ id_rol: body.id_rol }, { where: { id_usuario: id } });
            rolAsignado = await models.RolAsignado.findOne({ where: { id_usuario: id } });
            console.log(rolAsignado);
            this.desconectar();

            return { usuario: resultado, rol: rolAsignado };
        } catch (error) {
            this.desconectar();
            console.error('Error al modificar el usuario', error);
            throw error;
        }
    }

    /************************************************************************************************************************************
    * Nombre consulta: asignarRol                                                                                                       *
    * Descripción: Esta consulta permite asignar un rol a un usuario en la base de datos                                                *
    * Parametros: id_rol, id_usuario                                                                                                    *
    * Pantalla: Gestion de Usuarios                                                                                                     *
    * Rol: administrador                                                                                                                *
    ************************************************************************************************************************************/

    asignarRol = async (id_rol, id_usuario) => {
        try {
            this.conectar();

            let usuario = await models.RolAsignado.create({
                id_rol: id_rol,
                id_usuario: id_usuario
            });

            console.log({
                id_rol: id_rol,
                id_usuario: id_usuario
            })

            if (!usuario) {
                this.desconectar();
                throw error;
            }
            this.desconectar();
            return usuario;
        }
        catch (error) {
            this.desconectar();
            console.error('Error al asignar el rol', error);
            throw error;
        }
    }

    /************************************************************************************************************************************
     * Nombre consulta: mostrarUsuarioConDiploma                                                                                        *
     * Descripción: Esta consulta permite mostrar un usuario con diploma en la base de datos                                            *
     * Parametros: email                                                                                                                *
     * Pantalla: Gestion de Usuarios                                                                                                    *
     * Rol: administrador                                                                                                               *
     ***********************************************************************************************************************************/

    mostrarUsuarioConDiploma = async (email) => {
        try {
            this.conectar();
            const usuario = await models.Usuario.findOne({
                where: {
                    email: email
                },
                attributes: ['nombre', 'email', 'apellido_uno', 'apellido_dos', 'url_foto', 'id_examen'],
                include: [
                    {
                        model: models.Rol,
                        through: {
                            model: models.RolAsignado,
                            attributes: [],
                        },
                        as: 'roles',
                        attributes: ['nombre']
                    },
                    {
                        model: models.usuario_principal,
                        as: 'usuario_principal',
                        required: true,
                        attributes: ['id_usuario', 'id_principal'],
                        include: [
                            {
                                model: models.ActividadPrincipal,
                                as: 'actividad_principal',
                                where: { completada: true },
                                required: true,
                                attributes: ['nombre', 'descripcion', 'url_foto']
                            }
                        ]
                    },
                    {
                        model: models.Usuario_secundarias,
                        as: 'usuario_secundarias',
                        required: true,
                        attributes: ['id_usuario', 'id_secundaria', 'premio'],
                        include: [
                            {
                                model: models.ActividadSecundaria,
                                as: 'act_secundaria',
                                where: {
                                    completada: true,
                                    id_modalidad: 1
                                },
                                required: true,
                                attributes: ['nombre', 'url_foto', 'localizacion', 'fecha', 'frecuencia', 'banda', 'id_modo', 'id_modalidad']
                            }
                        ]
                    }
                ]
            });
            this.desconectar();
            return usuario;
        } catch (error) {
            this.desconectar();
            console.error('Error al mostrar el usuario con diploma', error);
            throw error;
        }
    }

    /************************************************************************************************************************************
     * Nombre consulta: mostrarUsuariosConDiploma                                                                                       *
     * Descripción: Esta consulta permite mostrar los usuarios con diplomas en la base de datos                                         *
     * Parametros: email                                                                                                                *
     * Pantalla: Gestion de Usuarios                                                                                                    *
     * Rol: administrador                                                                                                               *
     ***********************************************************************************************************************************/

    mostrarUsuariosConDiploma = async () => {
        try {
            this.conectar();
            const resultados = await models.Usuario.findAll({
                attributes: ['nombre', 'email', 'apellido_uno', 'apellido_dos', 'url_foto', 'id_examen'],
                include: [
                    {
                        model: models.Rol,
                        through: {
                            model: models.RolAsignado,
                            attributes: [],
                        },
                        as: 'roles',
                        attributes: ['nombre']
                    },
                    {
                        model: models.usuario_principal,
                        as: 'usuario_principal',
                        required: true,
                        attributes: ['id_usuario', 'id_principal'],
                        include: [
                            {
                                model: models.ActividadPrincipal,
                                as: 'actividad_principal',
                                where: { completada: true },
                                required: true,
                                attributes: ['nombre', 'descripcion', 'url_foto']
                            }
                        ]
                    },
                    {
                        model: models.Usuario_secundarias,
                        as: 'usuario_secundarias',
                        required: true,
                        attributes: ['id_usuario', 'id_secundaria', 'premio'],
                        include: [
                            {
                                model: models.ActividadSecundaria,
                                as: 'act_secundaria',
                                where: {
                                    completada: true,
                                    id_modalidad: 1
                                },
                                required: true,
                                attributes: ['nombre', 'url_foto', 'localizacion', 'fecha', 'frecuencia', 'banda', 'id_modo', 'id_modalidad']
                            }
                        ]
                    }
                ]
            });
            this.desconectar();
            return resultados;
        } catch (error) {
            this.desconectar();
            console.error('Error al mostrar los usuarios con diplomas', error);
            throw error;
        }
    }

    /************************************************************************************************************************************
     * Nombre consulta: mostrarUsuarios                                                                                                 *
     * Descripción: Esta consulta permite mostrar los usuarios en la base de datos                                                      *
     * Parametros: ninguno                                                                                                              *
     * Pantalla: Gestion de Usuarios                                                                                                    *
     * Rol: administrador                                                                                                               *
     * Nota: Se muestran los usuarios con su rol                                                                                        *
     ************************************************************************************************************************************/

    mostrarUsuarios = async () => {
        try {
            let resultados = [];
            this.conectar();
            resultados = await models.Usuario.findAll({
                attributes:  { exclude: ['created_at', 'updated_at', 'deleted_at'] },
                where: {
                    nombre: {
                        [Op.ne]: ''
                    }
                },
                include: [{
                    model: models.Rol,
                    through: {
                        model: models.RolAsignado,
                        attributes: [],
                    },
                    as: 'roles',
                    attributes: ['nombre']
                }]
            });
            this.desconectar();
            return resultados;
        } catch (error) {
            this.desconectar();
            console.error('Error al mostrar los usuarios:', error);
            throw error;
        }
    }
}

module.exports = UsuarioConexion;