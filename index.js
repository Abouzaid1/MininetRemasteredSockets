const express = require('express');
const http = require('http');

const app = express();


app.use(express.json());

app.listen(process.env.PORT || 4000, () => {
    console.log('listening on port: 4000');
});


// sockets 
const { createServer } = require('node:http');
const server = require("http").createServer(app);
const io = require("socket.io")(server);
io.on('connect', (socket) => {
    socket.on('dataFromClient', (data) => {
        const { room, message } = data;
        // io.to(room).emit('message', message);
        console.log(room);
        socket.join(room);
    });
    // Listen for mouseMove events from clients
    socket.on('mouseMove', (data) => {
        // Broadcast the mouse movement data to all connected clients except the sender
        socket.broadcast.emit('mouseMove', data);
    });
    socket.on('controllerMove', (data) => {
        // Broadcast the mouse movement data to all connected clients except the sender
        socket.broadcast.emit('controllerMove', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});


server.listen(10000, () => {
    console.log('server running at 3000');
});
