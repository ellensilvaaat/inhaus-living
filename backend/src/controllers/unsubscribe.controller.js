import { supabase } from "../services/supabase.service.js";

export const unsubscribe = async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).send("Invalid request");
  }

  await supabase
    .from("newsletter_subscribers")
    .update({ is_subscribed: false })
    .eq("email", email);

  return res.send("You have been unsubscribed.");
};