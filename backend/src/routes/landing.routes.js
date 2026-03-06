import express from "express";
import { submitLandingLead } from "../controllers/landing.controller.js";
import { formLimiter } from "../middlewares/rateLimit.middleware.js";
//import { verifyTurnstile } from "../middlewares/turnstile.middleware.js";

const router = express.Router();

router.post("/", formLimiter,  submitLandingLead);

export default router;