import { supabase } from "../services/supabase.service.js";

export const confirmBooking = async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).send("Invalid booking");
  }

  await supabase
    .from("showroom_visits")
    .update({ confirmed: true })
    .eq("id", id);

  return res.send("Booking confirmed ✅");
};