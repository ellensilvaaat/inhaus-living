import { supabase } from "../services/supabase.service.js";
import { validateEmail, validateRequiredFields } from "../utils/validators.js";
import logger from "../utils/logger.js";

export const subscribeToNewsletter = async (req, res) => {
  try {
    const { name, email } = req.body;

    // validar campos obrigatórios
    if (!validateRequiredFields([name, email])) {
      logger.warn("Newsletter validation failed - missing fields", {
        body: req.body,
      });

      return res.status(400).json({
        success: false,
        message: "Name and email are required",
      });
    }

    // validar email
    if (!validateEmail(email)) {
      logger.warn("Newsletter invalid email format", { email });

      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // salvar no supabase
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
