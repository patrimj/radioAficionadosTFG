const path = require('path');
const { v4: uuidv4 } = require('uuid');  //Este paquete nos permitirá crear un archivo con nombre único.
const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

/***********************************************************************
 * Nombre: subirArchivo                                                *
 * Descripción: Función que sube un archivo a Cloudinary               *
 **********************************************************************/

const subirArchivo = async (files, extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'], carpeta = '') => {

    return new Promise(async (resolve, reject) => {
        console.log(files);
        const nombreCortado = files.name.split('.');
        const extension = nombreCortado[nombreCortado.length - 1];

        // Validar la extension
        if (!extensionesValidas.includes(extension)) {
            return reject(`La extensión ${extension} no es permitida - ${extensionesValidas}`);
        }

        const tempFilePath = files.tempFilePath;
        //Cloudinary le da un nombre de seguridad al archivo que podemos obterner en 'secure_url'.

        try {

            if (extension === 'txt') {
                let options = {
                    resource_type: "raw",
                    folder: carpeta
                };

                options.resource_type = "auto";
                options.public_id = archivo.name;

                const uploaded = await cloudinary.uploader.upload(tempFilePath, options);
                const { secure_url, public_id } = uploaded;
                resolve({ secure_url, public_id });
            } else {
                const uploaded = await cloudinary.uploader.upload(tempFilePath, {
                    folder: carpeta,
                });
                const { secure_url, public_id } = uploaded;
                resolve({ secure_url, public_id });
            }
        } catch (error) {
            console.error(error)
            reject(error);
        }
    });

}

module.exports = {
    subirArchivo,
}