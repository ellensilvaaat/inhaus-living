import os from "os";
import logger from "../utils/logger.js";

let blockedAttempts = 0;
let submissionsToday = 0;

export function incrementBlockedCounter() {
  blockedAttempts++;
}

export function incrementSubmissionCounter() {
  submissionsToday++;
}

export async function getSecurityStats(req, res) {
  try {
    res.json({
      success: true,
      stats: {
        blockedAttempts,
        submissionsToday,
        uptime: process.uptime(),
        memoryUsage: process.memoryUsage(),
        cpuLoad: os.loadavg(),
      },
    });
  } catch (err) {
    logger.error("Dashboard error", { error: err });
    res.status(500).json({
      success: false,
      message: "Internal error",
    });
  }
}
