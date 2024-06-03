const Conexion = require('./ConexionSequelize');
const { Sequelize, Op, where } = require('sequelize');
const models = require('../models/index.js');
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');
const { PDFDocument, StandardFonts, PageSizes, rgb } = require('pdf-lib');
const bcrypt = require("bcrypt");

class PerfilConexion {

    constructor() {
        this.conexion = new Conexion();
    }

    conectar = () => {
        this.conexion.conectar();
    }

    desconectar = () => {
        this.conexion.desconectar();
    }

    /************************************************************************************************************************
    * Nombre consulta: getActividadesUnicoContactoAficionado                                                                *
    * Descripción: Esta consulta obtiene las actividades de un unico contacto de un usuario aficionado de la base de datos  *
    * Parametros: id_usuario                                                                                                *
    * Pantalla: Perfil                                                                                                      *  
    * Rol: Aficionado                                                                                                       *  
    ************************************************************************************************************************/

    getActividadesUnicoContactoAficionado = async (id_usuario) => {
        try {
            this.conectar();

            const actividadesSecundariasAsociadas = await models.PrincipalesSecundarias.findAll({
                attributes: ['id_secundaria'],
            });

            const actividadesSecundarias = await models.ActividadSecundaria.findAll({
                where: {
                    id: { [models.Sequelize.Op.notIn]: actividadesSecundariasAsociadas.map(a => a.id_secundaria) },
                    '$act_secundarias_usuario.id_usuario$': id_usuario,
                    completada: true,
                    deleted_at: null
                },
                attributes: ['id', 'nombre', 'url_foto', 'fecha'],
                include: [
                    {
                        model: models.Usuario_secundarias,
                        as: 'act_secundarias_usuario',
                        attributes: [],
                    },
                    {
                        model: models.Modalidad,
                        as: 'modalidad',
                        attributes: ['descripcion']
                    },
                    {
                        model: models.Modos_trabajo,
                        as: 'modo',
                        attributes: ['nombre']
                    }
                ]
            });

            this.desconectar();
            return actividadesSecundarias;
        } catch (error) {
            this.desconectar();
            console.error('Error al mostrar las actividades de un unico contacto de un usuario', error);
            throw error;
        }
    }

    /************************************************************************************************************************
    * Nombre consulta: getActividadesVariosContactosAficionado                                                              *
    * Descripción: Esta consulta obtiene todas las actividades de varios contactos que pertenece a un concurso              *
    * Parametros: id_usuario                                                                                                *
    * Pantalla: Perfil                                                                                                      *
    * Rol: Aficionado                                                                                                       *
    ************************************************************************************************************************/

    getActividadesVariosContactosAficionado = async (id_usuario) => {
        try {
            this.conectar();

            const actividadesSecundariasAsociadas = await models.PrincipalesSecundarias.findAll({
                attributes: ['id_secundaria'],
            });

            const actividadesSecundarias = await models.ActividadSecundaria.findAll({
                where: {
                    id: { [models.Sequelize.Op.in]: actividadesSecundariasAsociadas.map(a => a.id_secundaria) },
                    '$act_secundarias_usuario.id_usuario$': id_usuario,
                    completada: true,
                    deleted_at: null
                },
                attributes: ['id', 'nombre', 'url_foto', 'fecha'],
                include: [
                    {
                        model: models.Usuario_secundarias,
                        as: 'act_secundarias_usuario',
                        attributes: [],
                    },
                    {
                        model: models.Modalidad,
                        as: 'modalidad',
                    },
                    {
                        model: models.ActividadPrincipal,
                        as: 'act_primarias',
                        attributes: ['nombre'],
                    },
                    {
                        model: models.Modos_trabajo,
                        as: 'modo',
                        attributes: ['nombre']
                    }
                ]
            });

            this.desconectar();
            return actividadesSecundarias;
        } catch (error) {
            this.desconectar();
            console.error('Error al mostrar las actividades de varios contactos de un usuario', error);
            throw error;
        }
    }

    /*********************************************************************************************************************************************
     * Nombre consulta: getTotalActividadesParticipado                                                                                           *
     * Descripción: Esta consulta permite obtener el total de actividades en las que ha participado un usuario concreto de la base de datos      *
     * Parametros: id_usuario                                                                                                                    *
     * Pantalla: Perfil                                                                                                                          *
     * Rol: Aficionado                                                                                                                           *
     * ******************************************************************************************************************************************/

