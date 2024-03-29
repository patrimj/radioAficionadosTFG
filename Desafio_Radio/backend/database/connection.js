require('dotenv').config()
const { Sequelize } = require('sequelize');


const db =  new Sequelize(process.env.DB_DEV, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect:process.env.DB_DIALECT, /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
     },
  });

module.exports =  db;

/*
El pool de conexiones es una característica muy útil que permite reutilizar las conexiones existentes en lugar de abrir y 
cerrar conexiones para cada consulta. Esto puede reducir significativamente la sobrecarga de tiempo y recursos tanto para 
tu aplicación como para la base de datos
*/