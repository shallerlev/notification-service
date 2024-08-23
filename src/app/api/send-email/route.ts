import * as nodemailer from "nodemailer";

import { getScheduledNotification } from "@/lib/db/queries/getScheduledNotification";

export const dynamic = "force-dynamic";

const { SMTP_EMAIL, SMTP_APP_PSWD } = process.env;

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  secure: false,
  auth: {
    user: SMTP_EMAIL,
    pass: SMTP_APP_PSWD,
  },
});

export async function GET() {
  const notification = await getScheduledNotification();

  if (!notification) {
    return new Response("No matching notifications to send", {
      status: 200,
    });
  }

  try {
    await transporter.sendMail({
      from: SMTP_EMAIL,
      to: notification.emails.join(", "),
      subject: "Your Notification",
      html: `<p>This is Lev. You’ve requested notifications about ${notification.searchQuery}.</p>`,
    });

    return new Response("Email sent successfully", {
      status: 200,
    });
  } catch (error) {
    console.error("Error sending email to:", notification.emails, error);
    return new Response("Error sending email", {
      status: 500,
    });
  }
}
