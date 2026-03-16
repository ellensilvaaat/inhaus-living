import { supabase } from "../services/supabase.service.js";
import { sendConfirmationEmail } from "../services/email.service.js";
import { sendLeadToMonday } from "../services/monday.service.js";
import logger from "../utils/logger.js";

const MIN_SUBMIT_TIME = 3000;

export const submitLandingLead = async (req, res) => {
  try {

    const data = req.body;

    /* =========================
       BOT PROTECTION
    ========================== */

    if (typeof data.formStartedAt === "undefined") {

      logger.warn("Landing form missing formStartedAt");

      return res.status(400).json({
        success: false,
        message: "Invalid submission.",
      });

    }

    const timeTaken = Date.now() - Number(data.formStartedAt);

    if (timeTaken < MIN_SUBMIT_TIME) {

      logger.warn("Landing bot blocked - submitted too fast", { timeTaken });

      return res.status(429).json({
        success: false,
        message: "Submission too fast.",
      });

    }

    /* =========================
       BASIC VALIDATION
    ========================== */

    if (!data.fullName || !data.email || !data.mobile) {

      logger.warn("Landing validation failed", { body: data });

      return res.status(400).json({
        success: false,
        message: "Missing required fields.",
      });

    }

    /* =========================
       DATABASE PAYLOAD
    ========================== */

    const payload = {
      service_key: data.service_key || null,
      service_label: data.service_label || data.service || null,
      suburb: data.suburb || null,
      region: data.region || null,

      full_name: data.fullName,
      email: data.email,
      mobile: data.mobile,
      address: data.address,
      budget: data.budget,
      message: data.message,

      installation_date: data.installationDate || null,
      subject: data.subject || null,
      page_path: data.page_path || null,
      status: "new",
    };

    /* =========================
       INSERT INTO SUPABASE
    ========================== */

    const { error } = await supabase
      .from("landing_leads")
      .insert([payload]);

    if (error) {

      logger.error("Landing DB error", { error });

      return res.status(400).json({
        success: false,
        message: error.message,
      });

    }

    logger.info("Landing lead submitted", {
      email: data.email,
      service: data.service_label || data.service,
      suburb: data.suburb
    });

    /* =========================
       SUCCESS RESPONSE
    ========================== */

    res.status(201).json({
      success: true,
      message: "Lead submitted successfully",
    });

    /* =========================
       SEND EMAIL (ASYNC)
    ========================== */

    sendConfirmationEmail({
      ...data,
      installationDate: data.installationDate || null,
      subject: data.subject || null,
    }).catch((err) => {

      logger.warn("Landing email send failed", {
        error: err.message,
      });

    });

    /* =========================
       SEND TO MONDAY (ASYNC)
    ========================== */

    sendLeadToMonday({
      fullName: data.fullName,
      email: data.email,
      mobile: data.mobile,
      address: data.address,
      budget: data.budget,
      service: data.service_label || data.service,
      message: data.message,
      suburb: data.suburb,
      region: data.region,
      page: data.page_path
    }).catch((err) => {

      logger.warn("Monday landing lead failed", {
        error: err.message,
      });

    });

  } catch (err) {

    logger.error("Landing unexpected error", {
      message: err.message,
      stack: err.stack,
    });

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};