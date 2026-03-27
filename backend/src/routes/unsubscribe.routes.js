import express from "express";
import { unsubscribe } from "../controllers/unsubscribe.controller.js";

const router = express.Router();

router.get("/unsubscribe", unsubscribe);

export default router;