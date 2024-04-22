
const express = require("express");
const app = express();
const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.REACT_APP_SOCKET_SERVER_PORT || 3002;

const userSocketMap = {};

const getAllConnectedClients = (roomId) => {
    return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
        (socketId) => {
            return {
                socketId,
                username: userSocketMap[socketId],
            };
        }
    );     // map all the client into the particular roomId
};

io.on("connection", (socket) => {
    // console.log(`User connected: ${socket.id}`);

    socket.on('join', ({roomId, username}) =>{
        userSocketMap[socket.id] = username;
        socket.join(roomId);
        const clients = getAllConnectedClients(roomId);
        console.log(clients);
        clients.forEach(({socketId}) =>{
            io.to(socketId).emit("joined", {
                clients,
                username,
                socketId: socket.id,
            });
        });
    });

    socket.on('code-change', ({roomId, code}) =>{
        socket.in(roomId).emit("code-change", {code});
    });
    socket.on('sync-code', ({socketId, code}) =>{
        io.to(socketId).emit("code-change", {code});
    });

    socket.on('disconnecting', () =>{
        const rooms = [...socket.rooms];
        rooms.forEach((roomId) =>{
            socket.in(roomId).emit('disconnected', {
                socketId: socket.id,
                username: userSocketMap[socket.id],
            });
        });
        delete userSocketMap[socket.id];
        socket.leave();
    });
});

server.listen(PORT, () => console.log(`Socket Server Is Running on PORT ${PORT}`));