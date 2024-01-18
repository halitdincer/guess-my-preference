const { Server } = require('socket.io');
const express = require("express");

const app = express();
const PORT = process.env.PORT || 8080;
const io = new Server(3000, { 
    cors: {
        origins: ['http://localhost:3000','http://127.0.0.1:3000','http://localhost:8080','http://127.0.0.1:8080']
    } 
});

app.listen(PORT, () => console.log("Server started"));

app.use(express.static("build"));

io.on('connection', (socket) => {
    console.log('a user connected');
});
