require('dotenv').config()
const Server = require('./server');

//Lanzamos el servidor.
const server = new Server();
server.listen();

console.log(`Datos de conexión: ${process.env.DB_DATABASE} ${process.env.DB_USER} ${process.env.DB_PASSWORD}`);