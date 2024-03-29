const fs = require("fs");
const parse = require('fast-csv').parse;
const path = require('path');
const { response, request } = require('express');
const ConexionActividades = require('../database/actividades.conexion');
const ConexionUsuario = require('../database/usuarios.conexion');
const actividadConexion = new ConexionActividades();
const { subirCSV } = require('../helpers/subir-archivo');
const { fakerES } = require('@faker-js/faker');

/**
 * @author ElenaRgC
 */
const validarCSV = async (req, res, next) => {

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No se adjuntó ningún archivo');
    }

    if (!req.files.archivo) {
        res.status(404).send('El archivo no tiene el identificador correcto');
        return;
    }

    let archivo = req.files.archivo;

    if (!archivo.name.endsWith('.csv')) {
        return res.status(400).send('El archivo cargado no es un CSV');
    }

    subirCSV(archivo);

    next();

}

/**
 * @author ElenaRgC
 */
const procesarCSV = async (req, res) => {

    const idActividad = req.body.idActividad;

    const tempPath = path.join(__dirname, '../temp/fichero.csv');

    if (!fs.existsSync(tempPath)) {
        return res.status(404).send('El archivo CSV no se encuentra');
    }

    let csvData = [];

    const stream = fs.createReadStream(tempPath)
        .pipe(parse({ headers: true }))
        .on('error', error => console.error(error))
        .on('data', row => {
            csvData.push(row);
        })
        .on('end', () => {
            insertarContactos(idActividad, csvData, res);
        });
}

/**
 * @author ElenaRgC
 */
const insertarContactos = async (idActividad, data, res) => {

    let mensajes = [];

    for (const line of data) {

        let indicativo = line.indicativo;
        let idUsuario = await recibirIdUsuario(indicativo);

        if (idUsuario === null) {
            idUsuario = await altaUsuarioTemporal(indicativo);
        }

        if (idUsuario === 0) {

            mensajes.push('Error al crear el registro de ' + indicativo);

        } else {

            const contacto = {
                idUsuario: idUsuario,
                idActividad: idActividad,
                premio: line.premio || ''
            };

            try {

                /*if (contacto.premio === '') {
                    await actividadConexion.crearContactoGenerico(contacto);
                } else if (isNaN(parseInt(contacto.premio))) {
                    await actividadConexion.crearContactoLetra(contacto);
                } else {
                    await actividadConexion.crearContactoPuntos(contacto);
                }*/

                await actividadConexion.crearContacto(contacto);

                if (contacto.premio === '') {
                    mensajes.push('Insertado correctamente el contacto de ' + indicativo);
                } else {
                    mensajes.push('Insertado correctamente el contacto de ' + indicativo + ' con el valor ' + line.premio);
                }

            } catch (error) {
                mensajes.push('Error al insertar el contacto de ' + indicativo);
            }
        }
    }
    console.table(mensajes);

    return res.status(200).json(mensajes);
}

/**
 * @author ElenaRgC
 */
const recibirIdUsuario = async (indicativo) => {
    const conx = new ConexionUsuario();

    const id = await conx.mostrarIdUsuarioPorIndicativo(indicativo);

    return id;
}

/**
 * @author ElenaRgC
 */
const altaUsuarioTemporal = async (indicativo) => {
    
    const usuarioTemporal = {
        nombre: '',
        email: fakerES.internet.password(),
        apellido_uno: '',
        apellido_dos: '',
        password: fakerES.internet.password(),
        url_foto: '',
        id_examen: indicativo,
    }
    
    const conx = new ConexionUsuario();

    const usuario = conx.altaUsuario(usuarioTemporal);
    
    if (usuario.id == 0) {
        return usuario;
    } else {
        return usuario.id;
    }
}

module.exports = {
    validarCSV,
    procesarCSV,
};