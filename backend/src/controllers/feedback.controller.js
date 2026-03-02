import { supabase } from "../services/supabase.service.js";
import logger from "../utils/logger.js";

// GET
export const getFeedbacks = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("feedbacks")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      logger.error("Get feedbacks DB error", { error });
      return res.status(400).json({ success: false, message: error.message });
    }

    res.json({ success: true, feedbacks: data });
  } catch (err) {
    logger.error("Get feedbacks unexpected error", { err });
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// POST
export const createFeedback = async (req, res) => {
  try {
    const { name, stars, comment } = req.body;

    if (!name || !comment) {
      logger.warn("Create feedback missing fields", { body: req.body });

      return res.status(400).json({
        success: false,
        message: "Name and comment required",
      });
    }

    const { data, error } = await supabase
      .from("feedbacks")
      .insert([{ name, stars, comment }])
      .select();

    if (error) {
      logger.error("Create feedback DB error", { error });
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    logger.info("Feedback created", { id: data[0].id });

    res.status(201).json({ success: true, feedback: data[0] });
  } catch (err) {
    logger.error("Create feedback unexpected error", { err });
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// DELETE
export const deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("feedbacks")
      .delete()
      .eq("id", id);

    if (error) {
      logger.error("Delete feedback DB error", { error });
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    logger.info("Feedback deleted", { id });

    res.json({ success: true, message: "Feedback deleted" });
  } catch (err) {
    logger.error("Delete feedback unexpected error", { err });
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
