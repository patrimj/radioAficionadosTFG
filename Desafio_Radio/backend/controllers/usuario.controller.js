const { response, request } = require('express');
const ConexionUsuario = require('../database/usuarios.conexion');
const { enviarCorreo } = require("./correo.controller");
const { generarContrasena } = require("../helpers/comun");
const { subirArchivo } = require("../helpers/subir-archivo");
const { generarJWT } = require("../helpers/generate_jwt");

/************************************************************************************************************************************
 * Nombre consulta: login                                                                                                           *                                                                                                  
 * Descripción: Esta consulta permite iniciar sesión si el usuario está registrado en la base de datos                              *                                                      
 * Parametros: email y password                                                                                                     *            
 * Pantalla: Login                                                                                                                  *    
 * Nota: Se genera un token para el usuario que inicia sesión                                                                                                        
 * Rol: aficionado, admin, operador                                                                                                 *                                                                                                                   
 ***********************************************************************************************************************************/

const login = async (req = request, res = response) => {

    const conx = new ConexionUsuario();

    conx.login(req.body.email, req.body.password)
        .then(usuario => {
            if (!usuario) {
                return res.status(401).json({
                    error: 'No se encontró ningún usuario con ese correo electrónico y contraseña.'
                });
            }

            const token = generarJWT(usuario);
            const datos = {
                token: token,
                usuario: usuario
            };

            console.log('Inicio de sesión exitoso');
            res.status(200).json(datos);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: 'Error al iniciar sesión ' });
        });
}

/************************************************************************************************************************************
 * Nombre consulta: registro                                                                                                        *
 * Descripción: Esta consulta permite registrar un usuario en la base de datos                                                      *
 * Parametros: email, password, nombre, apellido_uno, apellido_dos, url_foto, id_examen                                             *
 * Pantalla: Registro                                                                                                               *
 * Rol: aficionado, admin, operador                                                                                                 *
 * Nota: El id_rol siempre será 3, ya que es el rol "aficionado"                                                                    *
 ***********************************************************************************************************************************/

const registro = async (req = request, res = response) => {

    const conx = new ConexionUsuario();

    const usuario = {
        email: req.body.email,
        password: req.body.password,
        nombre: req.body.nombre,
        apellido_uno: req.body.apellido_uno,
        apellido_dos: req.body.apellido_dos,
        url_foto: req.body.url_foto,
        id_examen: req.body.id_examen,
        id_rol: 3
    };

    conx.registro(usuario)
        .then(msg => {
            console.log('Registro exitoso');
            res.status(200).json({ message: 'Registro exitoso', data: msg });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: 'Error al registrar usuario ' });
        });
}

/************************************************************************************************************************************
* Nombre consulta: cambiarPassword                                                                                                  *
* Descripción: Esta consulta permite cambiar la contraseña de un usuario en la base de datos                                        *
* Parametros: email, password                                                                                                       *
* Pantalla: Perfil                                                                                                                  *
* Rol: aficionado, admin, operador                                                                                                  *
************************************************************************************************************************************/

const cambiarPassword = async (req = request, res = response) => {

    const conx = new ConexionUsuario();

    conx.cambiarPassword(req.body.email, req.body.password)
        .then(msg => {
            console.log('Cambio de contraseña exitoso');
            res.status(200).json({ message: 'Cambio de contraseña exitoso', data: msg });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: 'Error al cambiar contraseña ' });
        });
}

/************************************************************************************************************************************
 * Nombre consulta: mostrarPerfil                                                                                                   *
 * Descripción: Esta consulta permite mostrar el perfil de un usuario en la base de datos                                           *
 * Parametros: id_usuario                                                                                                           *
 * Pantalla: Perfil                                                                                                                 *
 * Rol: aficionado, admin, operador                                                                                                 *
 ***********************************************************************************************************************************/

const mostrarPerfil = async (req = request, res = response) => {

    const conx = new ConexionUsuario();

    conx.mostrarPerfil(req.body.id_usuario)
        .then(msg => {
            console.log('Perfil mostrado exitosamente');
            res.status(200).json({ message: 'Perfil mostrado exitosamente', data: msg });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: 'Error al mostrar perfil ' });
        });
}

