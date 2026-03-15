import { io } from "socket.io-client";

// initialize socket connection
export function initializeSocketConnection() {

    const socket = io('http://localhost:3000', {
        withCredentials: true
    });

    socket.on('connect', () => {
        console.log('Connected to socket.io server', socket.id);
    });

    return socket;
}