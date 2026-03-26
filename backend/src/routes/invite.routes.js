import express from "express";
import { createInvite } from "../controllers/invite.controller.js";

const router = express.Router();

router.post("/invites", createInvite);

export default router;