import express from "express";
import { confirmBooking } from "../controllers/confirm.controller.js";

const router = express.Router();

router.get("/confirm-booking", confirmBooking);

export default router;