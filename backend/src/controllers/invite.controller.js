import { supabase } from "../services/supabase.service.js";

// 🔹 CREATE INVITE
export const createInvite = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const { error } = await supabase
      .from("showroom_invites")
      .insert({
        name,
        email,
      });

    if (error) {
      // email já existe
      if (error.code === "23505") {
        return res.status(409).json({ error: "Email already registered" });
      }

      return res.status(500).json({ error: "Database error" });
    }

    return res.json({ success: true });
  } catch {
    return res.status(400).json({ error: "Invalid request" });
  }
};