/************************************************************************************************************************************
* Nombre consulta: modificarPerfil                                                                                                  *  
* Descripción: Esta consulta permite modificar el perfil de un usuario en la base de datos                                          *
* Parametros: id_usuario, email, nombre, apellido_uno, apellido_dos, url_foto, id_examen, id_rol                                    *
* Pantalla: Perfil                                                                                                                  *
* Rol: aficionado, admin, operador                                                                                                  *
************************************************************************************************************************************/

const modificarPerfil = async (req, res = response) => {

    const conx = new ConexionUsuario();

    if (!req.files || !req.files.archivo) {
        return res.status(400).json({ msg: 'No se subió ninguna imagen' });
    }

    try {
        const resultadoSubida = await subirArchivo(req.files.archivo, undefined, 'usuario');

        if (resultadoSubida && resultadoSubida.secure_url) {
            req.body.url_foto = resultadoSubida.secure_url;
        } else {
            throw new Error('Error al subir el archivo');
        }

        conx.modificarPerfil(req.params.id, req.body)
            .then(msg => {
                console.log('Perfil modificado correctamente !');
                res.status(200).json({ message: 'Perfil modificado correctamente!', data: msg });
            })
            .catch(err => {
                console.log(err);
                res.status(200).json({ msg: 'No se han encontrado registros' });
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error al subir la imagen o al modificar el perfil' });
    }
}

/************************************************************************************************************************************
* Nombre consulta: buscarUsuario                                                                                                    *
* Descripción: Esta consulta permite buscar un usuario en la base de datos por su nombre                                            *
* Parametros: nombre                                                                                                                *
* Pantalla: Gestion de Usuarios                                                                                                     *
* Rol: administrador                                                                                                                *
************************************************************************************************************************************/

const buscarUsuario = async (req = request, res = response) => {

    const conx = new ConexionUsuario();

    conx.buscarUsuario(req.body.nombre)
        .then(msg => {
            console.log('Usuario encontrado');
            res.status(200).json({ message: 'Usuario encontrado', data: msg });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: 'Error al buscar usuario ' });
        });
}

/************************************************************************************************************************************
* Nombre consulta: mostrarIdUsuarioPorIndicativo                                                                                    *
* Descripción: Esta consulta permite buscar a un usuario por su indicativo en la base de datos                                      *
* Parametros: id_examen                                                                                                             *
* Pantalla: Gestion de Usuarios                                                                                                     *
* Rol: administrador                                                                                                                *
************************************************************************************************************************************/

const mostrarIdUsuarioPorIndicativo = async (req = request, res = response) => {

    const conx = new ConexionUsuario();

    conx.mostrarIdUsuarioPorIndicativo(req.body.id_examen)
        .then(msg => {
            console.log('Usuario encontrado');
            res.status(200).json({ message: 'Usuario encontrado', data: msg });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: 'Error al buscar usuario ' });
        });
}

/************************************************************************************************************************************
* Nombre consulta: altaUsuarioCompleto                                                                                              *
* Descripción: Esta consulta permite dar de alta a un usuario en la base de datos con roles asignados                               *
* Parametros: email, password, nombre, apellido_uno, apellido_dos, url_foto, id_examen, id_rol                                      * 
* Pantalla: Gestion de Usuarios                                                                                                     *
* Rol: administrador                                                                                                                *
* Nota: la contraseña se manda por correo                                                                                           *
************************************************************************************************************************************/

