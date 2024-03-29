/**
 * @author ElenaRgC
 */

const Conexion = require('./ConexionSequelize');
const { PDFDocument, StandardFonts, PageSizes, rgb } = require('pdf-lib');
const { Sequelize, Op } = require('sequelize');
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');

class DiplomaConexion {
    constructor() {
        this.conexion = new Conexion();
    }

    conectar = () => {
        this.conexion.conectar();
    }

    desconectar = () => {
        this.conexion.desconectar();
    }

    generarDiploma = async (identificador, actividad, url) => {
        const pdfDoc = await PDFDocument.create();


        // Definimos las dimensiones de un A4 en puntos (no cm)
        const anchoPagina = 841.89;
        const altoPagina = 595.28;
        const pagina = pdfDoc.addPage([anchoPagina, altoPagina]);

        // Llamamos a la imagen y la redimensionamos
        const fotoImageBytes = await fetch(url).then(res => res.arrayBuffer())
        const fotoImage = await pdfDoc.embedJpg(fotoImageBytes);
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

    /**
    * @author Patricia
    */
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

    /**
    * @author Patricia
    */
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

    /**
    * @author ElenaRgC
    */
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

module.exports = DiplomaConexion;