import { supabase } from "../services/supabase.service.js";
import { sendConfirmationEmail } from "../services/email.service.js";
import { validateEmail, validatePhone } from "../utils/validators.js";
import logger from "../utils/logger.js";

const MIN_SUBMIT_TIME = 3000;

export const submitContactForm = async (req, res) => {
  try {
    const data = req.body;

    if (typeof data.formStartedAt === "undefined") {
      logger.warn("Contact form missing formStartedAt");
      return res.status(400).json({
        success: false,
        message: "Invalid form submission.",
      });
    }

    const timeTaken = Date.now() - Number(data.formStartedAt);

    if (timeTaken < MIN_SUBMIT_TIME) {
      logger.warn("Bot blocked - submitted too fast", { timeTaken });
      return res.status(429).json({
        success: false,
        message: "Submission too fast.",
      });
    }

    if (
      !data.fullName ||
      !validateEmail(data.email) ||
      !validatePhone(data.mobile)
    ) {
      logger.warn("Contact form validation failed", { body: data });

      return res.status(400).json({
        success: false,
        message: "Invalid form data.",
      });
    }

    const payload = {
      full_name: data.fullName,
      email: data.email,
      address: data.address,
      mobile: data.mobile,
      budget: data.budget,
      service: data.service,
      installation_date: data.installationDate,
      found_us: data.foundUs || null,
      subject: data.subject || null,
      message: data.message || null,
      status: "new",
    };

    const { error } = await supabase
      .from("contact_forms")
      .insert([payload]);

    if (error) {
      logger.error("Contact form DB error", { error });
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    logger.info("Contact form submitted", { email: data.email });

    res.status(201).json({
      success: true,
      message: "Form submitted successfully",
    });

    sendConfirmationEmail(data).catch((err) => {
      logger.warn("Email send failed (non-blocking)", { err });
    });

  } catch (err) {
    logger.error("Contact controller unexpected error", {
      message: err.message,
      stack: err.stack,
    });

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

