import cron from "node-cron";
import { Resend } from "resend";
import dotenv from "dotenv";

import { subscribers, sequence } from "../services/newsletterSequence.service.js";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

const sender = "Inhaus Living <no-reply@inhausliving.com.au>";

const THREE_WEEKS = 21 * 24 * 60 * 60 * 1000;

/*
  roda todo dia 9:00
*/
cron.schedule("0 9 * * *", async () => {

  const now = new Date();

  for (const user of subscribers) {

    if (user.step >= sequence.length) continue;

    const diff = now - new Date(user.lastEmailSentAt);

    if (diff >= THREE_WEEKS) {

      const template = sequence[user.step];

      try {

        await resend.emails.send({
          from: sender,
          to: user.email,
          subject: "Inhaus Living Guide",
          html: template(user.firstName),
        });

        user.step += 1;
        user.lastEmailSentAt = new Date();

      } catch (error) {
        console.error("Newsletter send error:", error);
      }
    }
  }

});