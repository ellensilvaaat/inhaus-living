import { supabase } from "../services/supabase.service.js";
import logger from "../utils/logger.js";

// GET by slug
export const getComments = async (req, res) => {
  try {
    const { slug } = req.params;

    const { data, error } = await supabase
      .from("blog_comments")
      .select("*")
      .eq("post_slug", slug)
      .order("created_at", { ascending: false });

    if (error) {
      logger.error("Get comments DB error", { error });
      return res.status(400).json({ success: false, message: error.message });
    }

    res.json({ success: true, comments: data });
  } catch (err) {
    logger.error("Get comments unexpected error", { err });
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// POST
export const addComment = async (req, res) => {
  try {
    const { name, text, post_slug } = req.body;

    if (!name || !text || !post_slug) {
      logger.warn("Add comment missing fields", { body: req.body });

      return res.status(400).json({
        success: false,
        message: "Missing fields",
      });
    }

    const { data, error } = await supabase
      .from("blog_comments")
      .insert([{ name, text, post_slug }])
      .select();

    if (error) {
      logger.error("Add comment DB error", { error });
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    logger.info("Comment added", { id: data[0].id });

    res.status(201).json({ success: true, comment: data[0] });
  } catch (err) {
    logger.error("Add comment unexpected error", { err });
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// GET ALL
export const getAllComments = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("blog_comments")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      logger.error("Get all comments DB error", { error });
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    res.json({ success: true, comments: data });
  } catch (err) {
    logger.error("Get all comments unexpected error", { err });
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// DELETE
export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("blog_comments")
      .delete()
      .eq("id", id);

    if (error) {
      logger.error("Delete comment DB error", { error });
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    logger.info("Comment deleted", { id });

    res.json({ success: true, message: "Comment deleted" });
  } catch (err) {
    logger.error("Delete comment unexpected error", { err });
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