    getTotalActividadesParticipado = async (id_usuario) => {
        try {
            this.conectar();
            const actividades = await models.Usuario_secundarias.count({
                where: { id_usuario: id_usuario }
            });
            return actividades;
        } catch (error) {
            this.desconectar();
            console.error('Error al obtener el total de actividades', error);
            throw error;
        }
    }

    /**********************************************************************************************************************************
    * Nombre consulta: getActividadesPorConcurso                                                                                      *
    * Descripción: Esta consulta obtiene las actividades de varios contactos asociadas a un concurso específico de la base de datos   *
    * Parametros: id_principal                                                                                                        * 
    * Pantalla: Perfil  (modal)                                                                                                       *   
    * Rol: Aficionado                                                                                                                 *
    **********************************************************************************************************************************/

    getActividadesPorConcurso = async (id_principal) => {
        try {
            this.conectar();
    
            const actividadesSecundarias = await models.ActividadSecundaria.findAll({
                attributes: ['id', 'nombre', 'url_foto', 'localizacion', 'fecha', 'frecuencia', 'banda', 'completada'],
                include: [
                    {
                        model: models.ActividadPrincipal,
                        as: 'act_primarias',
                        where: {
                            id: id_principal
                        },
                        through: {
                            attributes: [],
                            where: { deleted_at: null }
                        }
                    },
                    {
                        model: models.Modalidad,
                        as: 'modalidad',
                        attributes: ['descripcion']
                    },
                    {
                        model: models.Modos_trabajo,
                        as: 'modo',
                        attributes: ['nombre']
                    }
                ]
            });
    
            this.desconectar();
            return actividadesSecundarias;
        } catch (error) {
            this.desconectar();
            console.error('Error al mostrar las actividades de varios contactos de un concurso', error);
            throw error;
        }
    }

    /************************************************************************************************************************************
    * Nombre consulta: getConcursosAficionado                                                                                           *
    * Descripción: Esta consulta obtiene los concursos de un usuario aficionado de la base de datos                                     *  
    * Parametros: id_usuario                                                                                                            *  
    * Pantalla: Perfil                                                                                                                  *
    * Rol: Aficionado                                                                                                                   *
    ************************************************************************************************************************************/

    getConcursosAficionado = async (id_usuario) => {
        try {
            this.conectar();
            const concursos = await models.ActividadPrincipal.findAll({
                where: {
                    completada: true,
                    deleted_at: null
                },
                attributes: ['nombre', 'descripcion', 'url_foto', 'completada', 'solucion'],
                include: [
                    {
                        model: models.Usuario,
                        as: 'act_principales_usuario',
                        where: { id: id_usuario },
                        through: {
                            model: models.usuario_principal,
                            attributes: [],
                        },
                        attributes: ['id', 'nombre', 'email', 'id_examen'],
                    }

                ]
            });
            this.desconectar();
            return concursos;
        } catch (error) {
            this.desconectar();
            console.error('Error al mostrar los concursos del aficionado', error);
            throw error;
        }
    }

    /*******************************************************************************************************************************************
     * Nombre consulta: getTotalConcursosParticipado                                                                                           *
     * Descripción: Esta consulta permite obtener el total de concursos en las que ha participado un usuario concreto de la base de datos      *
     * Parametros: id_usuario                                                                                                                  *
     * Pantalla: Perfil                                                                                                                        *
     * Rol: Aficionado                                                                                                                         *
     * ****************************************************************************************************************************************/

    getTotalConcursosParticipado = async (id_usuario) => {
        try {
            this.conectar();
            const actividades = await models.usuario_principal.count({
                where: { id_usuario: id_usuario }
            });
            return actividades;
        } catch (error) {
            this.desconectar();
            console.error('Error al obtener el total de actividades', error);
            throw error;
        }
    }

    /************************************************************************************************************************************
    * Nombre consulta: cambiarPassword                                                                                                  *
    * Descripción: Esta consulta permite cambiar la contraseña de un usuario en la base de datos                                        *
    * Parametros: email, password                                                                                                       *
    * Pantalla: Perfil                                                                                                                  *
    * Rol: aficionado, admin, operador                                                                                                  *
    ************************************************************************************************************************************/

