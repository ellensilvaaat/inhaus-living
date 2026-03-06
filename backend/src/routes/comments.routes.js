import express from "express";
import { submitContactForm } from "../controllers/contact.controller.js";
import { formLimiter } from "../middlewares/rateLimit.middleware.js";
import { verifyTurnstile } from "../middlewares/turnstile.middleware.js";

const router = express.Router();

router.post("/", formLimiter, verifyTurnstile, submitContactForm);

export default router;
