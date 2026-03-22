import { io } from "socket.io-client";

// initialize socket connection
export function initializeSocketConnection() {

    const socket = io(import.meta.env.VITE_API_URL || '', {
        withCredentials: true
    });


    socket.on('connect', () => {
        console.log('Connected to socket.io server', socket.id);
    });

    return socket;
}