    cambiarPassword = async (email, nuevaPassword) => {
        try {
            this.conectar();

            const usuario = await models.Usuario.findOne({ where: { email: email } });

            if (!usuario) {
                this.desconectar();
                console.error('Error al cambiar la contraseña');
                throw new Error('No se encontró ningún usuario');
            } else {
                const contrasenaHasheada = await bcrypt.hash(nuevaPassword, 10);
                await usuario.update(
                    { password: contrasenaHasheada },
                    { where: { email: email } }
                );
                this.desconectar();
                return usuario;
            }
        } catch (error) {
            this.desconectar();
            console.error('Error al cambiar la contraseña', error);
            throw error;
        }
    }

    /************************************************************************************************************************************
     * Nombre consulta: mostrarPerfil                                                                                                   *
     * Descripción: Esta consulta permite mostrar el perfil de un usuario en la base de datos                                           *
     * Parametros: id_usuario                                                                                                           *
     * Pantalla: Perfil                                                                                                                 *
     * Rol: aficionado, admin, operador                                                                                                 *
     ***********************************************************************************************************************************/

    mostrarPerfil = async (id_usuario) => {
        try {
            this.conectar();

            const usuario = await models.Usuario.findOne({ 
                attributes: { exclude: ['created_at', 'updated_at', 'deleted_at'] },
                where: { id: id_usuario } });

            this.desconectar();

            if (!usuario) {
                console.error('Error al mostrar el perfil');
                throw new Error('No se encontró ningún usuario');
            } else {
                return usuario;
            }
        } catch (error) {
            this.desconectar();
            console.error('Error al mostrar el perfil', error);
            throw error;
        }
    }

    /************************************************************************************************************************************
    * Nombre consulta: modificarPerfil                                                                                                  *  
    * Descripción: Esta consulta permite modificar el perfil de un usuario en la base de datos                                          *
    * Parametros: id_usuario, email, nombre, apellido_uno, apellido_dos, url_foto, id_examen, id_rol                                    *
    * Pantalla: Perfil                                                                                                                  *
    * Rol: aficionado, admin, operador                                                                                                  *
    ************************************************************************************************************************************/

    modificarPerfil = async (id_usuario, body) => {
        try {
            this.conectar();

            const usuario = await models.Usuario.findByPk(id_usuario);

            if (!usuario) {
                this.desconectar();
                console.error('Error al modificar el perfil');
                throw new Error('No se encontró ningún usuario');
            } else {
                const { nombre, apellido_uno, apellido_dos, url_foto, id_examen } = body; //no permito que modifique el email ni la contraseña
                await usuario.update({ nombre, apellido_uno, apellido_dos, url_foto, id_examen });
                this.desconectar();
                return usuario;
            }
        } catch (error) {
            this.desconectar();
            console.error('Error al modificar el perfil', error);
            throw error;
        }
    }

    /**************************************************************************************************************************************
     * Nombre consulta: generarDiploma                                                                                                    *
     * Descripción: Esta función se encarga de generar un diploma. Crea un nuevo documento PDF con la librería 'pdf-lib' y lo guarda en   *
     * la carpeta 'temp' con el nombre del 'identificador'.pdf.                                                                           *
     * Pantalla: Perfil                                                                                                                   *
     * Rol: aficionado                                                                                                                    *
     * ***********************************************************************************************************************************/

