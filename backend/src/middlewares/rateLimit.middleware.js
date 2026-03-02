import rateLimit from "express-rate-limit";
import logger from "../utils/logger.js";
import { incrementBlockedCounter } from "../controllers/admin.controller.js";

function getClientIp(req) {
  return (
    req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
    req.socket?.remoteAddress ||
    "unknown"
  );
}

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,

  keyGenerator: (req) => getClientIp(req),

  handler: (req, res) => {
    const ip = getClientIp(req);

    incrementBlockedCounter();

    logger.warn("🚨 API rate limit exceeded", {
      ip,
      path: req.originalUrl,
      method: req.method,
      userAgent: req.headers["user-agent"],
    });

    return res.status(429).json({
      success: false,
      message: "Too many requests. Please try again later.",
    });
  },
});

export const formLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,

  keyGenerator: (req) => getClientIp(req),

  handler: (req, res) => {
    const ip = getClientIp(req);

    incrementBlockedCounter();

    logger.warn("🚨 Form rate limit exceeded (possible spam)", {
      ip,
      path: req.originalUrl,
      method: req.method,
      email: req.body?.email,
      fullName: req.body?.fullName,
      userAgent: req.headers["user-agent"],
    });

    return res.status(429).json({
      success: false,
      message: "Too many submissions. Please try again later.",
    });
  },
});


