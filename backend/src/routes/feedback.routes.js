import express from "express";
import {
  createFeedback,
  getFeedbacks,
  deleteFeedback,
} from "../controllers/feedback.controller.js";
import { verifyAdminKey } from "../middlewares/auth.middleware.js";

const router = express.Router();
router.get("/", getFeedbacks);
router.post("/", createFeedback);
router.delete("/:id", verifyAdminKey, deleteFeedback);

export default router;