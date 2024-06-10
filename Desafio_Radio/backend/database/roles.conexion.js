const Conexion = require('./ConexionSequelize');
const { Sequelize, Op } = require('sequelize');
const models = require('../models/index.js'); 

const COD_INCORRECTO = 0;

class RolesConexion {

    constructor() {
        this.conexion = new Conexion();
    }

    conectar = () => {
        this.conexion.conectar();
    }

    desconectar = () => {
        this.conexion.desconectar();
    }

    mostrarRoles = async () => {
        try {
            this.conectar();

            const roles = await models.Rol.findAll();

            this.desconectar();

            if (!roles) return COD_INCORRECTO;

            return roles;
        } catch (error) {
            console.log(error)

            return false;
        }
    }

}


module.exports = RolesConexion;