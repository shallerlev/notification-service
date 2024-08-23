import { getScheduledNotification } from "@/lib/db/queries/getScheduledNotification";
import emailTransporter from "@/lib/utils/emailTransporter";

export const dynamic = "force-dynamic";

export async function GET() {
  const notification = await getScheduledNotification();

  if (!notification) {
    return new Response("No matching notifications to send", {
      status: 200,
    });
  }

  try {
    await emailTransporter.sendMail({
      from: process.env.SMTP_EMAIL,
      to: notification.emails.join(", "),
      subject: "Your Notification",
      html: `<p>Hello!<br /><br />This is Lev. You’ve requested notifications about ${notification.searchQuery}.<br /><br />Have a great day,<br />Lev </p>`,
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
