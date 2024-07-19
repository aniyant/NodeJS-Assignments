const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

    socket.on('join room', (room) => {
        socket.join(room);
        socket.to(room).emit('notification', `User joined ${room}`);
    });

    socket.on('leave room', (room) => {
        socket.leave(room);
        socket.to(room).emit('notification', `User left ${room}`);
    });

    socket.on('group message', (room, msg) => {
        socket.to(room).emit('group message', msg);
    });

    socket.on('error', (err) => {
        console.error('Socket error:', err);
        socket.emit('notification', 'An error occurred');
    });

    socket.on('disconnect', (reason) => {
        console.log('User disconnected:', reason);
        io.emit('notification', 'A user disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