const altaUsuarioCompleto = async (req, res = response) => {
    const conx = new ConexionUsuario();
    const id_rol = req.params.id_rol;

    if (!req.body.password) {
        const contrasena = generarContrasena(16);
        req.cuerpoCorreo = `
            <h1>Bienvenido a Radioaficionado</h1>
            <p>Se ha creado una cuenta para ti. Tu contraseña temporal es:</p>
            <h3>${contrasena}</h3>
            <p>Por favor, cambia tu contraseña en tu primer inicio de sesión.</p>
        `;
        const enviado = await enviarCorreo(req, res);
        if (!enviado) {
            return res.status(500).json({ msg: "No se pudo enviar el correo electrónico" });
        }
        req.body.password = await bcrypt.hash(contrasena, 10);
    }

    if (!req.files || !req.files.archivo) {
        return res.status(400).json({ msg: 'No se subió ninguna imagen' });
    }

    try {
        const resultadoSubida = await subirArchivo(req.files.archivo, undefined, 'usuario');
        if (resultadoSubida && resultadoSubida.secure_url) {
            req.body.url_foto = resultadoSubida.secure_url;
        } else {
            throw new Error('Error al subir el archivo');
        }

        const usuarioNuevo = await conx.altaUsuarioCompleto(req.body, id_rol);
        if (usuarioNuevo) {
            res.status(200).json({ message: 'Usuario dado de alta correctamente', data: usuarioNuevo, rol: usuarioNuevo.rol });
        } else {
            throw new Error('Error al crear el usuario');
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error al subir la imagen o al crear el usuario' });
    }
}

/************************************************************************************************************************************
* Nombre consulta: bajaUsuario                                                                                                      *
* Descripción: Esta consulta permite dar de baja a un usuario en la base de datos                                                   *
* Parametros: id                                                                                                                    * 
* Pantalla: Gestion de Usuarios                                                                                                     *
* Rol: administrador                                                                                                                *
************************************************************************************************************************************/

const bajaUsuario = (req, res = response) => {
    const conx = new ConexionUsuario();

    conx.bajaUsuario(req.params.id)
        .then(msg => {
            console.log('usuario dado de baja correctamente!');
            res.status(200).json({ message: 'Usuario dado de baja correctamente!', data: msg });
        })
        .catch(err => {
            console.log(err);
            res.status(200).json({ msg: 'No se han encontrado registros' });
        });
}

/************************************************************************************************************************************
* Nombre consulta: modificarUsuario                                                                                                 *
* Descripción: Esta consulta permite modificar a un usuario en la base de datos                                                     *
* Parametros: id, email, nombre, apellido_uno, apellido_dos, url_foto, id_examen, id_rol                                            *
* Pantalla: Gestion de Usuarios                                                                                                     *
* Rol: administrador                                                                                                                *  
************************************************************************************************************************************/

const modificarUsuario = async (req, res = response) => {
    const conx = new ConexionUsuario();

    if (!req.files || !req.files.archivo) {
        return res.status(400).json({ msg: 'No se subió ninguna imagen' });
    }

    try {
        const resultadoSubida = await subirArchivo(req.files.archivo, undefined, 'usuario');

        if (resultadoSubida && resultadoSubida.secure_url) {
            req.body.url_foto = resultadoSubida.secure_url;
        } else {
            throw new Error('Error al subir el archivo');
        }

        conx.modificarUsuario(req.params.id, req.body)
            .then(msg => {
                console.log('usuario modificado correctamente !');
                res.status(200).json({ message: 'Usuario modificado correctamente!', data: msg });
            })
            .catch(err => {
                console.log(err);
                res.status(200).json({ msg: 'No se han encontrado registros' });
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error al subir la imagen o al modificar el usuario' });
    }
}

/************************************************************************************************************************************
* Nombre consulta: asignarRol                                                                                                       *
* Descripción: Esta consulta permite asignar un rol a un usuario en la base de datos                                                *
* Parametros: id_rol, id_usuario                                                                                                    *
* Pantalla: Gestion de Usuarios                                                                                                     *
* Rol: administrador                                                                                                                *
************************************************************************************************************************************/

const asignarRol = (req, res = response) => {
    const conx = new ConexionUsuario();

    conx.asignarRol(req.params.id_rol, req.params.id_usuario)
        .then(msg => {
            console.log('Rol asignado correctamente !');
            res.status(200).json({ message: 'Rol asignado correctamente!', data: msg });
        })
        .catch(err => {
            console.log(err);
            res.status(200).json({ msg: 'No se han encontrado registros' });
        });
}

/************************************************************************************************************************************
 * Nombre consulta: mostrarUsuarioConDiploma                                                                                        *
 * Descripción: Esta consulta permite mostrar un usuario con diploma en la base de datos                                            *
 * Parametros: email                                                                                                                *
 * Pantalla: Gestion de Usuarios                                                                                                    *
 * Rol: administrador                                                                                                               *
 ***********************************************************************************************************************************/

const mostrarUsuarioConDiploma = async (req, res = response) => {
    const conx = new ConexionUsuario();

    conx.mostrarUsuarioConDiploma(req.params.email)
        .then(msg => {
            console.log('Usuario mostrado');
            res.status(200).json({ message: 'Usuario con diploma mostrado correctamente!', data: msg });
        })
        .catch(err => {
            console.log(err);
            res.status(200).json({ msg: 'No se ha encontrado el usuario' });
        });
}

/************************************************************************************************************************************
 * Nombre consulta: mostrarUsuariosConDiploma                                                                                       *
 * Descripción: Esta consulta permite mostrar los usuarios con diplomas en la base de datos                                         *
 * Parametros: email                                                                                                                *
 * Pantalla: Gestion de Usuarios                                                                                                    *
 * Rol: administrador                                                                                                               *
 ***********************************************************************************************************************************/

const mostrarUsuariosConDiploma = async (req = request, res = response) => {
    const conx = new ConexionUsuario();

    conx.mostrarUsuariosConDiploma()
        .then(msg => {
            console.log('Usuarios mostrados');
            res.status(200).json({ message: 'Usuarios con diploma mostrados correctamente!', data: msg });
        })
        .catch(err => {
            console.log(err);
            res.status(200).json({ msg: 'No se han encontrado los usuarios' });
        });
}

/************************************************************************************************************************************
 * Nombre consulta: mostrarUsuarios                                                                                                 *
 * Descripción: Esta consulta permite mostrar los usuarios en la base de datos                                                      *
 * Parametros: ninguno                                                                                                              *
 * Pantalla: Gestion de Usuarios                                                                                                    *
 * Rol: administrador                                                                                                               *
 * Nota: Se muestran los usuarios con su rol                                                                                        *
 ************************************************************************************************************************************/


const mostrarUsuarios = async (req = request, res = response) => {
    const conx = new ConexionUsuario();

    conx.mostrarUsuarios()
        .then(msg => {
            console.log('Usuarios mostrados');
            res.status(200).json({ message: 'Usuarios mostrados correctamente!', data: msg });
        })
        .catch(err => {
            console.log(err);
            res.status(200).json({ msg: 'No se han encontrado registros' });
        });
}

/************************************************************************************************************************************
 * Nombre consulta: recuperarContrasena                                                                                             *
 * Descripción: Esta consulta permite recuperar la contraseña de un usuario en la base de datos                                     *
 * Parametros: email                                                                                                                *
 * Pantalla: Recuperar contraseña                                                                                                   *
 * Rol: aficionado, admin, operador                                                                                                 *
 * Nota: Se envía la nueva contraseña por correo electrónico                                                                        *
 ***********************************************************************************************************************************/

const recuperarContrasena = async (req, res) => {
    const conx = new ConexionUsuario();
    const destinatario = req.body.email;

    const contrasena = generarContrasena(16);

    req.cuerpoCorreo = `
    <h1>Recuperación de contraseña de Radioaficionado</h1>
    <p>Se ha notificado un intento de recuperación de contraseña en su cuenta (<b>${destinatario}</b>).</p>
    <p>Su nueva contraseña es:</p>
    <h3>${contrasena}</h3>`;

    const enviado = await enviarCorreo(req, res);

    console.log(enviado)

    if (enviado) {
        req.body.password = contrasena

        try {
            const actualizada = await conx.cambiarPassword(destinatario, contrasena);
            if (actualizada === true) return res.status(200).json({ msg: true });

            else return res.status(403).json({ msg: false });
        } catch (e) {
            return res.status(500).json({ msg: e.message });
        }
    }
}

module.exports = {
    login,
    registro,
    cambiarPassword,
    mostrarPerfil,
    modificarPerfil,
    buscarUsuario,
    mostrarIdUsuarioPorIndicativo,
    altaUsuarioCompleto,
    bajaUsuario,
    modificarUsuario,
    asignarRol,
    mostrarUsuarioConDiploma,
    mostrarUsuariosConDiploma,
    mostrarUsuarios,
    recuperarContrasena
}


