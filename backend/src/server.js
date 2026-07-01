import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env
dotenv.config();

import { validateEnv } from "./config/validateEnv.js";
import logger from "./config/logger.js";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";

// ─── VALIDATE ENV FIRST ───────────────────────
validateEnv();

const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";

// ─── SECURITY MIDDLEWARE ──────────────────────
app.use(helmet());
app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        "http://localhost:3000",
        "http://localhost:5173",
        "http://127.0.0.1:3000",
        "https://pet-12.vercel.app",
        process.env.FRONTEND_URL,
      ].filter(Boolean);

      // Allow requests with no origin (mobile apps, curl, etc.)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        logger.warn(`Blocked CORS request from: ${origin}`);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);

// ─── RATE LIMITING ────────────────────────────
import rateLimit from "express-rate-limit";

const generalLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: "Too many requests. Please try again later.",
    });
  },
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 attempts
  message: {
    success: false,
    message: "Too many auth attempts. Please try again after 15 minutes.",
  },
});

app.use(generalLimiter);
app.use("/api/v1/auth/", authLimiter); // Stricter on auth routes

// ─── BODY PARSING ─────────────────────────────
app.use(compression());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ─── LOGGING ──────────────────────────────────
app.use(
  morgan(NODE_ENV === "production" ? "combined" : "dev", {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  })
);

// ─── DATABASE ─────────────────────────────────
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => logger.info("✅ MongoDB Connected"))
  .catch((err) => {
    logger.error("❌ MongoDB Connection Error:", err.message);
    logger.warn("⚠️ Continuing startup without active MongoDB. Make sure local MongoDB server is running.");
  });

// Connection events
mongoose.connection.on("disconnected", () =>
  logger.warn("⚠️ MongoDB disconnected")
);
mongoose.connection.on("reconnected", () =>
  logger.info("✅ MongoDB reconnected")
);
mongoose.connection.on("error", (err) =>
  logger.error("❌ MongoDB error:", err.message)
);

// ─── API VERSIONING ───────────────────────────
const API_V1 = "/api/v1";

// ─── ROUTES ───────────────────────────────────
app.use(`${API_V1}/auth`, authRoutes);
app.use(`${API_V1}/users`, userRoutes);

// Health check
app.get(`${API_V1}/health`, (req, res) => {
  res.status(200).json({
    success: true,
    service: "DoFo Backend",
    version: "1.0.0",
    environment: NODE_ENV,
    timestamp: new Date().toISOString(),
    database: {
      status: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
      name: mongoose.connection.name || "unknown",
    },
    uptime: process.uptime(),
  });
});

// Root
app.get("/", (req, res) => {
  res.json({
    message: "🐾 Welcome to DoFo API",
    docs: `${API_V1}/health`,
    version: "1.0.0",
  });
});

// ─── ERROR HANDLERS ───────────────────────────

// 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.path} not found.`,
    availableRoutes: [`${API_V1}/auth/*`, `${API_V1}/users/*`, `${API_V1}/health`],
  });
});

// Global error handler
app.use((err, req, res, next) => {
  logger.error("💥 Global Error:", err);

  // CORS errors
  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({
      success: false,
      message: "CORS policy violation",
    });
  }

  // Mongoose validation errors
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({
      success: false,
      message: "Validation Error",
      errors: messages,
    });
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    return res.status(409).json({
      success: false,
      message: "Duplicate entry. This record already exists.",
    });
  }

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    ...(NODE_ENV === "development" && { stack: err.stack }),
  });
});

// ─── GRACEFUL SHUTDOWN ─────────────────────────
const server = app.listen(PORT, () => {
  logger.info(`🚀 DoFo Server running on http://localhost:${PORT}`);
  logger.info(`📋 API Base: ${API_V1}`);
  logger.info(`🔧 Environment: ${NODE_ENV}`);
});

const gracefulShutdown = (signal) => {
  logger.info(`\n${signal} received. Shutting down gracefully...`);
  server.close(() => {
    logger.info("HTTP server closed");
    mongoose.connection.close(false, () => {
      logger.info("MongoDB connection closed");
      process.exit(0);
    });
  });

  // Force shutdown after 10s
  setTimeout(() => {
    logger.error("Forced shutdown after timeout");
    process.exit(1);
  }, 10000);
};

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  logger.error("💥 Uncaught Exception:", err);
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  logger.error("💥 Unhandled Rejection:", reason);
});
