const SocketIO = require('socket.io');

const setupSocketIO = (server) => {
    const io = SocketIO(server);

    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);

        socket.on('joinRoom', (room) => {
            socket.join(room);
            socket.to(room).emit('message', 'A new user has joined the chat');
        });

        socket.on('message', ({ room, message }) => {
            io.to(room).emit('message', message);
        });

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });

    return io;
};

module.exports = setupSocketIO;
