
const socketController = (socket, io) => {
    console.log(`Cliente ${socket.id} conectado en ${process.env.WEBSOCKETPORT}`);

    socket.on('noticiaNueva', (payload) => {
        console.log(payload);

        io.emit('enviarNoticiaNueva', payload);
    });

};

module.exports = {
    socketController
};