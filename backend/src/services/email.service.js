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

  /* EMAIL DO TIME (TESTE) */
  const teamEmail = "ellen@inhausliving.com.au";

  /* ===============================
     EMAIL DO CLIENTE
  =============================== */

  const confirmationMail = {
    from: sender,
    to: email,
    reply_to: "info@inhausliving.com.au",
    subject: "Your request has been received – Inhaus Living",
    html: `
    
<div style="background:#ffffff;padding:40px 20px;font-family:Arial,Helvetica,sans-serif;color:#000;">

<table width="100%" align="center">
<tr>
<td align="center">

<table width="600" style="max-width:600px">

<tr>
<td align="center" style="padding-bottom:30px;">
<img 
src="https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/Logo%20(4).png?tr=w-400,f-webp"
width="160"
style="display:block"
/>
</td>
</tr>

<tr>
<td style="padding-bottom:20px;">
<h2 style="
font-size:26px;
font-weight:400;
margin:0;
text-align:center;
">
Thank you for contacting us
</h2>
</td>
</tr>

<tr>
<td style="font-size:15px;line-height:1.7;padding-bottom:30px;text-align:center">

Hi ${firstName},<br/><br/>

We’ve received your request and our team will review the details shortly.

One of our specialists will contact you soon to discuss your project.

</td>
</tr>

<tr>
<td style="padding-bottom:30px">

<table width="100%" style="
border:1px solid #eee;
border-radius:8px;
padding:25px;
">

<tr>
<td colspan="2" style="padding-bottom:15px;font-weight:600">
Request Summary
</td>
</tr>

<tr>
<td style="color:#777;padding:6px 0">Service</td>
<td>${service}</td>
</tr>

<tr>
<td style="color:#777;padding:6px 0">Budget</td>
<td>${budget}</td>
</tr>

<tr>
<td style="color:#777;padding:6px 0">Address</td>
<td>${address}</td>
</tr>

<tr>
<td style="color:#777;padding:6px 0">Mobile</td>
<td>${mobile}</td>
</tr>

<tr>
<td style="color:#777;padding:6px 0">Installation Date</td>
<td>${safeInstallationDate}</td>
</tr>

</table>

</td>
</tr>

${
  safeMessage
    ? `
<tr>
<td style="padding-bottom:30px">
<div style="
border-left:3px solid #F67C0B;
padding:15px;
background:#fafafa;
font-size:14px;
">
${safeMessage}
</div>
</td>
</tr>
`
    : ""
}

<tr>
<td align="center" style="padding-bottom:40px">

<a href="https://www.inhausliving.com.au"
style="
background:#F67C0B;
color:#fff;
padding:14px 30px;
border-radius:4px;
font-size:14px;
text-decoration:none;
display:inline-block;
">
Visit our website
</a>

</td>
</tr>

<tr>
<td style="
font-size:12px;
color:#777;
text-align:center;
border-top:1px solid #eee;
padding-top:20px;
">

Inhaus Living<br/>
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
    to: teamEmail,
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