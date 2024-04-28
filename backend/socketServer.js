
const express = require("express");
const app = express();
const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.REACT_APP_SOCKET_SERVER_PORT || 3002;

const userSocketMap = {};

// const getAllConnectedClients = (notebook) => {
//     return Array.from(io.sockets.adapter.rooms.get(notebook) || []).map(
//         (socketId) => {
//             return {
//                 socketId,
//                 user_id: userSocketMap[socketId],
//             };
//         }
//     );     // map all the client into the particular notebook
// };

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('join', ({notebook, user_id}) =>{
        console.log('join', notebook, user_id)
        userSocketMap[socket.id] = user_id;
        socket.join(notebook);
    });

    socket.on('code-change', ({notebook, code, role}) =>{
        socket.in(notebook).emit("code-change", {code});
    });
    socket.on('sync-code', ({socketId, code}) =>{
        io.to(socketId).emit("code-change", {code});
    });

    socket.on('disconnecting', () =>{
        const rooms = [...socket.rooms];
        rooms.forEach((notebook) =>{
            socket.in(notebook).emit('disconnected', {
                socketId: socket.id,
                user_id: userSocketMap[socket.id],
            });
        });
        delete userSocketMap[socket.id];
        socket.leave();
        console.log(`User disconnected: ${socket.id}`);
    });
});

server.listen(PORT, () => console.log(`Socket Server Is Running on PORT ${PORT}`));