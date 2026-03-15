import "dotenv/config";
import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import http from 'http'
import { initSocket } from "./src/sockets/server.socket.js";


const PORT = process.env.PORT;

// socket server
const httpServer = http.createServer(app);
// initialize socket
initSocket(httpServer);

// database connection
connectDB();

httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});