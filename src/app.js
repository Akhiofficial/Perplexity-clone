import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.routes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRouter);

// Health Check
app.get("/", (req, res) => {
    res.send("API is running...");
});

export default app;