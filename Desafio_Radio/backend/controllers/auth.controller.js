const {generarJWT} = require("../helpers/generate_jwt");
const ConexionUsuario = require("../database/usuarios.conexion");

/**
 * @author JuanNavarrete
 */
const login = async (req, res) => {
    const conx = new ConexionUsuario();

    try {
        const usuario = await conx.login(req.body.email, req.body.password);

        if (!usuario) {
            return res.status(401).json({
                error: 'No se encontró ningún usuario con ese correo electrónico y contraseña.'
            });
        }

        const token = generarJWT(usuario);
        const datos = {
            token: token,
            usuario: usuario
        };

        return res.status(200).json(datos);
    } catch (e) {
        return res.status(400).json({error: e.message});
    }
}

module.exports = {
    login
};