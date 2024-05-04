const fs = require("fs");
const parse = require('fast-csv').parse;
const path = require('path');
const { response, request } = require('express');
const ConexionUsuario = require('../database/usuarios.conexion');
const ConexionContacto = require('../database/contactos.conexion');
const contactoConexion = new ConexionContacto();
const { subirCSV } = require('../helpers/subir-archivo');
const { fakerES } = require('@faker-js/faker');

/************************************************************************************************************************************
* Nombre consulta: validarCSV                                                                                                       *
* Descripción: Esta función se encarga de validar si el archivo subido en la solicitud es un archivo CSV. Si el archivo es válido,  *
* se llama a la función 'subirCSV' para subir el archivo                                                                              * 
* Pantalla: Registro de contactos                                                                                                     *
* Rol: operador                                                                                                                       * 
************************************************************************************************************************************/

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

/************************************************************************************************************************************
 * Nombre consulta: procesarCSV                                                                                                     *
 * Descripción: Esta función se encarga de procesar el archivo CSV subido en la solicitud. Se recorre el archivo y se insertan los  *
 * contactos en la base de datos.                                                                                                   *
 * Pantalla: Registro de contactos                                                                                                  *
 * Rol: operador                                                                                                                    *
 * *********************************************************************************************************************************/

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

/************************************************************************************************************************************
 * Nombre consulta: insertarContactos                                                                                               *
 * Descripción: Esta función se encarga de insertar los contactos del archivo CSV en la base de datos.                              *
 * Pantalla: Registro de contactos                                                                                                  *
 * Rol: operador                                                                                                                    *
 * *********************************************************************************************************************************/

const insertarContactos = async (idActividad, data, res) => {

    let mensajes = [];

    for (const line of data) {

        let indicativo = line.indicativo;
        let idUsuario = await recibirIdUsuario(indicativo);

        if (idUsuario === 0) {

            mensajes.push('Error al crear el registro de ' + indicativo);

        } else {

            const contacto = {
                idUsuario: idUsuario,
                idActividad: idActividad,
                premio: line.premio || ''
            };

            try {

                await contactoConexion.registrarContacto(contacto);

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

/************************************************************************************************************************************
 * Nombre consulta: recibirIdUsuario                                                                                                *
 * Descripción: Esta función se encarga de recibir el id del usuario a partir de su indicativo.                                     *
 * Pantalla: Registro de contactos                                                                                                  *
 * Rol: operador                                                                                                                    *
 * *********************************************************************************************************************************/

const recibirIdUsuario = async (indicativo) => {
    const conx = new ConexionUsuario();

    const id = await conx.mostrarIdUsuarioPorIndicativo(indicativo);

    return id;
}

module.exports = {
    validarCSV,
    procesarCSV,
};