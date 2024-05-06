
const express = require("express");
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const { getRole, getOppositeRole } = require("./utils/roles");
const { CONNECTION, JOIN, LEAVE, CODE_CHANGE } = require("./config/SocketEvent");
const database = require('./models/database');
const helloWorld = require("./utils/helloWorld");

const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.REACT_APP_SOCKET_SERVER_PORT || 3002;

const userSocketMap = {};
const notebookContent = {};

const notebookObject = async (notebook) => {

    const room_id = notebook.split('_')[0]
    const roomData = await database.getRoomData(room_id)
    const { language } = roomData

    return {
        language: language,
        code: helloWorld(language),
        input: '',
        messages: [],
        studentIsActive: false,
        teacherIsActive: false,
        studentPendingMessages: [],
        teacherPendingMessages: []
    }
};
const getPendingMessagesInRooms = ({ rooms, role }) => {
    const keys = Object.keys(notebookContent)
    const pendingRooms = []

    rooms.map(room => {
        keys.map(key => {
            const r = key.split('_')[0]
            if(room === r && notebookContent[key][`${role}PendingMessages`].length > 0){
                pendingRooms.push(room)
                return
            }
        })
    })
    // console.log('pending rooms', pendingRooms, 'being sent to', role)

    return pendingRooms
}
const getPendingMessagesInRoom = ({ room, role }) => {
    const keys = Object.keys(notebookContent)
    const notebooks = []

    keys.map(key => {
        const r = key.split('_')[0]
        if(r === room && notebookContent[key][`${role}PendingMessages`].length > 0){
            notebooks.push(key)
        }
    })

    return notebooks
}
const getAndClearPendingInNotebook = ({ notebook, role }) => {
    const pendings = notebookContent[notebook][`${role}PendingMessages`]
    notebookContent[notebook][`${role}PendingMessages`] = []

    return pendings
}
// notebookContent {
//     notebook: notebookObject
// }

io.on(CONNECTION, (socket) => {
    const { user_id } = socket.request._query;
    userSocketMap[socket.id] = user_id;
    console.log(`User connected: ${socket.id} ${user_id}`);

    socket.on(JOIN, async ({ notebook, user_id }) => {
        console.log('join', notebook, user_id);

        if (!notebookContent[notebook]) {
            notebookContent[notebook] = await notebookObject(notebook);
        }

        const role = getRole(user_id);
        if (role) {
            notebookContent[notebook][`${role}IsActive`] = true;
        }
        else return;

        const pendingMessages = getAndClearPendingInNotebook({ notebook, role })
        pendingMessages.map(message => {
            socket.emit('message', { message })
        })
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

    socket.on(CODE_CHANGE, ({ notebook, code }) => {

        if (notebookContent[notebook]['studentIsActive']) {
            notebookContent[notebook]['code'] = code;
            socket.in(notebook).emit("code-change", { code });
        }
    });
    socket.on('sync-code', ({ socketId, code }) => {
        io.to(socketId).emit("code-change", { code });
    });

    socket.on('get-availability', ({ notebook }) => {
        const studentIsActive = notebookContent[notebook]?.studentIsActive
        const teacherIsActive = notebookContent[notebook]?.teacherIsActive
        socket.emit('get-availability', { studentIsActive, teacherIsActive })
    })

    socket.on('message', ({ msg, notebook, role }) => {
        // console.log(1, 'message', { msg, notebook, role })

        const oppositeRole = getOppositeRole(role)
        if(notebookContent[notebook][`${oppositeRole}IsActive`]){
            socket.in(notebook).emit('message', { message: msg })
            return
        }

        notebookContent[notebook][`${oppositeRole}PendingMessages`].push(msg)
    })

    socket.on('pending-in-rooms', ({ rooms, role }) => {
        var pendingRooms = []
        if(rooms && role) {
            pendingRooms = getPendingMessagesInRooms({ rooms, role })
        }
        // console.log('notebook content', notebookContent)
        // console.log('pending rooms', pendingRooms, 'being sent to', role)
        socket.emit('pending-in-rooms', ({ pendingRooms }))
    })

    socket.on('pending-in-room', ({ room, role }) => {
        const pendingNotebooks = getPendingMessagesInRoom({ room, role })
        socket.emit('pending-in-room', pendingNotebooks)
    })

    socket.on('pending-in-notebook', ({ notebook, role }) => {
        const pendings = getAndClearPendingInNotebook({ notebook, role })
        socket.emit('pending-in-notebook', ({ pendings }))
    })

    socket.on('disconnecting', () => {
        const rooms = [...socket.rooms];
        const user_id = userSocketMap[socket.id]
        const role = getRole(user_id)
        rooms.forEach((notebook) => {
            // socket.in(notebook).emit('disconnected', {
            //     socketId: socket.id,
            //     user_id: userSocketMap[socket.id],
            // });
            try{
                notebookContent[notebook][`${role}IsActive`] = false
            } catch {}
        });
        delete userSocketMap[socket.id];
        socket.leave();
        console.log(`User disconnected: ${socket.id}`);
    })
})

server.listen(PORT, () => console.log(`Socket Server Is Running on PORT ${PORT}`));