import * as nodemailer from "nodemailer";

const { SMTP_EMAIL, SMTP_APP_PSWD } = process.env;

const emailTransporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  secure: false,
  auth: {
    user: SMTP_EMAIL,
    pass: SMTP_APP_PSWD,
  },
});

export default emailTransporter;
