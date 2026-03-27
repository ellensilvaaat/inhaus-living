import { supabase } from "../services/supabase.service.js";

export const cancelBooking = async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).send(`
        <h2>Invalid request</h2>
      `);
    }

    // 🔍 opcional: buscar booking antes (pra UX)
    const { data: booking } = await supabase
      .from("showroom_visits")
      .select("full_name, showroom")
      .eq("id", id)
      .single();

    // ❌ deletar booking
    const { error } = await supabase
      .from("showroom_visits")
      .delete()
      .eq("id", id);

    if (error) {
      return res.send(`
        <html>
          <body style="font-family:Arial;text-align:center;padding:60px;">
            <h2>Something went wrong</h2>
            <p>Please try again later.</p>
          </body>
        </html>
      `);
    }

    const firstName = booking?.full_name?.split(" ")[0] || "";
    const showroomLabel =
      booking?.showroom === "mp" ? "Moore Park" : "Taren Point";

    // ✅ RESPOSTA BONITA
    return res.send(`
      <html>
        <head>
          <title>Booking Cancelled</title>
        </head>

        <body style="
          margin:0;
          font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto;
          background:#f5f5f5;
          display:flex;
          align-items:center;
          justify-content:center;
          height:100vh;
        ">

          <div style="
            background:#fff;
            padding:50px;
            border-radius:16px;
            box-shadow:0 20px 50px rgba(0,0,0,0.1);
            text-align:center;
            max-width:420px;
          ">

            <h2 style="margin-bottom:10px;">
              Booking Cancelled
            </h2>

            <p style="color:#555;">
              ${firstName ? `Hi ${firstName},` : ""}
              your visit at <strong>${showroomLabel}</strong> has been cancelled.
            </p>

            <p style="color:#777;font-size:14px;margin-top:20px;">
              You can book again anytime.
            </p>

            <a href="https://www.inhausliving.com.au"
              style="
                display:inline-block;
                margin-top:30px;
                padding:12px 24px;
                border-radius:30px;
                text-decoration:none;
                background:#000;
                color:#fff;
                font-size:14px;
              "
            >
              Back to website
            </a>

          </div>

        </body>
      </html>
    `);

  } catch (err) {
    console.error("Cancel booking error:", err);

    return res.send(`
      <html>
        <body style="font-family:Arial;text-align:center;padding:60px;">
          <h2>Error</h2>
          <p>Something went wrong.</p>
        </body>
      </html>
    `);
  }
};