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

  const sender =
    process.env.RESEND_SENDER ||
    "Inhaus Living <no-reply@inhausliving.com.au>";

  // EMAIL DE TESTE PARA O TIME
  const teamEmail = "ellen@inhausliving.com.au";

  /* ===============================
     EMAIL PREMIUM PARA CLIENTE
  =============================== */

  const confirmationMail = {
    from: sender,
    to: email,
    subject: "Your request has been received – Inhaus Living",
    html: `
    <div style="background:#f4f4f4;padding:40px 0;font-family:Arial,Helvetica,sans-serif;">

      <table width="100%">
        <tr>
          <td align="center">

            <table width="600" style="background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.08);">

              <tr>
                <td style="background:#111;color:#fff;padding:30px;text-align:center;">
                  <h1 style="margin:0;">Inhaus Living</h1>
                  <p style="margin:6px 0 0;color:#ccc;">
                    Premium Curtains & Blinds
                  </p>
                </td>
              </tr>

              <tr>
                <td style="padding:40px;color:#333;">
                  <h2>Hi ${firstName},</h2>

                  <p>
                  Thank you for contacting <strong>Inhaus Living</strong>.
                  Your request has been received and our team will review it shortly.
                  </p>

                  <p>
                  One of our specialists will contact you soon to discuss your project.
                  </p>
                </td>
              </tr>

              <tr>
                <td style="padding:0 40px 30px 40px;">

                  <table width="100%" style="border:1px solid #eee;border-radius:8px;padding:20px;">
                    <tr>
                      <td colspan="2"><strong>Request Summary</strong></td>
                    </tr>

                    <tr>
                      <td style="color:#777;">Service</td>
                      <td>${service}</td>
                    </tr>

                    <tr>
                      <td style="color:#777;">Budget</td>
                      <td>${budget}</td>
                    </tr>

                    <tr>
                      <td style="color:#777;">Address</td>
                      <td>${address}</td>
                    </tr>

                    <tr>
                      <td style="color:#777;">Mobile</td>
                      <td>${mobile}</td>
                    </tr>

                    <tr>
                      <td style="color:#777;">Installation Date</td>
                      <td>${safeInstallationDate}</td>
                    </tr>
                  </table>

                </td>
              </tr>

              ${
                safeMessage
                  ? `
                <tr>
                  <td style="padding:0 40px 30px 40px;">
                    <strong>Your message</strong>
                    <div style="background:#fafafa;border-left:4px solid #111;padding:15px;margin-top:10px;">
                      ${safeMessage}
                    </div>
                  </td>
                </tr>
              `
                  : ""
              }

              <tr>
                <td align="center" style="padding:30px;">
                  <a href="https://www.inhausliving.com.au"
                    style="background:#111;color:#fff;padding:14px 28px;border-radius:6px;text-decoration:none;">
                    Visit Our Website
                  </a>
                </td>
              </tr>

              <tr>
                <td style="background:#fafafa;padding:25px;text-align:center;font-size:12px;color:#777;">
                  <strong>Inhaus Living</strong><br/>
                  Premium Curtains & Blinds in Australia<br/><br/>
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
     EMAIL PREMIUM PARA O TIME
  =============================== */

  const teamMail = {
    from: sender,
    to: teamEmail,
    subject: `🔥 New Lead: ${fullName}`,
    html: `
    <div style="font-family:Arial;padding:30px;background:#f4f4f4;">

      <table width="600" align="center" style="background:#fff;border-radius:10px;padding:30px;">

        <tr>
          <td>

            <h2 style="margin-top:0;">
              🚀 New Lead Received
            </h2>

            <p>
              A new lead has been submitted on the website.
            </p>

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
                <div style="background:#fafafa;padding:15px;border-left:4px solid #111;">
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