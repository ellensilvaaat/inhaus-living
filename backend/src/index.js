import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

import contactRoutes from "./routes/contact.routes.js";
import feedbackRoutes from "./routes/feedback.routes.js";
import commentsRoutes from "./routes/comments.routes.js";
import newsletterRoutes from "./routes/newsletter.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import landingRoutes from "./routes/landing.routes.js";

import { apiLimiter } from "./middlewares/rateLimit.middleware.js";
import logger from "./utils/logger.js";

dotenv.config();

const app = express();

/*
  🔒 TRUST PROXY (importante para rate-limit e IP real em produção)
*/
app.set("trust proxy", 1);

/*
  🔐 SECURITY HEADERS
*/
app.use(helmet());

/*
  📊 HTTP REQUEST LOGGING (Morgan → Winston)
*/
app.use(
  morgan("combined", {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  })
);

/*
  🚫 GLOBAL RATE LIMIT
*/
app.use(apiLimiter);

/*
  🔒 CORS (mantido exatamente como você pediu)
*/
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    methods: ["GET", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/*
  📦 BODY PARSER
*/
app.use(express.json({ limit: "1mb" }));

/*
  📌 API ROUTES
*/
app.use("/api/contact", contactRoutes);
app.use("/api/feedbacks", feedbackRoutes);
app.use("/api/comments", commentsRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/landing", landingRoutes);

/*
  🔐 ADMIN ROUTES
*/
app.use("/admin", adminRoutes);

/*
  ❤️ HEALTH CHECK
*/
app.get("/", (req, res) => {
  res.status(200).send("✅ Inhaus Living API is running fine.");
});

/*
  🚨 GLOBAL ERROR HANDLER
*/
app.use((err, req, res, next) => {
  logger.error("Unhandled server error", {
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
  });

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

/*
  🚀 START SERVER
*/
const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
  logger.info(`🚀 Server running on port ${PORT}`);
});
