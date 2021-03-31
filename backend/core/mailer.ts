import nodemailer from "nodemailer";

const options = {
  host: process.env.NODEMAILER_HOST || "smtp.mailtrap.io",
  port: Number(process.env.MODEMAILER_PORT) || 2525,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
};


const transporter = nodemailer.createTransport(options);

export default transporter;