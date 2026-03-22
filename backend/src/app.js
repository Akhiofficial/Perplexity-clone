import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import chatRouter from "./routes/chat.routes.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(morgan("dev"));

// Dynamic CORS configuration
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  process.env.FRONTEND_URL, // In case we need it
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      // In production, you might want to be more restrictive
      // but for now, we'll allow the same origin
      return callback(null, true); 
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// API Routes
app.use("/api/auth", authRouter);
app.use("/api/chats", chatRouter);

// Serve Frontend Static Files in Production
const frontendPath = path.join(__dirname, "../../frontend/dist");
app.use(express.static(frontendPath));

// Health Check / API Root
app.get("/api-status", (req, res) => {
  res.json({ status: "API is running..." });
});

// Catch-all middleware to serve the frontend index.html
app.use((req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});



export default app;

