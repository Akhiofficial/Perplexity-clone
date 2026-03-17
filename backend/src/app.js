import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import chatRouter from "./routes/chat.routes.js";

const app = express();

// Middleware
app.use(morgan("dev"));
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"]
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/chats", chatRouter);

// Health Check
app.get("/", (req, res) => {
  res.send("API is running...");
});

export default app;
