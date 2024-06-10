const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const { socketController } = require('../controllers/websocket');

class Server {

    constructor() {
        this.app = express();
        this.usuariosPath = '/api';

        //Para websockets.
        this.server = require('http').createServer(this.app); 
        this.io = require('socket.io')(this.server, {
            cors: {
                origin: "http://localhost:4200",
                methods: ["*"],
                allowedHeaders: ["*"],
                credentials: true
            }
        });
        //Middlewares
        this.middlewares();

        this.routes();

        this.sockets();

    }

    middlewares() {

        this.app.use(cors());

        this.app.use(express.json());

        // Fileupload - Carga de archivos.
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true  //Con esta opción si la carpeta de destino no existe, la crea.
        }));

        //Directorio públco: http://localhost:9090/  --> Habilitamos esto para ver como se cargaría una imagen desde el cliente.
        this.app.use(express.static('public'));

    }

    routes() {
        this.app.use(this.usuariosPath, require('../routes/actividadRoutes'));
        this.app.use(this.usuariosPath, require('../routes/concursoRoutes'));
        this.app.use(this.usuariosPath, require('../routes/contactoRoutes'));
        this.app.use(this.usuariosPath, require('../routes/usuarioRoutes'));
        this.app.use(this.usuariosPath, require('../routes/perfilRoutes'));
        this.app.use(this.usuariosPath, require('../routes/inicioRoutes'));
    }

    sockets(){
        this.io.on('connection', (socket) => {
            socketController(socket, this.io)
        });
    }

    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`Servidor escuchando en: ${process.env.PORT}`);
        })

        this.server.listen(process.env.WEBSOCKETPORT, () => {
            console.log(`Servidor de WebSockets escuchando en: ${process.env.WEBSOCKETPORT}`);
        });
    }
}

module.exports = Server;