const { Server } = require('socket.io');
const express = require("express");

const app = express();
const PORT = process.env.PORT || 8080;
const io = new Server(3000, { 
    cors: {
        origins: [
            'http://localhost:3000',
            'http://127.0.0.1:3000',
            'http://localhost:8080',
            'http://127.0.0.1:8080'
        ]
    } 
});

app.listen(PORT, () => console.log("Server started"));

app.use(express.static("build"));

io.on('connection', (socket) => {
    console.log('a client connected');

    // When a user have new username
    socket.on("set username", (username, callback) => {
        socket.username = username;
        callback({status: "ok"});
    });

    // When a user joins a room
    socket.on("join room", (roomID, callback) => {
        // Set socket current room 
        socket.current_room = roomID;
        socket.vote = 0;

        // Socket joins the room 
        socket.join(roomID);

        const room = io.sockets.adapter.rooms.get(roomID);

        if(!("stat" in room)){
            room.stat = 1;
        }

        // Prepare list of all users in a room
        let users = Array.from(room).map(socketId => {
            let username = io.sockets.sockets.get(socketId).username;
            return { socketId: socketId, username: username };
        });

        // Tell other users in the room that new user joined
        socket.to(roomID).emit('update users',users);

        callback({status: "ok", userlist: users});

    });

    // When a user vote
    socket.on("vote", (content) => {
        socket.vote = content;
        let roomID = socket.current_room;
        let room = io.sockets.adapter.rooms.get(roomID)
        let everyoneVote = 1;

        room.forEach(socketId => {
            let socket = io.sockets.sockets.get(socketId);
            if (!socket.vote) {
                everyoneVote = 0;
            }
        });

        if(everyoneVote){
            room.stat = room.stat == 3 ? 2 : (room.stat + 1) ;
            io.in(roomID).emit('set screen',room.stat);

            room.forEach(socketId => {
                io.sockets.sockets.get(socketId).vote = 0;
            });
        }

    });

    // When a user disconnect
    socket.on("disconnect", (arg) => {
        console.log('a client (' + socket.username + ') disconnected');

        const room = io.sockets.adapter.rooms.get(socket.current_room);
        
        if(room !== undefined){
            // Prepare list of all users in a room
            let users = Array.from(room).map(socketId => {
                let username = io.sockets.sockets.get(socketId).username;
                return { socketId: socketId, username: username };
            });

            // Tell other users in the room that user left the room
            socket.to(socket.current_room).emit('update users',users);
        }
        
    });

});
