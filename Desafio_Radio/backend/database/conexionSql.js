const mysql = require('mysql2');

class ConexionSql {
    constructor(options) {
        this.config = {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DEV,
            connectionLimit: process.env.DB_MAXCONNECTIONS,
            port: process.env.DB_PORT
        };
        this.pool = mysql.createPool(this.config);
    }

    query = ( sql, values ) => {
        //Devolver una promesa
        return new Promise(( resolve, reject ) => {
            this.pool.query(sql, values, ( err, rows) => {
                if ( err ) {
                    reject( err )
                } else {
                    if (rows.length === 0) {
                        reject(err);
                    }
                    resolve( rows )
                }
            })
        })
    }
}

module.exports = ConexionSql;