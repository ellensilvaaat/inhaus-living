import { supabase } from "../services/supabase.service.js";
import { sendVisitNotification } from "../emails/visitNotification.js";
import { sendVisitConfirmation } from "../emails/visitConfirmation.js";

// 🔹 FACTORY (CREATE VISIT)
const createVisit = (showroom) => async (req, res) => {
  try {
    const {
      full_name,
      email,
      mobile,
      service,
      visit_day,
      visit_time,
    } = req.body;

    if (!full_name || !email || !service || !visit_day || !visit_time) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // 🔥 INSERT + RETORNA ID
    const { data, error } = await supabase
      .from("showroom_visits")
      .insert({
        full_name,
        email,
        mobile,
        service,
        visit_day,
        visit_time,
        showroom,
        page_path: req.headers.referer || null,
      })
      .select()
      .single();

    if (error) {
      if (error.code === "23505") {
        return res.status(409).json({ error: "Time slot already booked" });
      }

      console.error("DB error:", error);
      return res.status(500).json({ error: "Database error" });
    }

    // 🔥 EMAILS (não bloqueia request)
    sendVisitNotification({
      full_name,
      email,
      mobile,
      service,
      visit_day,
      visit_time,
      showroom,
    });

    sendVisitConfirmation({
      full_name,
      email,
      visit_day,
      visit_time,
      showroom,
      booking_id: data.id, // 🔥 ESSENCIAL
    });

    return res.json({ success: true });

  } catch (err) {
    console.error("Create visit error:", err);
    return res.status(400).json({ error: "Invalid request" });
  }
};

// 🔹 GET BOOKED TIMES
const getBookedTimes = (showroom) => async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.json({ bookedTimes: [] });
    }

    const { data, error } = await supabase
      .from("showroom_visits")
      .select("visit_time")
      .eq("visit_day", date)
      .eq("showroom", showroom);

    if (error) {
      console.error(error);
      return res.json({ bookedTimes: [] });
    }

    return res.json({
      bookedTimes: data.map((d) => d.visit_time.slice(0, 5)),
    });

  } catch (err) {
    console.error(err);
    return res.json({ bookedTimes: [] });
  }
};

// EXPORTS
export const createVisitMP = createVisit("mp");
export const createVisitTP = createVisit("tp");

export const getBookedTimesMP = getBookedTimes("mp");
export const getBookedTimesTP = getBookedTimes("tp");