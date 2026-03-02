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

  const safeInstallationDate = installationDate || "Not specified";
  const safeSubject = subject || null;
  const safeMessage = message || null;

  const adminMail = {
    from:
      process.env.RESEND_SENDER ||
      "Inhaus Living <info@inhausliving.com.au>",
    to: process.env.EMAIL_TO || "info@inhausliving.com.au",
    subject: `📬 New Lead: ${fullName}`,
    html: `
      <h2>New Lead Submission</h2>
      <p><strong>Name:</strong> ${fullName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Service:</strong> ${service}</p>
      <p><strong>Budget:</strong> ${budget}</p>
      <p><strong>Address:</strong> ${address}</p>
      <p><strong>Mobile:</strong> ${mobile}</p>
      <p><strong>Installation Date:</strong> ${safeInstallationDate}</p>
      ${safeSubject ? `<p><strong>Subject:</strong> ${safeSubject}</p>` : ""}
      ${
        safeMessage
          ? `<p><strong>Message:</strong></p><p>${safeMessage}</p>`
          : ""
      }
      <hr/>
      <p style="font-size:12px;color:#666;">
        Generated automatically from website.
      </p>
    `,
  };

  const confirmationMail = {
    from:
      process.env.RESEND_SENDER ||
      "Inhaus Living <info@inhausliving.com.au>",
    to: email,
    subject: "We received your request!",
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.6;">
        <h2>Hi ${fullName?.split(" ")[0] || ""},</h2>

        <p>
          Thank you for contacting <strong>Inhaus Living</strong>.
          Our team has received your request and will contact you shortly.
        </p>

        <h3>Summary:</h3>
        <ul>
          <li><strong>Service:</strong> ${service}</li>
          <li><strong>Budget:</strong> ${budget}</li>
          <li><strong>Address:</strong> ${address}</li>
          <li><strong>Mobile:</strong> ${mobile}</li>
          <li><strong>Installation Date:</strong> ${safeInstallationDate}</li>
        </ul>

        ${
          safeMessage
            ? `
          <p><strong>Your message:</strong></p>
          <blockquote>${safeMessage}</blockquote>
        `
            : ""
        }

        <p>
          We look forward to helping you transform your space.
        </p>

        <br/>
        <strong>Inhaus Living Team</strong><br/>
        www.inhausliving.com.au
      </div>
    `,
  };

  try {
    await resend.emails.send(adminMail);
    await resend.emails.send(confirmationMail);
  } catch (error) {
    console.error("Email send error:", error);
  }
};