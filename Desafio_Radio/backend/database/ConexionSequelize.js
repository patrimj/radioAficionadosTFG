require('dotenv').config()
const { Sequelize, Op } = require('sequelize'); // Op es para los operadores de sequelize

class ConexionSequilze {

    constructor() {
        this.db = new Sequelize(process.env.DB_DEV, process.env.DB_USER, process.env.DB_PASSWORD, {
            host: process.env.DB_HOST,
            dialect: process.env.DB_DIALECT, /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            },
        });
    }

    /**
     * Sequelize will keep the connection open by default, and use the same connection for all queries. If you need to close the connection, 
     * call sequelize.close() (which is asynchronous and returns a Promise).
     */

    //https://sequelize.org/docs/v6/core-concepts/model-querying-basics/

    conectar = () => {
        this.db.authenticate().then(() => {
            console.log('Connection has been established successfully.');
        }).catch((error) => {
            console.error('Unable to connect to the database: ', error);
        });
    }

    desconectar = () => {
        //this.db.close();
        process.on('SIGINT', () => conn.close())
    }
}

module.exports = ConexionSequilze;
