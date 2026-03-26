import cron from "node-cron";
import { supabase } from "../services/supabase.service.js";
import { sendReminderEmail } from "../emails/reminder.js";

cron.schedule("0 9 * * *", async () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const date = tomorrow.toISOString().split("T")[0];

  const { data } = await supabase
    .from("showroom_visits")
    .select("*")
    .eq("visit_day", date);

  for (const booking of data) {
    await sendReminderEmail(booking);
  }
});