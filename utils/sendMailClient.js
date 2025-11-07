const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 465, // SSL port
  secure: true,
  auth: {
    user: process.env.SEND_MAIL,
    pass: process.env.SEND_MAIL_PASSWORD,
  },
});

async function mailtoClient(subject, text, recipient) {
  try {
    console.log("mail sending to",recipient)
    transporter.sendMail({
      from:`"Crime Control & Social Development Organisation" <${process.env.SEND_MAIL}>`,
      to: recipient,
      bcc: process.env.SEND_MAIL,
      subject: subject,
      html: text,
    });
  } catch (error) {
    console.error(error);
    return false;
  }
}
module.exports = mailtoClient;