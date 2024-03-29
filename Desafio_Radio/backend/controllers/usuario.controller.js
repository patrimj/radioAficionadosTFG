const { response, request } = require('express');
const ConexionUsuario = require('../database/usuarios.conexion');
const {enviarCorreo} = require("./correo.controller");
const {generarContrasena} = require("../helpers/comun");
const {subirArchivo} = require("../helpers/subir-archivo");
const ConexionSql = require("../database/conexionSql");
const conxSql = new ConexionSql();

// ---------------------------- RUTAS CUALQUIER USUARIO ----------------------------

// REGISTRO
/**
 * @author - JuanNavarrete
 */
const registro = async (req, res) => {
    try {
        const conx = new ConexionUsuario();
        const rolAficionado = await conx.verRolNombre("aficionado");
        const rolRegistrar = req.body.roles[0];

        if (rolRegistrar.id !== rolAficionado.id) {
            return res.status(400).json({ msg: "Se ha intentado insertar un usuario no valido." });
        }

        const idRegistrado = await conx.registrarUsuario(req.body);

        await conx.asignarRol(rolAficionado.id, idRegistrado);

        if (idRegistrado !== null) return res.status(200).json({ msg: true });

        else return res.status(403).json({ msg: false });
    } catch (e) {
        return res.status(500).json({ msg: e.message });
    }
}


// CAMBIAR CONTRASEÑA

/**
 * @author JuanNavarrete
 */
const cambiarContrasena = async (req, res) => {
    const conx = new ConexionUsuario();

    try {
        const cambiada = await conx.cambiarContrasena(req);

        if (!cambiada) {
            return res.status(401).json({ error: 'No existe ningun usuario coincidente.' });
        }

        return res.status(200).json({ cambiada: cambiada });
    } catch (e) {
        return res.status(400).json({ error: e.message });
    }
}

// VER PERFIL

/**
 * @author JuanNavarrete
 */
const verPerfil = async (req, res) => {
    const conx = new ConexionUsuario();

    try {
        const usuario = await conx.verPerfil(req);

        if (!usuario) return res.status(404).json({ error: 'No existe ningun usuario coincidente.' });

        return res.status(200).json({ usuario: usuario });
    } catch (e) {
        return res.status(400).json({ error: e.message });
    }
}

// MODIFICAR PERFIL

/**
 * @author JuanNavarrete
 */
const modificarPerfil = async (req, res = response) => {
    const conx = new ConexionUsuario();

    try {
        if (req.files.archivo) {
            const resultado = await subirArchivo(req.files.archivo, undefined, 'imgs');

            if (!(resultado && resultado.secure_url)) {
                return res.status(500).json({msg: 'Ha ocurrido un error al subir la foto de perfil.'})
            }

            req.body.url_foto = resultado.secure_url
        }

        console.log(req.params.id)
        const usuarioExiste = await conx.mostrarUsuario(req) !== null;

        if (!usuarioExiste) return res.status(404).json({ error: 'No existe ningun usuario coincidente.' });

        const usuario = await conx.modificarPerfil(req);

        if (!usuario) return res.status(401).json({ error: 'No se ha actualizado el perfil.' });

        return res.status(200).json({ usuario: usuario });
    } catch (e) {
        console.error(e)
        return res.status(400).json({ error: e.message });
    }
}

// VER NOTICIAS

const mostrarNoticias = async (req = request, res = response) => {

    const conx = new ConexionUsuario();

    conx.mostrarNoticias()
        .then(msg => {
            console.log('Noticias mostradas');
            res.status(200).json(msg);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: 'Error al mostrar las noticias' });
        });
}

// ---------------------------- RUTAS ADMINISTRADOR ----------------------------


// ELIMINAR NOTICIAS

const eliminarNoticia = (req = request, res = response) => {
    const conx = new ConexionUsuario();
    const id = req.params.id;

    conx.eliminarNoticia(id)
        .then(msg => {
            console.log('Noticia eliminada correctamente!');
            res.status(200).json({ message: 'Noticia eliminada correctamente!', data: msg })
        })
        .catch(err => {
            console.log(err);
            res.status(200).json({ msg: 'No se ha podido eliminar la noticia' });
        });
}

// MODIFICAR NOTICIAS

