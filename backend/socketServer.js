
const express = require("express");
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const { getRole } = require("./utils/roles");
const { CONNECTION, JOIN, LEAVE, CODE_CHANGE } = require("./config/SocketEvent");

const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.REACT_APP_SOCKET_SERVER_PORT || 3002;

const userSocketMap = {};
const notebookContent = {};

const notebookObject = {
    code: '',
    input: '',
    messages: [],
    studentIsActive: false,
    teacherIsActive: false
};

// notebookContent {
//     notebook: notebookObject
// }

io.on(CONNECTION, (socket) => {
    console.log(`User connected: ${socket.id}`);
    const { user_id } = socket.request._query;
    userSocketMap[socket.id] = user_id;

    socket.on(JOIN, ({ notebook, user_id }) => {
        console.log('join', notebook, user_id);

        if (!notebookContent[notebook]) {
            notebookContent[notebook] = notebookObject;
        }

        const role = getRole(user_id);
        if (role) {
            notebookContent[notebook][`${role}IsActive`] = true;
        }
        else return;
        socket.join(notebook);
        socket.emit(CODE_CHANGE, { code: notebookContent[notebook]['code'] })
    });

    socket.on(LEAVE, ({ notebook, user_id }) => {
        console.log('leave', notebook, user_id);
        const role = getRole(user_id);

        if (role) {
            notebookContent[notebook][`${role}IsActive`] = false;
        }
        else return;
        socket.leave(notebook)
    })

    socket.on(CODE_CHANGE, ({ notebook, code, change }) => {
        console.log(change);

        if(notebookContent[notebook]['studentIsActive']){
            notebookContent[notebook]['code'] = code;
            socket.in(notebook).emit("code-change", { code });
        }
    });
    socket.on('sync-code', ({ socketId, code }) => {
        io.to(socketId).emit("code-change", { code });
    });

    socket.on('disconnecting', () => {
        const rooms = [...socket.rooms];
        rooms.forEach((notebook) => {
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