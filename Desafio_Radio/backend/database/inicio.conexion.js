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
    
    // NOTICIAS

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

    // ---------------------------- RUTAS ADMINISTRADOR ----------------------------

    // ELIMINAR NOTICIAS

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

    // MODIFICAR NOTICIAS

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

    // CREAR NOTICIAS

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
