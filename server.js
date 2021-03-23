const express = require('express');

const formatMessage = require('./utils/message');

const app = express();

const http = require('http');

const server = http.createServer(app);

const socketIO = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"],
        transports: ['websocket', 'polling'],
        credentials: true
    },
    allowEIO3: true
});

const io = socketIO.listen(server);

const PORT = 3000 || process.env.PORT;

const chatbot = 'chatBot';

io.on('connection', socket => {
    console.log('New incoming connection...')

    socket.emit('message', formatMessage(chatbot,'welcome to the chat, friend'))

    socket.broadcast.emit('message', formatMessage(chatbot, 'A new user has joined the chat'));

    // listen for messages
    socket.on('chatMessage', msg => {
        io.emit('message', msg);
    })

    socket.on('disconnect', () => {
        io.emit('message', formatMessage(chatbot, 'A user has left the chat'));
    });
})

server.listen(PORT, () => console.log(`Server running on port: ${PORT}`));