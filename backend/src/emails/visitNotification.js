import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVisitNotification = async (data) => {
  const {
    full_name,
    email,
    mobile,
    service,
    visit_day,
    visit_time,
    showroom,
  } = data;

  const sender = "Inhaus Living <no-reply@inhausliving.com.au>";
  const yourEmail = "ellen@inhausliving.com.au";

  const showroomLabel =
    showroom === "mp" ? "Moore Park" : "Taren Point";

  const mail = {
    from: sender,
    to: yourEmail,
    reply_to: email,
    subject: `📅 New Showroom Booking - ${showroomLabel}`,
    html: `
    
<div style="font-family:Arial;padding:30px;background:#f4f4f4;">

<table width="600" align="center" style="background:#fff;border-radius:10px;padding:30px;">

<tr>
<td>

<h2 style="margin-top:0;">
New Showroom Booking
</h2>

<hr/>

<h3>Customer Details</h3>

<p><strong>Name:</strong> ${full_name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Mobile:</strong> ${mobile || "Not provided"}</p>

<hr/>

<h3>Booking Details</h3>

<p><strong>Showroom:</strong> ${showroomLabel}</p>
<p><strong>Service:</strong> ${service}</p>
<p><strong>Date:</strong> ${visit_day}</p>
<p><strong>Time:</strong> ${visit_time}</p>

</td>
</tr>

</table>

</div>
`,
  };

  try {
    await resend.emails.send(mail);
  } catch (error) {
    console.error("Visit email error:", error);
  }
};