const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

const channels = {};

io.on('connection', (socket) => {
    console.log('New client connected');

    // Send the current list of channels to the new client
    socket.emit('channelList', Object.keys(channels));

    socket.on('createChannel', (channelName) => {
        if (!channels[channelName]) {
            channels[channelName] = [];
            // Broadcast the new channel list to all clients
            io.emit('channelList', Object.keys(channels));
        }
        socket.join(channelName);
        io.to(channelName).emit('channelCreated', channelName);
    });

    socket.on('joinChannel', (channelName) => {
        socket.join(channelName);
        socket.emit('channelJoined', channelName, channels[channelName]);
    });

    socket.on('sendMessage', (channelName, message) => {
        const msg = { user: socket.id, text: message };
        if (channels[channelName]) {
            channels[channelName].push(msg);
            io.to(channelName).emit('message', msg);
        }
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(5000, () => console.log('Server listening on port 5000'));
