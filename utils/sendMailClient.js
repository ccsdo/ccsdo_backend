const nodemailer = require("nodemailer");
const path = require("path");

const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 465, // SSL port
  secure: true,
  auth: {
    user: process.env.SEND_MAIL,
    pass: process.env.SEND_MAIL_PASSWORD,
  },
});

async function mailtoClient(subject, text, recipient,name) {
  try {
    console.log("mail sending to",recipient)
    
    const pdfPath = path.join(__dirname, "../slip", `${name}.pdf`);
    const mailOptions = {
  from: `"Crime Control & Social Development Organisation" <${process.env.SEND_MAIL}>`,
  to: recipient,
  bcc: process.env.SEND_MAIL,
  subject: subject,
  html: text,
};

// Add attachment only when pdfPath is available
if (name != null) {
  mailOptions.attachments = [
    {
      filename: path.basename(pdfPath),
      path: pdfPath,
      contentType: "application/pdf",
    }
  ];
}
transporter.sendMail(mailOptions);
    console.log("pdf sent")
  } catch (error) {
    console.error(error);
    return false;
  }
}
module.exports = mailtoClient;