const Conexion = require('./ConexionSequelize');
const { Sequelize, Op } = require('sequelize');
const models = require('../models/index.js');
const bcrypt = require("bcrypt");

class InicioConexion {

    constructor() {
        this.conexion = new Conexion();
    }

    conectar = () => {
        this.conexion.conectar();
    }

    desconectar = () => {
        this.conexion.desconectar();
    }

    /************************************************************************************************************************************
     * Nombre consulta: mostrarNoticias                                                                                                 *
     * Descripción: Esta consulta permite mostrar las noticias de la base de datos                                                      *
     * Parametros: ninguno                                                                                                              *
     * Pantalla: Inicio                                                                                                                 *
     * Rol: aficionado, admin, operador                                                                                                 *
     ***********************************************************************************************************************************/

    mostrarNoticias = async () => {
        let resultados = [];
        this.conectar();
        resultados = await models.Noticias.findAll({
            order: [
                ['fecha', 'ASC']
            ]
        });
        this.desconectar();
        return resultados;
    }

    /************************************************************************************************************************************
     * Nombre consulta: eliminarNoticia                                                                                                 *
     * Descripción: Esta consulta permite eliminar una noticia de la base de datos                                                      *
     * Parametros: id                                                                                                                   *
     * Pantalla: Inicio                                                                                                                 *
     * Rol: admin                                                                                                                       *
     ***********************************************************************************************************************************/

    eliminarNoticia = async (id) => {
        try {
            this.conectar();
            let resultado = await models.Noticias.findByPk(id);
            if (!resultado) {
                this.desconectar();
                throw error;
            }
            await resultado.destroy();
            this.desconectar();
            return resultado;
        } catch (error) {
            this.desconectar();
            console.error('Error al eliminar una noticia', error);
            throw error;
        }
    }

    /************************************************************************************************************************************
     * Nombre consulta: modificarNoticia                                                                                                *
     * Descripción: Esta consulta permite modificar una noticia de la base de datos                                                     *
     * Parametros: id, nombre, descripción, fecha                                                                                       *
     * Pantalla: Inicio                                                                                                                 *
     * Rol: admin                                                                                                                       *
     ***********************************************************************************************************************************/

    modificarNoticia = async (id, body) => {
        try {
            this.conectar();
            let resultado = await models.Noticias.findByPk(id);
            if (!resultado) {
                this.desconectar();
                throw error;
            }
            await resultado.update(body);
            this.desconectar();
            return resultado;
        } catch (error) {
            this.desconectar();
            console.error('Error al modificar una noticia', error);
            throw error;
        }
    }

    /************************************************************************************************************************************
     * Nombre consulta: crearNoticia                                                                                                    *
     * Descripción: Esta consulta permite crear una noticia en la base de datos                                                         *
     * Parametros: nombre, descripción, fecha                                                                                           *
     * Pantalla: Inicio                                                                                                                 *
     * Rol: admin                                                                                                                       *
     ***********************************************************************************************************************************/

    crearNoticia = async (body) => {
        try {
            this.conectar();
            let resultado = await models.Noticias.create(body);
            this.desconectar();
            return resultado;
        } catch (error) {
            this.desconectar();
            console.error('Error al crear la noticia:', error);
            throw error;
        }
    }

    /************************************************************************************************************************************
     * Nombre consulta: mostrarAdmin                                                                                                    *
     * Descripción: Esta consulta permite mostrar los administradores de la base de datos                                               *
     * Parametros: ninguno                                                                                                              *
     * Pantalla: Inicio                                                                                                                 *
     * Rol: admin, operador, admin                                                                                                      *   
     ***********************************************************************************************************************************/

    mostrarAdmin = async () => {
        try {
            this.conectar();
            const usuarios = await models.Usuario.findAll({
                include: [{
                    model: models.RolAsignado,
                    as: 'rol',
                    where: {
                        id_rol: 1
                    }
                }]
            });

            return usuarios;
        } catch (error) {
            this.desconectar();
            console.error('Error al mostrar los administradores', error);
            throw error;
        }
    }

    /************************************************************************************************************************************
     * Nombre consulta: mostrarOperadores                                                                                               *
     * Descripción: Esta consulta permite mostrar los operadores de la base de datos                                                    *
     * Parametros: ninguno                                                                                                              *
     * Pantalla: Inicio                                                                                                                 *
     * Rol: admin, operador, admin                                                                                                      *
     * *********************************************************************************************************************************/

    mostrarOperadores = async () => {
        try {
            this.conectar();
            const usuarios = await models.Usuario.findAll({
                include: [{
                    model: models.RolAsignado,
                    as: 'rol',
                    where: {
                        id_rol: 2
                    }
                }]
            });

            return usuarios;
        } catch (error) {
            this.desconectar();
            console.error('Error al mostrar los operadores:', error);
            throw error;
        }
    }

}

module.exports = InicioConexion;    