const modificarNoticia = (req = request, res = response) => {
    const conx = new ConexionUsuario();
    const id = req.params.id;

    conx.modificarNoticia(id, req.body)
        .then(msg => {
            console.log('Noticia modificada correctamente!');
            res.status(200).json({ message: 'Noticia modificada correctamente!', data: msg })
        })
        .catch(err => {
            console.log(err);
            res.status(200).json({ msg: 'No se ha podido modificar la noticia' });
        });
}

// CREAR NOTICIAS

const crearNoticia = (req = request, res = response) => {
    const conx = new ConexionUsuario();

    conx.crearNoticia(req.body)
        .then(msg => {
            console.log('Noticia creada correctamente!');
            res.status(200).json({ message: 'Noticia insertada correctamente!', data: msg });
        })
        .catch(err => {
            console.log(err);
            res.status(200).json({ msg: 'No se ha podido crear la noticia' });
        });
}

// VER USUARIOS

const verUsuarios = async (req = request, res = response) => {
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

// VER UN USUARIO
/**
 *
 * @author JuanNavarrete
 */
const mostrarUsuarioPorId = async (req = request, res = response) => {
    const conx = new ConexionUsuario();

    const usuario = await conx.mostrarUsuario(req);

    if (usuario === 0) return res.status(404).json({
        msg: `No existe el usuario con id ${req.params.id}`
    });

    return res.status(200).json(usuario);
}

// VER UN USUARIO POR EMAIL

const mostrarUsuarioPorEmail = async (req = request, res = response) => {
    const conx = new ConexionUsuario();

    conx.mostrarUsuarioPorEmail(req.params.email)
        .then(msg => {
            console.log('Usuario mostrado');
            res.status(200).json({ message: 'Usuario mostrado correctamente!', data: msg });
        })
        .catch(err => {
            console.log(err);
            res.status(200).json({ msg: 'No se ha encontrado el usuario' });
        });
}

//ALTA USUARIO

const altaUsuario = (req, res = response) => {
    const conx = new ConexionUsuario();

    conx.altaUsuario(req.body)
        .then(msg => {
            console.log('usuario dado de alta correctamente!');
            res.status(200).json({message: 'Usuario dado de alta correctamente!', data: msg});
        })
        .catch(err => {
            console.log(err);
            res.status(200).json({ msg: 'No se han encontrado registros' });
        });
}

//BAJA USUARIO

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

//MODIFICAR USUARIO

//MODIFICAR USUARIO
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


const altaUsuarioCompleto = async (req, res = response) => {
    console.log('usuario', req.body);
    const conx = new ConexionUsuario();
    const id_rol = req.params.id_rol;

    console.log('nombre', req.body.nombre);

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
            console.log(usuarioNuevo)
            console.log('Usuario dado de alta correctamente');
            res.status(200).json({ message: 'Usuario dado de alta correctamente', data: usuarioNuevo, rol: usuarioNuevo.rol });
        } else {
            throw new Error('Error al crear el usuario');
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error al subir la imagen o al crear el usuario' });
    }
}

// VER USUARIO CON DIPLOMA

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

// VER USUARIOS CON DIPLOMA

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

/**
 *
 * @author JuanNavarrete
 */
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
            const actualizada = await conx.cambiarContrasenaRec(req);
            if (actualizada === true) return res.status(200).json({ msg: true });

            else return res.status(403).json({ msg: false });
        } catch (e) {
            return res.status(500).json({ msg: e.message });
        }
    }
}

/**
 * @author JuanNavarrete
 */
const obtenerRolNombre = async (req, res = response) => {
    const conx = new ConexionUsuario();

    try {
        const nombre = req.body.nombre;

        const rol = await conx.mostrarRolNombre(nombre);

        if (!rol) return res.status(404).json({ msg: `Se ha encontrado el rol ${nombre}` })

        return res.status(200).json({ msg: `Se ha encontrado el rol ${nombre}` }, { data: rol })
    } catch (e) {
        return res.status(400).json({ msg: `Se ha encontrado el rol ${nombre}` }, { data: rol })
    }
}

module.exports = {
    mostrarNoticias,
    eliminarNoticia,
    modificarNoticia,
    crearNoticia,
    mostrarUsuarioPorId,
    altaUsuario,
    bajaUsuario,
    modificarUsuario,
    verUsuarios,
    mostrarUsuarioPorEmail,
    mostrarUsuarioConDiploma,
    mostrarUsuariosConDiploma,
    asignarRol,
    altaUsuarioCompleto,
    verPerfil,
    cambiarContrasena,
    modificarPerfil,
    recuperarContrasena,
    registro
}
