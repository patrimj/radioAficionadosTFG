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
            where: { completada: false },
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


const crearContactoLetra = async (req, res) => {
    const conx = new ConexionActividades();

    try {
        const contacto = await conx.buscarContactoLetra(
            req.body.idUsuario,
            req.body.idActividad,
            req.body.premio
        );

        if (contacto) return res.status(200).json(
            { msg: "El contacto ya existe", data: false }
        );

        const progreso = await conx.verContactos(req.body.idUsuario, req.body.idActividad);
        const principal = await conx.verPrincipalSecundaria(req.body.idActividad);

        if (principal.completada) return res.status(200).json(
            { msg: "El concurso de la actividad indicada ya no está en curso", data: false }
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
            return res.status(200).json({ msg: `Se ha insertado el contacto correctamente'`, data: insertado });
        else
            return res.status(400).json({ msg: `No se ha insertado el contacto.`, data: insertado });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}

const crearContactoPuntos = async (req, res) => {
    const conx = new ConexionActividades();

    try {
        const secundaria = await conx.mostrarSecundariaModalidad(req.body.idActividad);

        if (secundaria.modalidad.descripcion !== 'puntos')
            return res.status(200).json({ msg: "Modalidad de la actividad no valida.", data: false });

        const progreso = await conx.verContactos(req.body.idUsuario, req.body.idActividad);
        const principal = await conx.verPrincipalSecundaria(req.body.idActividad);
        const solucion = Number(principal.solucion);

        if (!solucion) return res.status(200).json(
            { msg: "El concurso de la actividad introducida no es valido.", data: false }
        );

        if (principal.completada) return res.status(200).json(
            { msg: "El concurso de la actividad indicada ya no está en curso.", data: false }
        );

        let suma = 0;

        for (let i = 0; i < progreso.length; i++) {
            suma += Number(progreso[i]);
        }

        if (suma + req.body.premio > solucion || req.body.premio > solucion) return res.status(200).json(
            { msg: "Premio no valido. Se debe introducir un numero mas bajo", data: false }
        );

        const insertado = await conx.crearContacto({
            id_usuario: req.body.idUsuario,
            id_secundaria: req.body.idActividad,
            premio: req.body.premio,
        });

        if (insertado)
            return res.status(200).json({ msg: `Se ha insertado el contacto correctamente'`, data: insertado });
        else
            return res.status(400).json({ msg: `No se ha insertado el contacto.`, data: insertado });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}

const crearContactoGenerico = async (req, res) => {
    const conx = new ConexionActividades();

    try {
        const secundaria = await conx.mostrarSecundariaModalidad(req.body.idActividad);

        if (secundaria.modalidad.descripcion !== 'genérica')
            return res.status(200).json({ msg: "Modalidad de la actividad no valida.", data: false });

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
            return res.status(200).json({ msg: `Se ha insertado el contacto correctamente'`, data: insertado });
        else
            return res.status(400).json({ msg: `No se ha insertado el contacto.`, data: insertado });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}

const mostrarLetrasRestantes = async (req, res) => {
    const conx = new ConexionActividades();

    try {
        const secundaria = await conx.mostrarSecundariaModalidad(req.body.idActividad);

        if (secundaria.modalidad.descripcion === 'letras')
            return res.status(200).json({ msg: "Modalidad de la actividad no valida.", data: false });

        if (secundaria.completada)
            return res.status(200).json({ msg: "La actividad indicada ya no está en curso", data: false });

        const principal = await conx.verPrincipalSecundaria(req.body.idActividad);

        if (principal.completada) return res.status(200).json({ msg: "El concurso de la actividad indicada ya no está en curso", data: false });

        const letras = await conx.verContactos(req.body.idUsuario, req.body.idActividad);
        const solucion = principal.solucion;

        const letrasFaltantes = solucion.split("").filter(letra => !letras.includes(letra));

        return res.status(200).json(letrasFaltantes);
    } catch (e) {
        console.error(e);
    }
}

const verPuntosRestantes = async (req, res) => {
    const conx = new ConexionActividades();

    try {
        const secundaria = await conx.mostrarSecundariaModalidad(req.body.idActividad);

        if (secundaria.modalidad.descripcion !== 'puntos')
            return res.status(200).json({ msg: "Modalidad de la actividad no valida.", data: false });

        if (secundaria.completada)
            return res.status(200).json({ msg: "La actividad indicada ya no está en curso", data: false });

        const principal = await conx.verPrincipalSecundaria(req.body.idActividad);

        if (principal.completada) return res.status(200).json({ msg: "El concurso de la actividad indicada ya no está en curso", data: false });

        const puntuaciones = await conx.verContactos(req.body.idUsuario, req.body.idActividad);
        const solucion = Number(principal.solucion);

        let suma = 0;

        for (let i = 0; i < puntuaciones.length; i++) {
            suma += Number(puntuaciones[i]);
        }

        console.log(solucion, suma)

        return res.status(200).json(
            { msg: "Se ha obtenido correctamente la puntuacion restante.", data: solucion - suma }
        );
    } catch (e) {
        console.error(e);
    }
}

const comprobarSiContactosCompleto = async (req, res) => {
    try {
        const conx = new ConexionActividades();
        const principal = await conx.verPrincipalSecundaria(req.body.idActividad);
        const secundaria = await conx.mostrarSecundariaModalidad(req.body.idActividad);
        const progreso = await conx.verContactos(req.body.idUsuario, req.body.idActividad);

        if (principal.completada) return res.status(200).json(
            { msg: "El concurso de la actividad indicada ya no está en curso", data: false }
        );

        const solucion = principal.solucion;

        if (secundaria.modalidad.descripcion === 'letras' && progreso.join("") === solucion) return res.status(200).json(
            { msg: 'Ya estan todas las letras insertadas.', data: true }
        );
        else if (secundaria.modalidad.descripcion === 'puntos') {
            const solucionNum = Number(solucion);

            let suma = 0;

            for (let i = 0; i < progreso.length; i++) {
                suma += Number(progreso[i]);
            }

            if (suma + req.body.premio > solucion || req.body.premio > solucion) return res.status(200).json(
                { msg: "Premio no valido. Se debe introducir un numero mas bajo.", data: false }
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
