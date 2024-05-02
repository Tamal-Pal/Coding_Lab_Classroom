import { io } from "socket.io-client"
import { SOCKET_SERVER_URL } from "./URL"

export const initSocket = async (user_id) =>{
    const option = {
        'force new connection': true,
        timeout: 500,
        transports: ["websocket"],
        query: `user_id=${user_id}`
    }
    return io(SOCKET_SERVER_URL, option)
};