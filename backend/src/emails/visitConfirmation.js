import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

function generateGoogleCalendarLink({ title, date, time }) {
  const start = `${date}T${time.replace(":", "")}00`;
  const end = `${date}T${time.replace(":", "")}00`;

  return `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    title
  )}&dates=${start}/${end}`;
}

export const sendVisitConfirmation = async (data) => {
  try {
    const {
      full_name,
      email,
      visit_day,
      visit_time,
      showroom,
      booking_id,
    } = data;

    const firstName = full_name.split(" ")[0];

    const showroomLabel =
      showroom === "mp" ? "Moore Park" : "Taren Point";

    const cancelUrl = `${process.env.API_URL}/api/cancel-booking?id=${booking_id}`;

    const calendarLink = generateGoogleCalendarLink({
      title: "Inhaus Showroom Visit",
      date: visit_day,
      time: visit_time,
    });

    const mail = {
      from: "Inhaus Living <no-reply@inhausliving.com.au>",
      to: email,
      subject: "Your visit is confirmed",
      html: `
      
<div style="
background:#ffffff;
padding:40px 0;
font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif;
color:#111;
">

<table width="100%">
<tr>
<td align="center">

<table width="520" style="max-width:520px;">

<!-- LOGO -->
<tr>
<td style="padding-bottom:30px;">
<img 
src="https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/Logo%20(4).png"
width="140"
/>
</td>
</tr>

<!-- TITLE -->
<tr>
<td style="padding-bottom:10px;">
<h1 style="
font-size:26px;
font-weight:600;
margin:0;
letter-spacing:-0.3px;
">
Your visit is confirmed
</h1>
</td>
</tr>

<!-- TEXT -->
<tr>
<td style="padding-bottom:30px;">
<p style="
font-size:15px;
color:#555;
line-height:1.6;
margin:0;
">
Hi ${firstName}, your showroom visit has been scheduled.
</p>
</td>
</tr>

<!-- CARD -->
<tr>
<td style="
border:1px solid #eee;
border-radius:12px;
padding:20px;
margin-bottom:30px;
">

<table width="100%">

<tr>
<td style="color:#888;font-size:13px;padding-bottom:6px;">Showroom</td>
</tr>
<tr>
<td style="font-size:16px;font-weight:500;padding-bottom:14px;">
${showroomLabel}
</td>
</tr>

<tr>
<td style="color:#888;font-size:13px;padding-bottom:6px;">Date</td>
</tr>
<tr>
<td style="font-size:16px;font-weight:500;padding-bottom:14px;">
${visit_day}
</td>
</tr>

<tr>
<td style="color:#888;font-size:13px;padding-bottom:6px;">Time</td>
</tr>
<tr>
<td style="font-size:16px;font-weight:500;">
${visit_time}
</td>
</tr>

</table>

</td>
</tr>

<!-- CTA -->
<tr>
<td style="padding:25px 0 10px 0;">

<a href="${calendarLink}" 
style="
display:inline-block;
background:#111;
color:#fff;
padding:12px 22px;
border-radius:8px;
text-decoration:none;
font-size:14px;
">
Add to calendar
</a>

</td>
</tr>

<!-- CANCEL -->
<tr>
<td style="padding-top:20px;">
<a href="${cancelUrl}" 
style="
font-size:13px;
color:#999;
text-decoration:underline;
">
Cancel booking
</a>
</td>
</tr>

<!-- FOOTER -->
<tr>
<td style="
padding-top:40px;
font-size:12px;
color:#aaa;
">

Inhaus Living<br/>
inhausliving.com.au

</td>
</tr>

</table>

</td>
</tr>
</table>

</div>
`,
    };

    await resend.emails.send(mail);

  } catch (error) {
    console.error("CONFIRMATION EMAIL ERROR:", error);
  }
};