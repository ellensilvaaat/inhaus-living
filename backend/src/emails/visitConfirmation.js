import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVisitConfirmation = async (data) => {
  const {
    full_name,
    email,
    visit_day,
    visit_time,
    showroom,
    booking_id,
  } = data;

  const firstName = full_name.split(" ")[0];
  const sender = "Inhaus Living <no-reply@inhausliving.com.au>";

  const cancelUrl = `${process.env.FRONT_URL}/api/cancel-booking?id=${booking_id}`;

  const calendarLink = generateGoogleCalendarLink({
    title: "Showroom Visit - Inhaus Living",
    date: visit_day,
    time: visit_time,
  });

  const mail = {
    from: sender,
    to: email,
    subject: "Your showroom visit is confirmed",
    html: `
      <h2>Hi ${firstName},</h2>

      <p>Your visit has been confirmed.</p>

      <p><strong>Date:</strong> ${visit_day}</p>
      <p><strong>Time:</strong> ${visit_time}</p>
      <p><strong>Showroom:</strong> ${showroom}</p>

      <br/>

      <a href="${calendarLink}" style="background:#000;color:#fff;padding:10px 20px;">
        Add to Calendar
      </a>

      <br/><br/>

      <a href="${cancelUrl}" style="color:red;">
        Cancel Booking
      </a>
    `,
  };

  await resend.emails.send(mail);
};