import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SERVER_MAIL,
  port: 2525,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export default transporter;
