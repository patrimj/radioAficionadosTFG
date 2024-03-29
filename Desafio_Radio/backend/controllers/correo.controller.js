const nodemailer = require('nodemailer');

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

/**
 * @author JuanNavarrete
 */
const enviarCorreo = async (req, res) => {
    const mailOptions = {
        from: process.env.MAIL_USER,
        to: req.body.email,
        subject: 'Recuperación de contraseña de radioaficionado',
        text: "Recuperación de contraseña",
        html: req.cuerpoCorreo
    };

    await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.error('Error al enviar el correo electrónico:', error);
            return false
        }
    });

    return true

}

module.exports = {
    enviarCorreo
};