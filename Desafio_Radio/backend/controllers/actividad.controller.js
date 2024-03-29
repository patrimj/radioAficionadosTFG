const { response, request } = require('express');
const ConexionActividades = require('../database/actividades.conexion');
const { generarJWT } = require('../helpers/generate_jwt');
const UsuarioConexion = require("../database/usuarios.conexion");
const ConexionUsuario = require("../database/usuarios.conexion");
const { subirArchivo } = require("../helpers/subir-archivo");
// ---------------------------- RUTAS CUALQUIER USUARIO ----------------------------

// VER ACTIVIDADES PROPIAS 

const getActividadesPrincipalesAficionado = async (req = request, res = response) => {

    const conx = new ConexionActividades();

    id_usuario = req.usuario.id;
    console.log(id_usuario);

    conx.getActividadesPrincipalesAficionado(id_usuario)

        .then(msg => {
            console.log('Actividades  mostradas');
            res.status(200).json({ message: 'Actividades mostradas correctamente!', data: msg });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: "Error al mostrar las actividades." })
        });
}

const getActividadesSecundariasAficionado = async (req = request, res = response) => {

    const conx = new ConexionActividades();

    const id_usuario = req.usuario.id


    conx.getActividadesSecundariasAficionado(id_usuario)

        .then(msg => {
            console.log('Actividades  mostradas');
            res.status(200).json({ message: 'Actividades mostradas correctamente!', data: msg });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: "Error al mostrar las actividades." })
        });
}

// PEDIR DIPLOMA DE ACTIVIDAD 
//(igual que el de listar usuarios con diploma pero mostrando las actividades sin diplo y con y despues con un boton qye se modifique a con boton)
//el boton pedir diploma consulta del usuario y de su actividad individual para sacar su nombre de la actividad, id_examen

// ---------------------------- RUTAS ADMINISTRADOR ----------------------------

// VER TODAS LAS ACTIVIDADES

const mostrarActividadesPrincipales = async (req = request, res = response) => {

    const conx = new ConexionActividades();

    conx.mostrarActividadesPrincipales()
        .then(msg => {
            console.log('Actividades principales mostradas');
            res.status(200).json({ message: 'Actividades principales mostradas correctamente!', data: msg });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: 'Error al mostrar las actividades principales' });
        });
}

// VER TODAS LAS ACTIVIDADES SECUNDARIAS

const mostrarActividadesSecundarias = async (req = request, res = response) => {

    const conx = new ConexionActividades();

    conx.mostrarActividadesSecundarias()
        .then(msg => {
            console.log('Actividades secundarias mostradas');
            res.status(200).json({ message: 'Actividades secundarias mostradas correctamente!', data: msg });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: 'Error al mostrar las actividades secundarias' });
        });
}

// VER TODAS LAS ACTIVIDADES SECUNDARIAS TERMINADAS

const mostrarActividadesSecundariasTerminadas = async (req = request, res = response) => {

    const conx = new ConexionActividades();

    conx.mostrarActividadesSecundariasTerminadas()
        .then(msg => {
            console.log('Actividades secundarias terminadas mostradas');
            res.status(200).json({ message: 'Actividades secundarias terminadas mostradas correctamente!', data: msg });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: 'Error al mostrar las actividades secundarias terminadas' });
        });
}

// VER TODAS LAS ACTIVIDADES SECUNDARIAS NO TERMINADAS

const mostrarActividadesSecundariasPendientes = async (req = request, res = response) => {

    const conx = new ConexionActividades();

    conx.mostrarActividadesSecundariasPendientes()
        .then(msg => {
            console.log('Actividades secundarias pendientes mostradas');
            res.status(200).json({ message: 'Actividades secundarias pendientes mostradas correctamente!', data: msg });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: 'Error al mostrar las actividades secundarias pendientes' });
        });
}

// VER TODAS LAS ACTIVIDADES TERMINADAS 

const mostrarActividadesPrincipalTerminadas = async (req = request, res = response) => {

    const conx = new ConexionActividades();

    conx.mostrarActividadesPrincipalTerminadas()
        .then(msg => {
            console.log('Actividades principales terminadas mostradas');
            res.status(200).json({ message: 'Actividades principales terminadas mostradas correctamente!', data: msg });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: 'Error al mostrar las actividades principales terminadas' });
        });
}

// VER TODAS LAS ACTIVIDADES NO TERMINADAS