    generarDiploma = async (identificador, actividad, url) => {
        const pdfDoc = await PDFDocument.create();

        // Definimos las dimensiones de un A4 en puntos (no cm)
        const anchoPagina = 841.89;
        const altoPagina = 595.28;
        const pagina = pdfDoc.addPage([anchoPagina, altoPagina]);

        // Llamamos a la imagen y la redimensionamos
        const fotoImageBytes = await fetch(url).then(res => res.arrayBuffer())
        const fotoImage = await pdfDoc.embedJpg(fotoImageBytes); // solo se permite imagenes en jpeg
        const dimImage = this.ajustarDimensionesImagen(fotoImage, anchoPagina, altoPagina);


        // Dibujamos la fotografía de la actividad
        pagina.drawImage(fotoImage, {
            x: 0,
            y: (pagina.getHeight() - dimImage[1]) / 2,
            width: dimImage[0],
            height: dimImage[1],
            opacity: 0.8
        })

        // Seguimos el mismo proceso para la plantilla del diploma
        const fondoImagePath = path.join(__dirname, '../assets/fondo-certificado.png');
        const fondoImageBytes = fs.readFileSync(fondoImagePath);
        const fondoImage = await pdfDoc.embedPng(fondoImageBytes);
        const fondoWidth = pagina.getWidth();
        const fondoHeight = (fondoImage.height * fondoWidth) / fondoImage.width;

        pagina.drawImage(fondoImage, {
            x: 0,
            y: (pagina.getHeight() - fondoHeight) / 2,
            width: fondoWidth,
            height: fondoHeight,
        })

        // Definimos la fuente y su tamaño
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
        let fontSize = 60;

        // Definimos los textos y su posición en el pdf
        const nombreText = ` ${identificador}`;
        const nombreTextWidth = font.widthOfTextAtSize(nombreText, fontSize);

        pagina.drawText(nombreText, {
            x: (pagina.getWidth() - nombreTextWidth) / 2,
            y: 360,
            size: fontSize,
            font: font,
            color: rgb(0, 0, 0),
        });

        fontSize = 30;
        const actividadText = ` ${actividad}`;
        const actividadTextWidth = font.widthOfTextAtSize(actividadText, fontSize);

        pagina.drawText(actividadText, {
            x: (pagina.getWidth() - actividadTextWidth) / 2,
            y: 265,
            size: fontSize,
            font: font,
            color: rgb(0, 0, 0),
        });

        const pdfBytes = await pdfDoc.save();

        const dir = './temp';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        const pathDiploma = `${dir}/${identificador}.pdf`;
        fs.writeFileSync(pathDiploma, pdfBytes);

        return pathDiploma;
    }

    /************************************************************************************************************************************
     * Nombre consulta: enviarDiplomaPorCorreo                                                                                          *
     * Descripción: Esta función se encarga de enviar el diploma por correo electrónico.                                                *
     * Pantalla: Perfil                                                                                                                 *
     * Rol: aficionado                                                                                                                  *
     * *********************************************************************************************************************************/

    enviarDiplomaPorCorreo = async (email, pathDiploma) => {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: process.env.MAIL_USER,
                clientId: process.env.MAIL_CLIENT_ID,
                clientSecret: process.env.MAIL_CLIENT_SECRET,
                refreshToken: process.env.MAIL_REFRESH_TOKEN,
                accessToken: process.env.MAIL_ACCESS_TOKEN
            }
        });

        let mailOptions = {
            from: process.env.MAIL_USER,
            to: email,
            subject: 'Ya tienes tu diploma disponible!',
            text: 'Gracias por participar y contar con nosotros.',
            attachments: [
                {
                    path: pathDiploma
                }
            ]
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email enviado: ' + info.response);
            }
        });
    }

    /************************************************************************************************************************************
     * Nombre consulta: generarYEnviarDiploma                                                                                           *
     * Descripción: Esta función se encarga de generar un diploma y enviarlo por correo electrónico.                                    *
     * Pantalla: Perfil                                                                                                                 *
     * Rol: aficionado                                                                                                                  *
     * *********************************************************************************************************************************/

    generarYEnviarDiploma = async (identificador, actividad, url, email) => {
        try {
            const pathDiploma = await this.generarDiploma(identificador, actividad, url);
            await this.enviarDiplomaPorCorreo(email, pathDiploma);
            console.log('Diploma generado y enviado por correo electrónico');
        } catch (error) {
            console.error('Error al generar y enviar el diploma', error);
            throw error;
        }
    }

    /************************************************************************************************************************************
     * Nombre consulta: ajustarDimensionesImagen                                                                                        *
     * Descripción: Esta función se encarga de ajustar las dimensiones de la imagen al pdf.                                             *
     * Pantalla: Perfil                                                                                                                 *
     * Rol: aficionado                                                                                                                  *
     * *********************************************************************************************************************************/

    ajustarDimensionesImagen(imagen, anchoPdf, altoPdf) {

        // Comprobamos la proporción de la imagen y la página
        const proporcionImagen = imagen.width / imagen.height;
        const porporcionPdf = anchoPdf / altoPdf;

        // Ajustamos las dimensaiones de la imagen al pdf
        // según si es "más vertical" o "más horizontal"

        let nuevoAncho, nuevoAlto;
        if (proporcionImagen > porporcionPdf) {
            nuevoAncho = anchoPdf;
            nuevoAlto = anchoPdf / proporcionImagen;
        } else {
            nuevoAncho = altoPdf * proporcionImagen;
            nuevoAlto = altoPdf;
        }

        return [nuevoAncho, nuevoAlto];
    }
}

module.exports = PerfilConexion;