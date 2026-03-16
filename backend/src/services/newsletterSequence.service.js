import dotenv from "dotenv";
import { Resend } from "resend";

import { welcomeEmail } from "../emails/welcomeEmail.js";
import { renovationTipsEmail } from "../emails/renovationTips.js";
import { designClarityEmail } from "../emails/designClarityEmail.js";
import { renovationChecklistEmail } from "../emails/renovationChecklistEmail.js";
import { budgetTransparencyEmail } from "../emails/budgetTransparencyEmail.js";
import { renovationTimelineEmail } from "../emails/renovationTimelineEmail.js";
import { projectStoryEmail } from "../emails/projectStoryEmail.js";
import { designBuildEmail } from "../emails/designBuildEmail.js";
import { timelessDesignEmail } from "../emails/timelessDesignEmail.js";
import { consultationInviteEmail } from "../emails/consultationInviteEmail.js";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

/*
  subscribers temporário
  (depois pode virar DB)
*/
export const subscribers = [];

/*
  sequência de emails
*/
export const sequence = [
  renovationTipsEmail,
  designClarityEmail,
  renovationChecklistEmail,
  budgetTransparencyEmail,
  renovationTimelineEmail,
  projectStoryEmail,
  designBuildEmail,
  timelessDesignEmail,
  consultationInviteEmail,
];

const sender = "Inhaus Living <no-reply@inhausliving.com.au>";

export const subscribeUser = async (email, firstName) => {

  const subscriber = {
    email,
    firstName,
    step: 0,
    subscribedAt: new Date(),
    lastEmailSentAt: new Date(),
  };

  subscribers.push(subscriber);

  await resend.emails.send({
    from: sender,
    to: email,
    subject: "Welcome to Inhaus Living",
    html: welcomeEmail(firstName),
  });
};