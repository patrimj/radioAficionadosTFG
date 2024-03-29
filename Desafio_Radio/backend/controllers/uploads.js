const path = require('path');
const fs   = require('fs');
const { v4: uuidv4 } = require('uuid');
const { response } = require('express');
const { subirArchivo } = require('../helpers/subir-archivo');
const cloudinary = require('cloudinary').v2
cloudinary.config( process.env.CLOUDINARY_URL);


const cargarArchivo = async(req, res = response) => {

    try {
        console.log(req.files.archivo);

        //Estas comprobaciones se pueden poner en un middleware que se aplique en las rutas.
        if(!req.files || Object.keys(req.files).length === 0){
            res.status(404).send("No hay archivos para subir");
            return;
        }

        if(!req.files.archivo){
            res.status(404).send("No hay archivos para subir");
            return;
        }

        console.log("Archivos que vienen en req.files:",req.files);


        //--------------------- Usando el helper ----------------------
        // txt, md
        // const nombre = await subirArchivo( req.files, ['txt','md'], 'textos' );
        const nombre = await subirArchivo( req.files, undefined, 'imgs' );
        res.json({ nombre });


    } catch (msg) {
        res.status(400).json({ msg });
    }

}


const borrarImagen = async(req, res = response ) => {
    const  idborrado = req.params.id;

    console.log(idborrado);
    try {
        const uploaded = await cloudinary.uploader.destroy('imgs/' + idborrado);  //Cuidado que aquí he puesto a pelo la carpeta 'imgs' (la ruta debería estar guardada en la bd y luego con split podemos obtener ruta y archivo).

        res.json(uploaded);

    } catch (error) {
        res.status(400).json({ msg : "Error al borrar la imagen en Cloudinary" });
    }
}


const actualizarImagen = async(req, res = response ) => {

    //Aquí guardaríamos el nombre del archivo en la base de datos (Mongo o MySQL).
    

    // Limpiar imágenes previas: con este código podemos comprobar el nombre del archivo previo y borrarlo.
    // if ( modelo.img ) { //El campo img del modelo sería un campo String con el nombre del archivo.
    //     // Hay que borrar la imagen del servidor
    //     const pathImagen = path.join( __dirname, '../uploads', coleccion, modelo.img );
    //     if ( fs.existsSync( pathImagen ) ) {
    //         fs.unlinkSync( pathImagen );
    //     }
    // }


    // const nombre = await subirArchivo( req.files, undefined, coleccion );
    // res.json( modelo );
    res.status(200).json({ msg  : "Actual"});
}

const obternerImagenes = async(req, res = response ) => {
    //Para el listado:
    const cloudinary = require('cloudinary').v2;

    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
    cloudinary.api.resources(
        // { //Para especificar una carpeta concreta...
        //     prefix : 'imgs/',
        //     type : 'upload'
        // },
        (error, result) => {
        if (error) {
            return res.status(400).json({msg: error});
        } else {
            return res.status(200).json({msg: result});
        
         }
    })
}




module.exports = {
    cargarArchivo,
    actualizarImagen,
    borrarImagen,
    obternerImagenes
}