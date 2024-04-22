import { io } from "socket.io-client"
import { SOCKET_SERVER_URL } from "./URL"

export const initSocket = async () =>{
    const option = {
        'force new connection': true,
        timeout: 500,
        transports: ["websocket"],
    }
    return io(SOCKET_SERVER_URL, option)
};