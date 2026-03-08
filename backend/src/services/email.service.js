import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendConfirmationEmail = async (formData) => {
  const {
    fullName,
    email,
    address,
    mobile,
    budget,
    service,
    installationDate,
    subject,
    message,
  } = formData;

  if (!email) return;

  const firstName = fullName?.split(" ")[0] || "";

  const safeInstallationDate = installationDate || "Not specified";
  const safeSubject = subject || null;
  const safeMessage = message || null;

  const sender = "Inhaus Living <no-reply@inhausliving.com.au>";

const teamEmails = [
  "info@inhausliving.com.au",
  "dora@inhausliving.com.au"
];

  /* ===============================
     EMAIL DO CLIENTE
  =============================== */

  const confirmationMail = {
    from: sender,
    to: email,
    reply_to: "info@inhausliving.com.au",
    subject: "We received your request!",
    html: `
    
<div style="background:#f5f5f5;padding:40px 0;font-family:Arial,sans-serif;">

<table width="100%">
<tr>
<td align="center">

<table width="600" style="background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 8px 30px rgba(0,0,0,0.08);">

<!-- HEADER -->
<tr>
<td style="background:#000;padding:35px;text-align:center;">
<img 
src="https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/Logo%20(4).png"
width="180"
style="display:block;margin:auto"
/>
</td>
</tr>

<!-- GREETING -->
<tr>
<td style="padding:40px 40px 20px 40px;color:#333;">

<h2 style="margin:0 0 10px 0;font-size:22px;">
Hi ${firstName},
</h2>

<p style="margin:0;font-size:15px;line-height:1.6;">
Thank you for contacting <strong>Inhaus Living</strong>.
Our team has received your request and will contact you shortly.
</p>

</td>
</tr>

<!-- SUMMARY -->
<tr>
<td style="padding:20px 40px;">

<table width="100%" style="border:1px solid #eee;border-radius:8px;padding:20px;">
<tr>
<td colspan="2" style="padding-bottom:10px;">
<strong style="font-size:16px;">Summary</strong>
</td>
</tr>

<tr>
<td style="padding:6px 0;color:#777;">Service</td>
<td>${service}</td>
</tr>

<tr>
<td style="padding:6px 0;color:#777;">Budget</td>
<td>${budget}</td>
</tr>

<tr>
<td style="padding:6px 0;color:#777;">Address</td>
<td>${address}</td>
</tr>

<tr>
<td style="padding:6px 0;color:#777;">Mobile</td>
<td>${mobile}</td>
</tr>

<tr>
<td style="padding:6px 0;color:#777;">Installation Date</td>
<td>${safeInstallationDate}</td>
</tr>

</table>

</td>
</tr>

${
  safeMessage
    ? `
<tr>
<td style="padding:0 40px 20px 40px;">
<p style="font-size:14px;color:#777;margin-bottom:5px;">
Your message
</p>

<div style="
background:#fafafa;
border-left:3px solid #F67C0B;
padding:15px;
border-radius:4px;
">
${safeMessage}
</div>
</td>
</tr>
`
    : ""
}

<!-- CTA -->
<tr>
<td align="center" style="padding:30px;">
<a href="https://www.inhausliving.com.au"
style="
background:#F67C0B;
color:#fff;
text-decoration:none;
padding:14px 28px;
border-radius:6px;
font-size:14px;
display:inline-block;
">
Visit Our Website
</a>
</td>
</tr>

<!-- FOOTER -->
<tr>
<td style="background:#fafafa;padding:25px;text-align:center;font-size:12px;color:#777;">
<strong>Inhaus Living</strong><br/>
www.inhausliving.com.au
</td>
</tr>

</table>

</td>
</tr>
</table>

</div>
`,
  };

  /* ===============================
     EMAIL DO TIME
  =============================== */

  const teamMail = {
    from: sender,
    to: teamEmails,
    reply_to: email,
    subject: `🔥 New Lead: ${fullName}`,
    html: `
    
<div style="font-family:Arial;padding:30px;background:#f4f4f4;">

<table width="600" align="center" style="background:#fff;border-radius:10px;padding:30px;">

<tr>
<td>

<h2 style="margin-top:0;">
New Lead Received
</h2>

<hr/>

<h3>Customer Details</h3>

<p><strong>Name:</strong> ${fullName}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Mobile:</strong> ${mobile}</p>
<p><strong>Address:</strong> ${address}</p>

<hr/>

<h3>Project Details</h3>

<p><strong>Service:</strong> ${service}</p>
<p><strong>Budget:</strong> ${budget}</p>
<p><strong>Installation Date:</strong> ${safeInstallationDate}</p>

${
  safeSubject
    ? `<p><strong>Subject:</strong> ${safeSubject}</p>`
    : ""
}

${
  safeMessage
    ? `
<p><strong>Message:</strong></p>
<div style="background:#fafafa;padding:15px;border-left:4px solid #F67C0B;">
${safeMessage}
</div>
`
    : ""
}

</td>
</tr>

</table>

</div>
`,
  };

  try {
    await resend.emails.send(confirmationMail);
    await resend.emails.send(teamMail);
  } catch (error) {
    console.error("Email send error:", error);
  }
};