const mostrarActividadesPrincipalPendientes = async (req = request, res = response) => {

    const conx = new ConexionActividades();

    conx.mostrarActividadesPrincipalPendientes()
        .then(msg => {
            console.log('Actividades principales pendientes mostradas');
            res.status(200).json({ message: 'Actividades principales pendientes mostradas correctamente!', data: msg });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: 'Error al mostrar las actividades principales pendientes' });
        });
}


// ALTA ACTIVIDAD

const altaActividadPrincipal = async (req, res = response) => {
    const conx = new ConexionActividades();

    if (!req.files || !req.files.archivo) {
        return res.status(400).json({ msg: 'No se subió ninguna imagen' });
    }

    try {
        const resultadoSubida = await subirArchivo(req.files.archivo, undefined, 'concursos');

        if (resultadoSubida && resultadoSubida.secure_url) {
            req.body.url_foto = resultadoSubida.secure_url;
        } else {
            throw new Error('Error al subir el archivo');
        }

        const concursoNuevo = await conx.altaActividadPrincipal(req.body);
        if (concursoNuevo) {
            console.log('Actividad principal creada correctamente!');
            console.log(concursoNuevo);
            return res.status(200).json({ message: 'Actividad principal creada correctamente!', data: concursoNuevo });
        } else {
            throw new Error('Error al crear la actividad principal');
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error al subir la imagen o al crear el concurso' });
    }
}

// MODIFICAR ACTIVIDAD

const modificarActividadPrincipal = async (req, res = response) => {
    const conx = new ConexionActividades();

    if (!req.files || !req.files.archivo) {
        return res.status(400).json({ msg: 'No se subió ninguna imagen' });
    }

    try {
        const resultadoSubida = await subirArchivo(req.files.archivo, undefined, 'concursos');

        if (resultadoSubida && resultadoSubida.secure_url) {
            req.body.url_foto = resultadoSubida.secure_url;
        } else {
            throw new Error('Error al subir el archivo');
        }

        conx.modificarActividadPrincipal(req.params.id, req.body)
            .then(msg => {
                console.log('Actividad principal modificada correctamente!');
                res.status(200).json({ message: 'Actividad principal modificada correctamente!', data: msg });
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

// BAJA ACTIVIDAD

const bajaActividadPrincipal = (req, res = response) => {
    const conx = new ConexionActividades();

    conx.bajaActividadPrincipal(req.params.id)
        .then(msg => {
            console.log('Actividad principal dada de baja correctamente!');
            res.status(200).json({ message: 'Actividad principal dada de baja correctamente!', data: msg });
        })
        .catch(err => {
            console.log(err);
            res.status(200).json({ msg: 'No se han encontrado registros' });
        });
}

// VER ACTIVIDAD PRINCIPAL POR ID

const mostrarActividadPrincipalId = (req, res = response) => {
    const conx = new ConexionActividades();

    conx.mostrarActividadPrincipalId(req.params.id)
        .then(msg => {
            console.log('Actividad principal mostrada');
            res.status(200).json({ message: 'Actividad principal mostrada correctamente!', data: msg });
        })
        .catch(err => {
            console.log(err);
            res.status(200).json({ msg: 'No se ha encontrado la actividad principal' });
        });
}

// VER ACTIVIDAD SECUNDARIA POR ID

const mostrarActividadSecundariaPorId = (req, res = response) => {
    const conx = new ConexionActividades();

    conx.mostrarActividadSecundariaPorId(req.params.id)
        .then(msg => {
            console.log('Actividad secundaria mostrada');
            res.status(200).json({ message: 'Actividad secundaria mostrada correctamente!', data: msg });
        })
        .catch(err => {
            console.log(err);
            res.status(200).json({ msg: 'No se ha encontrado la actividad secundaria' });
        });
}


// VER PARTICIPANTES ACTIVIDADES PRINCIPALES

const participantesActividadesPrincipales = (req, res = response) => {
    const conx = new ConexionActividades();

    conx.participantesActividadesPrincipales()
        .then(msg => {
            console.log('Participantes de actividad mostrados');
            res.status(200).json({ message: 'Participantes principales mostrados correctamente!', data: msg });
        })
        .catch(err => {
            console.log(err);
            res.status(200).json({ msg: 'No se han encontrado registros' });
        });
}

// VER PARTICIPANTES ACTIVIDADES SECUNDARIAS

const participantes = (req, res = response) => {
    const conx = new ConexionActividades();

    conx.participantes()
        .then(msg => {
            console.log('Participantes de actividad mostrados');
            res.status(200).json({ message: 'Participantes secundarios mostrados correctamente!', data: msg });
        })
        .catch(err => {
            console.log(err);
            res.status(200).json({ msg: 'No se han encontrado registros' });
        });
}

// ---------------------------- RUTAS OPERADOR ----------------------------

// CREAR CONTACTO LETRA
/**
 * @author JuanNavarrete
 */
const crearContactoLetra = async (req, res) => {
    const conx = new ConexionActividades();

    try {
        const contacto = await conx.buscarContactoLetra(
            req.body.idUsuario,
            req.body.idActividad,
            req.body.premio
        );

        if (contacto) return res.status(200).json(
            {msg: "El contacto ya existe", data: false}
        );

        const progreso = await conx.verContactos(req.body.idUsuario, req.body.idActividad);
        const principal = await conx.verPrincipalSecundaria(req.body.idActividad);

        if (principal.completada) return res.status(200).json(
            {msg: "El concurso de la actividad indicada ya no está en curso", data: false}
        );

        const solucion = principal.solucion;

        if (progreso.join("") === solucion) return res.status(400).json(
            { msg: 'Ya estan todas las letras insertadas.', data: false }
        );

        if (!solucion.includes(req.body.premio)) return res.status(400).json(
            { msg: `El premio debe ser una letra de la palabra '${solucion}'`, data: false }
        );

        const insertado = await conx.crearContacto({
            id_usuario: req.body.idUsuario,
            id_secundaria: req.body.idActividad,
            premio: req.body.premio,
        });

        if (insertado)
            return res.status(200).json( { msg: `Se ha insertado el contacto correctamente'`, data: insertado });
        else
            return res.status(400).json( { msg: `No se ha insertado el contacto.`, data: insertado });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}


// CREAR CONTACTO PUNTOS
/**
 * @author JuanNavarrete
 */
const crearContactoPuntos = async (req, res) => {
    const conx = new ConexionActividades();

    try {
        const secundaria = await conx.mostrarSecundariaModalidad(req.body.idActividad);

        if (secundaria.modalidad.descripcion !== 'puntos')
            return res.status(200).json({msg: "Modalidad de la actividad no valida.",  data: false});

        const progreso = await conx.verContactos(req.body.idUsuario, req.body.idActividad);
        const principal = await conx.verPrincipalSecundaria(req.body.idActividad);
        const solucion = Number(principal.solucion);

        if (!solucion) return res.status(200).json(
            {msg: "El concurso de la actividad introducida no es valido.", data: false}
        );

        if (principal.completada) return res.status(200).json(
            {msg: "El concurso de la actividad indicada ya no está en curso.", data: false}
        );

        let suma = 0;

        for (let i = 0; i < progreso.length; i++) {
            suma += Number(progreso[i]);
        }

        if (suma + req.body.premio > solucion || req.body.premio > solucion) return res.status(200).json(
            {msg: "Premio no valido. Se debe introducir un numero mas bajo", data: false}
        );

        const insertado = await conx.crearContacto({
            id_usuario: req.body.idUsuario,
            id_secundaria: req.body.idActividad,
            premio: req.body.premio,
        });

        if (insertado)
            return res.status(200).json( { msg: `Se ha insertado el contacto correctamente'`, data: insertado });
        else
            return res.status(400).json( { msg: `No se ha insertado el contacto.`, data: insertado });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}

// CREAR CONTACTO GENERICO
/**
 * @author JuanNavarrete
 */
const crearContactoGenerico = async (req, res) => {
    const conx = new ConexionActividades();

    try {
        const secundaria = await conx.mostrarSecundariaModalidad(req.body.idActividad);

        if (secundaria.modalidad.descripcion !== 'genérica')
            return res.status(200).json({msg: "Modalidad de la actividad no valida.",  data: false});

        const contacto = await conx.verContactos(req.body.idUsuario, req.body.idActividad)

        if (contacto.length > 0)
            return res.status(200).json(
                {
                    msg: "Ya se ha insertado ese contacto. Solo se puede insertar uno en este tipo de actividad",
                    data: false
                }
            );

        const insertado = await conx.crearContacto({
            id_usuario: req.body.idUsuario,
            id_secundaria: req.body.idActividad,
            premio: true,
        });

        if (insertado)
            return res.status(200).json( { msg: `Se ha insertado el contacto correctamente'`, data: insertado });
        else
            return res.status(400).json( { msg: `No se ha insertado el contacto.`, data: insertado });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}


// VER ACTIVIDADES SECUNDARIAS

const mostrarActSecundarias = async (req = request, res = response) => {

    const idOperador = req.usuario.id;

    const conx = new ConexionActividades();

    conx.mostrarActSecundarias(idOperador)

        .then(msg => {
            res.status(200).json(msg);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: "Error al recuperar las actividades." })
        });
}

// MOSTRAR ACTIVIDADES SECUNDARIAS QUE NO PERTENECEN A UNA PRIMARIA
const mostrarActSecundariasSinPrincipal = async (req = request, res = response) => {

    const idOperador = req.usuario.id;

    try {
        const conx = new ActividadConexion();
        const actividades = await conx.mostrarActSecundariasSinPrincipal(idOperador);
        res.status(200).json({ message: 'Actividades secundarias sin actividad principal mostradas correctamente!', data: actividades });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Error al mostrar las actividades secundarias sin actividad principal' });
    }
}

// MOSTRAR ACTIVIDADES SECUNDARIAS QUE PERTENECEN A UNA PRIMARIA
const mostrarActSecundariasConPrincipal = async (req = request, res = response) => {

    const idOperador = req.usuario.id;

    try {
        const conx = new ActividadConexion();
        const actividades = await conx.mostrarActSecundariasConPrincipal(idOperador);
        res.status(200).json({ message: 'Actividades secundarias con actividad principal mostradas correctamente!', data: actividades });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Error al mostrar las actividades secundarias con actividad principal' });
    }
}

// MOSTRAR ACTIVIDADES SECUNDARIAS QUE PERTENECEN A UNA PRIMARIA EN PARTICULAR
const mostrarActSecundariasPorIdPrincipal = async (req = request, res = response) => {
    const idPrincipal = req.params.id;
    const idOperador = req.usuario.id;

    try {
        const conx = new ActividadConexion();
        const actividades = await conx.mostrarActSecundariasPorIdPrincipal(idPrincipal, idOperador);
        res.status(200).json({ message: 'Actividades secundarias mostradas correctamente!', data: actividades });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Error al mostrar las actividades secundarias' });
    }
}

// VER UNA ACTIVIDAD SECUNDARIA EN CONCRETO

const mostrarActSecundaria = async (req = request, res = response) => {

    const conx = new ConexionActividades();

    conx.mostrarActSecundaria(req.params.id)
        .then(msg => {
            res.status(200).json(msg);
        })
        .catch(err => {
            res.status(500).json({ msg: "Error al recuperar la actividad." })
        });
}

// TERMINAR ACTIVIDADES SECUNDARIAS

const terminarActSecundaria = async (req = request, res = response) => {

    const conx = new ConexionActividades();

    conx.terminarActSecundaria(req.params.id)
        .then(msg => {
            res.status(200).json(msg);
        })
        .catch(err => {
            res.status(500).json({ msg: "Error al cerrar la actividad." })
        });
}

// DAR DE BAJA UNA ACTIVIDAD SECUNDARIA

const eliminarActSecundaria = async (req = request, res = response) => {

    const conx = new ConexionActividades();

    conx.eliminarActSecundaria(req.params.id)
        .then(msg => {
            res.status(200).json(msg);
        })
        .catch(err => {
            res.status(500).json({ msg: "Error al eliminar la actividad." })
        });
}

// MODIFICAR ACTIVIDAD SECUNDARIA

const modificarActSecundaria = async (req = request, res = response) => {

    const conx = new ConexionActividades();

    conx.modificarActSecundaria(req.params.id, req.body)
        .then(msg => {
            res.status(200).json(msg);
        })
        .catch(err => {
            res.status(500).json({ msg: "Error al modificar la actividad." })
        });
}

// ALTA ACTIVIDAD SECUNDARIA

const altaActSecundaria = async (req = request, res = response) => {

    const conx = new ConexionActividades();

    if (!req.files || !req.files.archivo) {
        return res.status(400).json({ msg: 'No se subió ninguna imagen' });
    }

    try {
        console.log(req.body);
        const resultadoSubida = await subirArchivo(req.files.archivo, undefined, 'concursos');

        if (resultadoSubida && resultadoSubida.secure_url) {
            req.body.url_foto = resultadoSubida.secure_url;
        } else {
            throw new Error('Error al subir el archivo');
        }

        const actividadNueva = conx.altaActSecundaria(req.body);

        if (actividadNueva) {
            res.status(200).json({ message: 'Actividad secundaria creada correctamente', data: actividadNueva });
        } else {
            throw new Error('Error al crear la actividad');
        }
    } catch (error) {
        res.status(500).json({ msg: 'Error al  crear la actividad' });
    }
}

// VER MODALIDADES

/**
 * @author JuanNavarrete
 */
const mostrarModalidades = async (req, res) => {
    const conx = new ConexionActividades();

    try {
        const modalidades = await conx.verModalidades();

        return res.status(200).json({modalidades: modalidades});
    } catch (e) {
        return res.status(400).json({ error: e.message });
    }
}


/**
 * @author JuanNavarrete
 */
const mostrarLetrasRestantes = async (req, res) => {
    const conx = new ConexionActividades();

    try {
        const secundaria = await conx.mostrarSecundariaModalidad(req.body.idActividad);

        if (secundaria.modalidad.descripcion === 'letras')
            return res.status(200).json({msg: "Modalidad de la actividad no valida.",  data: false});

        if (secundaria.completada)
            return res.status(200).json({msg: "La actividad indicada ya no está en curso",  data: false});

        const principal = await conx.verPrincipalSecundaria(req.body.idActividad);

        if (principal.completada) return res.status(200).json({msg: "El concurso de la actividad indicada ya no está en curso", data: false});

        const letras = await conx.verContactos(req.body.idUsuario, req.body.idActividad);
        const solucion = principal.solucion;

        const letrasFaltantes = solucion.split("").filter(letra => !letras.includes(letra));

        return res.status(200).json(letrasFaltantes);
    } catch (e) {
        console.error(e);
    }
}

/**
 * @author JuanNavarrete
 */
const verPuntosRestantes = async (req, res) => {
    const conx = new ConexionActividades();

    try {
        const secundaria = await conx.mostrarSecundariaModalidad(req.body.idActividad);

        if (secundaria.modalidad.descripcion !== 'puntos')
            return res.status(200).json({msg: "Modalidad de la actividad no valida.",  data: false});

        if (secundaria.completada)
            return res.status(200).json({msg: "La actividad indicada ya no está en curso",  data: false});

        const principal = await conx.verPrincipalSecundaria(req.body.idActividad);

        if (principal.completada) return res.status(200).json({msg: "El concurso de la actividad indicada ya no está en curso", data: false});

        const puntuaciones = await conx.verContactos(req.body.idUsuario, req.body.idActividad);
        const solucion = Number(principal.solucion);

        let suma = 0;

        for (let i = 0; i < puntuaciones.length; i++) {
            suma += Number(puntuaciones[i]);
        }

        console.log(solucion, suma)

        return res.status(200).json(
            {msg: "Se ha obtenido correctamente la puntuacion restante.", data: solucion - suma}
        );
    } catch (e) {
        console.error(e);
    }
}

/**
 *
 * @author JuanNavarrete
 */
const mostrarUsuariosSecundaria = async (req, res) => {
    const conx = new ConexionActividades();

    const usuarios = await conx.verUsuariosSecundaria(req.params.id);

    if (!usuarios) return res.status(200).json({ msg: "Ha ocurrido un error al buscar las actividades." });

    return res.status(200).json(usuarios);

}

/**
 * @author JuanNavarrete
 */
const mostrarPrincipalSecundaria = async (req, res) => {
    const conx = new ConexionActividades();

    const principal = await conx.verPrincipalSecundaria(req.body.idSecundaria);

    return res.status(200).json(principal);
}

/**

/**
 * @author JuanNavarrete
 */
const verPrincipalesSecundariasUsuario = async (req, res) => {
    const conx = new ConexionActividades();
    const secundarias = await conx.verSecundariasUsuarioPrincipal(req.params.id);

    if (!secundarias) return res.status(500).json({
        msg: "Ha ocurrido un error al buscar las actividades."
    });

    return res.status(200).json({
        msg: "Se han obtenido correctamente las actividades.",
        data: secundarias
    });
}

/**
 * @author JuanNavarrete
 */
const buscarContacto = async (req, res) => {
    try {
        const conx = new ConexionActividades();
        const contacto = await conx.buscarContactoLetra(req.body.idUsuario, req.body.idActividad, req.body.premio);

        if (!contacto)   return res.status(404).json({
            msg: "No se ha encontrado ningun contacto.",
            data: false
        });

        return res.status(200).json({
            msg: "Se ha obtenido correctamente el contacto.",
            data: contacto
        });
    } catch (e) {
        console.error(e.message)
        return res.status(500).json({
            msg: "Ha ocurrido un error al obtener el contacto.",
            data: contacto
        });
    }
}

/**
 * @author JuanNavarrete
 */
const buscarContactosSecundaria = async (req, res) => {
    try {
        const conx = new ConexionActividades();
        const contactos = await conx.buscarContactosSecundaria(req.params.id);


        if (!contactos) return res.status(404).json({
            msg: "No se ha encontrado ningun contacto.",
            data: false
        });

        return res.status(200).json({
            msg: "Se han obtenido correctamente los contactos.",
            data: contactos
        });
    } catch (e) {
        console.error(e.message);
        return res.status(500).json({
            msg: "Ha ocurrido un error al obtener el contacto.",
            data: contacto
        });
    }
}

/**
 * @author JuanNavarrete
 */
const comprobarSiContactosCompleto = async (req, res) => {
    try {
        const conx = new ConexionActividades();
        const principal = await conx.verPrincipalSecundaria(req.body.idActividad);
        const secundaria = await conx.mostrarSecundariaModalidad(req.body.idActividad);
        const progreso = await conx.verContactos(req.body.idUsuario, req.body.idActividad);

        if (principal.completada) return res.status(200).json(
            {msg: "El concurso de la actividad indicada ya no está en curso", data: false}
        );

        const solucion = principal.solucion;

        if (secundaria.modalidad.descripcion === 'letras' && progreso.join("") === solucion) return res.status(200).json(
            {msg: 'Ya estan todas las letras insertadas.', data: true}
        );
        else if (secundaria.modalidad.descripcion === 'puntos') {
            const solucionNum = Number(solucion);

            let suma = 0;

            for (let i = 0; i < progreso.length; i++) {
                suma += Number(progreso[i]);
            }

            if (suma + req.body.premio > solucion || req.body.premio > solucion) return res.status(200).json(
                {msg: "Premio no valido. Se debe introducir un numero mas bajo.", data: false}
            );
            else if (suma >= solucionNum) return res.status(200).json({
                msg: "El usuario ya ha completado este concurso.",
                data: true
            });
        }

        if (!principal && secundaria.modalidad.descripcion === 'genérica') return res.status(200).json({
            msg: "El contacto ya estaba realizado antes.",
            data: true
        });

        return res.status(200).json({
            msg: "Aun no se ha completado el concurso.",
            data: false
        });
    } catch (e) {
        console.error(e.message)
        return res.status(500).json({
            msg: "Ha ocurrido un error al obtener el contacto.",
            data: e.message
        });
    }
}

module.exports = {
    mostrarActividadesPrincipales,
    mostrarActividadesPrincipalTerminadas,
    mostrarActividadesPrincipalPendientes,
    altaActividadPrincipal,
    modificarActividadPrincipal,
    bajaActividadPrincipal,
    mostrarActividadPrincipalId,
    participantesActividadesPrincipales,
    mostrarActividadesSecundarias,
    participantes,
    mostrarActividadSecundariaPorId,
    mostrarActividadesSecundariasTerminadas,
    mostrarActividadesSecundariasPendientes,
    mostrarActSecundarias,
    mostrarActSecundaria,
    terminarActSecundaria,
    eliminarActSecundaria,
    modificarActSecundaria,
    altaActSecundaria,
    mostrarActSecundariasSinPrincipal,
    mostrarActSecundariasConPrincipal,
    mostrarActSecundariasPorIdPrincipal,
    crearContacto: crearContactoLetra,
    mostrarModalidades,
    mostrarLetrasRestantes,
    mostrarUsuariosSecundaria,
    verSecundariasUsuario: verPrincipalesSecundariasUsuario,
    getActividadesPrincipalesAficionado,
    getActividadesSecundariasAficionado,
    buscarContacto,
    mostrarPrincipalSecundaria,
    buscarContactosSecundaria,
    comprobarSiContactosCompleto,
    crearContactoPuntos,
    verPuntosRestantes,
    crearContactoGenerico
}
