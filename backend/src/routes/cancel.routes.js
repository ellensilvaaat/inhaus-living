import express from "express";
import { cancelBooking } from "../controllers/cancel.controller.js";

const router = express.Router();

router.get("/cancel-booking", cancelBooking);

export default router;