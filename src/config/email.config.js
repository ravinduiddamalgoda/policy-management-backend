if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

"use strict";
const nodemailer = require("nodemailer");

const smtp = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_KEY,
  },
});

module.exports = smtp;