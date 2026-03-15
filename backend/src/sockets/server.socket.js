import { Server } from "socket.io";

// io means server
let io = null;

export function initSocket(httpServer){
    io = new Server(httpServer, {
        cors: {
            origin: "http://localhost:5173",
            credentials: true
        }
    });

    console.log("Socket io server is running");
    
    // events listeners
    io.on("connection", (socket) => {
        console.log("User connected:", socket.id); //socket id is unique for each user
    });

    
}


export function getIo(){

    if(!io){
        throw new Error("Socket not initialized");
    }

    return io;
}
