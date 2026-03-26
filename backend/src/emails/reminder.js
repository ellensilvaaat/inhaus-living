import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendReminderEmail = async (booking) => {
  const {
    id,
    full_name,
    email,
    visit_day,
    visit_time,
    showroom,
  } = booking;

  const firstName = full_name?.split(" ")[0] || "";

  const showroomLabel =
    showroom === "mp" ? "Moore Park" : "Taren Point";

  const confirmUrl = `${process.env.FRONT_URL}/api/confirm-booking?id=${id}`;
  const cancelUrl = `${process.env.FRONT_URL}/api/cancel-booking?id=${id}`;

  const mail = {
    from: "Inhaus Living <no-reply@inhausliving.com.au>",
    to: email,
    subject: "Reminder: Your showroom visit tomorrow",
    html: `
      
<div style="font-family:Arial;padding:30px;background:#f4f4f4;">

<table width="600" align="center" style="background:#fff;border-radius:10px;padding:30px;">

<tr>
<td>

<h2>Hi ${firstName},</h2>

<p>This is a reminder that your showroom visit is scheduled for tomorrow.</p>

<hr/>

<p><strong>Showroom:</strong> ${showroomLabel}</p>
<p><strong>Date:</strong> ${visit_day}</p>
<p><strong>Time:</strong> ${visit_time}</p>

<hr/>

<p>Please confirm if you will attend:</p>

<br/>

<a href="${confirmUrl}" 
style="background:#28a745;color:#fff;padding:12px 20px;border-radius:6px;text-decoration:none;">
Confirm Attendance
</a>

<br/><br/>

<a href="${cancelUrl}" 
style="color:#dc3545;text-decoration:none;">
Cancel Booking
</a>

<br/><br/>

<p style="font-size:12px;color:#777;">
If you need to reschedule, please cancel and book a new time.
</p>

</td>
</tr>

</table>

</div>
`,
  };

  try {
    await resend.emails.send(mail);
  } catch (error) {
    console.error("Reminder email error:", error);
  }
};