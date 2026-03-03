import { supabase } from "../services/supabase.service.js";
import { sendConfirmationEmail } from "../services/email.service.js";
import logger from "../utils/logger.js";

const MIN_SUBMIT_TIME = 3000;

export const submitLandingLead = async (req, res) => {
  try {
    const data = req.body;

    if (typeof data.formStartedAt === "undefined") {
      return res.status(400).json({
        success: false,
        message: "Invalid submission.",
      });
    }

    const timeTaken = Date.now() - Number(data.formStartedAt);

    if (timeTaken < MIN_SUBMIT_TIME) {
      return res.status(429).json({
        success: false,
        message: "Submission too fast.",
      });
    }

    if (!data.fullName || !data.email || !data.mobile) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields.",
      });
    }

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

    // 🔥 Envia email (não bloqueia resposta)
    sendConfirmationEmail({
      ...data,
      installationDate: data.installationDate || null,
      subject: data.subject || null,
    }).catch((err) => {
      logger.warn("Landing email send failed", { err });
    });

    return res.status(201).json({
      success: true,
      message: "Lead submitted successfully",
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