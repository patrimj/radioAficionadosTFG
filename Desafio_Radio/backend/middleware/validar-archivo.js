const { response } = require("express")

/***********************************************************************
 * Nombre Middleware: validarArchivoSubir                              *
 * Descripción: Middleware que valida si se subió un archivo           *
 **********************************************************************/

const validarArchivoSubir = (req, res = response, next ) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo ) {
        return res.status(400).json({
            msg: 'No hay archivos que subir - validarArchivoSubir'
        });
    }

    next();

}


module.exports = {
    validarArchivoSubir
}
