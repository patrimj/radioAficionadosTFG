const models = require('../models/index.js'); 
const {Op} = require("sequelize");

const esAdmin = async (req, res, next) => {
    try {
        const usuario = req.usuario;

        if (!usuario) {
            return res.status(404).json({ 'msg': 'Usuario no encontrado.' });
        }

        const esAdmin = usuario.roles.find(
            rol => rol.nombre === 'admin'
        );

        if (!esAdmin) {
            return res.status(403).json({ 'msg': 'Acceso denegado. No tienes permisos de administrador.' });
        }

        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ 'msg': 'Error al verificar el rol del usuario.', 'error': error.message });
    }
};

const esOperador = async (req, res, next) => {
    try {
        const usuario = req.usuario;

        if (!usuario) {
            return res.status(401).json({ 'msg': 'Token no valido.' });
        }

        const esOperador = usuario.roles.find(
            rol => rol.nombre === 'operador'
        );

        if (!esOperador) {
            return res.status(403).json({ 'msg': 'Acceso denegado. No tienes permisos de operador.' });
        }

        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ 'msg': 'Error al verificar el rol del usuario.', 'error': error.message });
    }
};

module.exports = {
    esAdmin,
    esOperador
};