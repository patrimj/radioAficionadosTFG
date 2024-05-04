const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { response } = require('express');
const { subirArchivo } = require('../helpers/subir-archivo');
const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);


const cargarArchivo = async (req, res = response) => {

    try {
        console.log(req.files.archivo);

        //Estas comprobaciones se pueden poner en un middleware que se aplique en las rutas.
        if (!req.files || Object.keys(req.files).length === 0) {
            res.status(404).send("No hay archivos para subir");
            return;
        }

        if (!req.files.archivo) {
            res.status(404).send("No hay archivos para subir");
            return;
        }

        console.log("Archivos que vienen en req.files:", req.files);


        //--------------------- Usando el helper ----------------------
        // txt, md
        // const nombre = await subirArchivo( req.files, ['txt','md'], 'textos' );
        const nombre = await subirArchivo(req.files, undefined, 'imgs');
        res.json({ nombre });


    } catch (msg) {
        res.status(400).json({ msg });
    }

}


const borrarImagen = async (req, res = response) => {
    const idborrado = req.params.id;

    console.log(idborrado);
    try {
        const uploaded = await cloudinary.uploader.destroy('imgs/' + idborrado);  //Cuidado que aquí he puesto a pelo la carpeta 'imgs' (la ruta debería estar guardada en la bd y luego con split podemos obtener ruta y archivo).

        res.json(uploaded);

    } catch (error) {
        res.status(400).json({ msg: "Error al borrar la imagen en Cloudinary" });
    }
}

module.exports = {
    cargarArchivo,
    borrarImagen,
}