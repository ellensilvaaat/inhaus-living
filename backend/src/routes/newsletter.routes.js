import express from "express";
import { subscribeToNewsletter } from "../controllers/newsletter.controller.js";
import { formLimiter } from "../middlewares/rateLimit.middleware.js";

const router = express.Router();
router.post("/", formLimiter, subscribeToNewsletter);

export default router;