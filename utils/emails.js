const nodeMailer = require('nodemailer');
const config = require('config');

const Constants = require('../utils/constants/constants');

const transporter = nodeMailer.createTransport({
  host: config.emailHost,
  port: config.emailPort,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

exports.sendEmail = async (to, subject, text, html) => {
  const emailInfo = transporter.sendMail({
    from: Constants.FROM_EMAIL,
    to,
    subject,
    text,
    html,
  });

  // TODO research on it and display proper message
  console.log('Email sent to ', emailInfo.messageId);
};
