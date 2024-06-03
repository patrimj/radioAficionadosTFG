const nodemailer = require('nodemailer');

// Configuración del servicio de correo

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
        clientId: process.env.MAIL_CLIENT_ID,
        clientSecret: process.env.MAIL_CLIENT_SECRET,
        refreshToken: process.env.MAIL_REFRESH_TOKEN,
        accessToken: process.env.MAIL_ACCESS_TOKEN
    }
});

/**********************************************************************************************************************************
 * Nombre consulta: enviarCorreo                                                                                                  *
 * Descripción: Esta función se encarga de enviar un correo electrónico a un usuario para la recuperación de su contraseña        *
 * Parametros: email                                                                                                              *
 * Pantalla: Recuperar contraseña                                                                                                 *
 * Rol: aficionado, admin, operador                                                                                               *
 *********************************************************************************************************************************/

const enviarCorreo = async (req, res) => {
    const mailOptions = {
        from: process.env.MAIL_USER,
        to: req.body.email,
        subject: 'Recuperación de contraseña de radioaficionado',
        text: "Recuperación de contraseña",
        html: req.cuerpoCorreo
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Correo enviado con éxito a:', req.body.email);
        return true;
    } catch (error) {
        console.error('Error al enviar el correo electrónico:', error);
        return false;
    }
};

module.exports = {
    enviarCorreo
};