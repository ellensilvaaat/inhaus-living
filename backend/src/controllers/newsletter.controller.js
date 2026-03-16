import { supabase } from "../services/supabase.service.js";
import { validateEmail, validateRequiredFields } from "../utils/validators.js";
import logger from "../utils/logger.js";

import { subscribeUser } from "../services/newsletterSequence.service.js";

export const subscribeToNewsletter = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!validateRequiredFields([name, email])) {
      logger.warn("Newsletter validation failed - missing fields", {
        body: req.body,
      });

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

    /*
      salvar no Supabase
    */
    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert([
        {
          name: name.trim(),
          email: normalizedEmail,
        },
      ]);

    if (error) {
      logger.error("Newsletter Supabase error", { error });

      return res.status(500).json({
        success: false,
        message: "Database error",
      });
    }

    logger.info("Newsletter subscription saved", {
      email: normalizedEmail,
    });

    /*
      disparar welcome email + iniciar sequência
    */
    const firstName = name.split(" ")[0];

    await subscribeUser(normalizedEmail, firstName);

    return res.status(201).json({
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
