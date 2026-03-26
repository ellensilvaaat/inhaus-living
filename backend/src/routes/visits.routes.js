import express from "express";
import {
  createVisitMP,
  getBookedTimesMP,
  createVisitTP,
  getBookedTimesTP,
} from "../controllers/visits.controller.js";

const router = express.Router();

// MP
router.post("/visits_mp", createVisitMP);
router.get("/visits_mp/booked", getBookedTimesMP);

// TP
router.post("/visits_tp", createVisitTP);
router.get("/visits_tp/booked", getBookedTimesTP);

export default router;