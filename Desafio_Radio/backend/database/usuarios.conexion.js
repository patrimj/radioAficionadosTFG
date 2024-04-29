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
                where: { email: email },
                include: {
                    model: models.Rol,
                    as: 'roles'
                }
            });

            this.desconectar();

            if (!usuario) return 0;
            const passwordCorrecta = await bcrypt.compare(password, usuario.password)

            if (!passwordCorrecta) return COD_INCORRECTO

            console.log('LOGIN', usuario);

            return usuario;
        } catch (e) {
            console.log(e.message)
            return false;
        }
    }

    login = async (email, password) => {
        try {
            this.conectar();

            const usuario = await models.Usuario.findOne({
                where: { email: email },
                include: {
                    model: models.Rol,
                    as: 'roles'
                }
            });
            this.desconectar();
            return usuario;

        } catch (error) {
            this
            console.error('Error al iniciar sesión', error);
            throw error;
        }


            if (!usuario) return 0;
            const passwordCorrecta = await bcrypt.compare(password, usuario.password)

            if (!passwordCorrecta) return COD_INCORRECTO

            console.log('LOGIN', usuario);

            return usuario;
        }


    // REGISTRO

    // CAMBIAR CONTRASEÑA
    cambiarContrasena = async (req) => {
        try {
            this.conectar();

            const contrasenaHasheada = await bcrypt.hash(req.body.password, 10);

            const actualizados = await models.Usuario.update(
                {password: contrasenaHasheada},
                {where: { id: req.params.id }}
            );

            this.desconectar();

            if (!actualizados) return false;

            return actualizados.length > 0;
        } catch (e) {
            console.log(e.message)
            return false;
        }
    }


    // VER PERFIL
    verPerfil = async (req) => {
        try {
            this.conectar();

            const usuario = await models.Usuario.findOne({where: { id: req.params.id }});

            this.desconectar();

            if (!usuario) return false;

            return usuario;
        } catch (e) {
            console.log(e.message)
            return false;
        }
    }

    // MODIFICAR PERFIL 
    modificarPerfil = async (req) => {
        try {
            this.conectar();

            const usuario = await models.Usuario.update(req.body, {where: {id: req.params.id}});

            this.desconectar();

            if (!usuario) return false;

            return usuario;
        } catch (e) {
            console.error(e.message)
            return false;
        }
    }

    // NOTICIAS

    mostrarNoticias = async () => {
        let resultados = [];
        this.conectar();
        resultados = await models.Noticias.findAll({
            order: [
                ['fecha', 'ASC']
            ]
        });
        this.desconectar();
        return resultados;
    }

    // ---------------------------- RUTAS ADMINISTRADOR ----------------------------

    // ELIMINAR NOTICIAS

    eliminarNoticia = async (id) => {
        try {
            this.conectar();
            let resultado = await models.Noticias.findByPk(id);
            if (!resultado) {
                this.desconectar();
                throw error;
            }
            await resultado.destroy();
            this.desconectar();
            return resultado;
        } catch (error) {
            this.desconectar();
            console.error('Error al eliminar una noticia', error);
            throw error;
        }
    }

    // MODIFICAR NOTICIAS

    modificarNoticia = async (id, body) => {
        try {
            this.conectar();
            let resultado = await models.Noticias.findByPk(id);
            if (!resultado) {
                this.desconectar();
                throw error;
            }
            await resultado.update(body);
            this.desconectar();
            return resultado;
        } catch (error) {
            this.desconectar();
            console.error('Error al modificar una noticia', error);
            throw error;
        }
    }

    // CREAR NOTICIAS

    crearNoticia = async (body) => {
        try {
            this.conectar();
            let resultado = await models.Noticias.create(body);
            this.desconectar();
            return resultado;
        } catch (error) {
            this.desconectar();
            console.error('Error al crear la noticia:', error);
            throw error;
        }
    }

    // VER USUARIOS CON SU ROL

    mostrarUsuarios = async () => {
        try {
            let resultados = [];
            this.conectar();
            resultados = await models.Usuario.findAll({
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
    // VER UN USUARIO

    /**
     *
     * @param {Request} req
     * @returns {Promise<Model|null|number|boolean>} - Devuelve `Object` si hay coincidencias, `0` si no hay coincidencias, `false` si ha ocurrido un error.
     * @author JuanNavarrete
     */
    mostrarUsuario = async (req) => {
        try {
            this.conectar();

            const resultados = await models.Usuario.findByPk(req.params.id);

            this.desconectar();

            if (!resultados) return COD_INCORRECTO;

            return resultados;
        } catch (error) {
            console.log(error)

            return false;
        }
    }

    //VER UN USUARIO POR EMAIL

    mostrarUsuarioPorEmail = async (email) => {
        try {
            this.conectar();
            const usuario = await models.Usuario.findOne({
                where: {
                    email: email
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
            console.error('Error al mostrar el usuario por email:', error);
            throw error;
        }
    }

    /**
     * 
     * @author ElenaRgC 
     */
    // VER USUARIO POR INDICATIVO

    mostrarIdUsuarioPorIndicativo = async (indicativo) => {
        try {
            this.conectar();
            const usuario = await models.Usuario.findOne({
                where: {
                    id_examen: indicativo
                },
                attributes: ['id']
            });
            this.desconectar();
            return usuario ? usuario.id : null;
        } catch (error) {
            this.desconectar();
            throw error;
        }
    }

    // ALTA USUARIO

    altaUsuario = async (body) => {
        let resultado = 0;
        this.conectar();
        try {
            const usuarioNuevo = await models.Usuario.create(body);
            resultado = usuarioNuevo;
        } catch (error) {
            if (error instanceof Sequelize.UniqueConstraintError) {
                console.log(`El email ${body.email} ya existe en la base de datos.`);
            } else {
                console.log('Ocurrió un error desconocido: ', error);
            }
            throw error;
        } finally {
            this.desconectar();
        }
        return resultado;
    }

    // BAJA USUARIO

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

    // MODIFICAR USUARIO

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

            return { usuario: resultado, rol: rolAsignado};
        } catch (error) {
            this.desconectar();
            console.error('Error al modificar el usuario', error);
            throw error;
        }
    }

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

    //ALTA USUARIO COMPLETO ASIGNANDO ROLES
    altaUsuarioCompleto = async (usuario, id_rol) => {
        let resultado = 0;
        let rolAsignado = 0;
        this.conectar();
        try {
            console.log(usuario.password)
            usuario.password = await bcrypt.hash(usuario.password, 10);
            const usuarioNuevo = await models.Usuario.create(usuario);
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
                console.log(`El email ${body.email} ya existe en la base de datos.`);
            } else {
                console.log('Ocurrió un error desconocido: ', error);
            }
            throw error;
        } finally {
            this.desconectar();
        }
        return resultado;
    }

    // VER USUARIO CON DIPLOMA

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


    //VER USUARIOS CON DIPLOMA

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

    // TODO: Ruta usuarios dentro de una act. secundaria

    // CAMBIAR CONTRASEÑA
    cambiarContrasenaRec = async (req) => {
        try {
            this.conectar();

            const contrasenaHasheada = await bcrypt.hash(req.body.password, 10);

            const actualizados = await models.Usuario.update(
                {password: contrasenaHasheada},
                {where: { email: req.body.email }}
            );

            this.desconectar();

            if (!actualizados) return false;

            return actualizados.length > 0;
        } catch (e) {
            console.log(e.message)
            return false;
        }
    }

    /**
     *
     * @author JuanNavarrete
     */
    registrarUsuario = async (usuario) => {
        try {
            this.conectar();

            usuario.password = await bcrypt.hash(usuario.password, 10);
            console.log('registrar')

            const user = await models.Usuario.create(usuario);

            this.desconectar();

            return user.id;
        } catch (e) {
            console.error(e)
            return false;
        }
    }

    /**
     *
     * @author JuanNavarrete
     */
    verRolNombre = async (nombre) => {
        return await models.Rol.findOne({
            where: {nombre: nombre}
        });
    }

    /**
     *
     * @param {Request} req
     * @returns {Promise<Model|null|number|boolean>} - Devuelve `Object` si hay coincidencias, `0` si no hay coincidencias, `false` si ha ocurrido un error.
     * @author JuanNavarrete
     */
    mostrarRolNombre = async (nombre) => {
        try {
            this.conectar();

            const resultados = await models.Rol.findOne({where: {nombre: req.params.nombre}});

            this.desconectar();

            if (!resultados) return COD_INCORRECTO;

            return resultados;
        } catch (error) {
            console.log(error)

            return false;
        }
    }
}


module.exports = UsuarioConexion;