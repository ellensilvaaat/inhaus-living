import express from "express";
import jwt from "jsonwebtoken";
import { verifyAdminKey } from "../middlewares/auth.middleware.js";
import { getSecurityStats } from "../controllers/admin.controller.js";

const router = express.Router();

if (process.env.NODE_ENV !== "production") {
  router.get("/token", (req, res) => {
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        success: false,
        message: "JWT_SECRET not configured",
      });
    }

    const token = jwt.sign(
      {
        role: "admin",
        email: "ellensilvaeng@gmail.com",
      },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({
      success: true,
      token,
    });
  });
}

router.get("/security", verifyAdminKey, getSecurityStats);

router.get("/ping", (req, res) => {
  res.json({ success: true, message: "Admin routes working" });
});

export default router;

