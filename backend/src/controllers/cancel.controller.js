import { supabase } from "../services/supabase.service.js";

export const cancelBooking = async (req, res) => {
  const { id } = req.query;

  if (!id) return res.status(400).send("Invalid");

  await supabase
    .from("showroom_visits")
    .delete()
    .eq("id", id);

  return res.send("Booking cancelled");
};