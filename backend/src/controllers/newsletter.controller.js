import axios from "axios";
import crypto from "crypto";
import { supabase } from "../services/supabase.service.js";
import { validateEmail, validateRequiredFields } from "../utils/validators.js";
import logger from "../utils/logger.js";

export const subscribeToNewsletter = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!validateRequiredFields([name, email])) {
      logger.warn("Newsletter validation failed - missing fields", { body: req.body });

      return res.status(400).json({
        success: false,
        message: "Name and email are required",
      });
    }

    if (!validateEmail(email)) {
      logger.warn("Newsletter invalid email format", { email });

      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const { error: dbError } = await supabase
      .from("newsletter_subscribers")
      .upsert([{ name: name.trim(), email: normalizedEmail }], {
        onConflict: "email",
      });

    if (dbError) {
      logger.error("Newsletter Supabase error", { error: dbError });

      return res.status(500).json({
        success: false,
        message: "Database error",
      });
    }

    // Mailchimp integration
    try {
      const subscriberHash = crypto
        .createHash("md5")
        .update(normalizedEmail)
        .digest("hex");

      const mailchimpUrl = `https://${process.env.MAILCHIMP_DC}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_AUDIENCE_ID}/members/${subscriberHash}`;

      await axios.put(
        mailchimpUrl,
        {
          email_address: normalizedEmail,
          status_if_new: "subscribed",
          status: "subscribed",
          merge_fields: { FNAME: name },
        },
        {
          headers: {
            Authorization: `apikey ${process.env.MAILCHIMP_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (mailchimpError) {
      logger.warn("Mailchimp error (non-blocking)", {
        message: mailchimpError.message,
      });
    }

    logger.info("Newsletter subscription successful", { email: normalizedEmail });

    return res.json({
      success: true,
      message: "Subscribed successfully",
    });
  } catch (err) {
    logger.error("Newsletter controller unexpected error", {
      message: err.message,
      stack: err.stack,
    });

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
