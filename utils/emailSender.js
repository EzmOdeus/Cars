const nodemailer = require("nodemailer");

const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail", // يمكنك تغيير هذا بناءً على الخدمة المستخدمة
      auth: {
        user: process.env.EMAIL_USER, // بريدك الإلكتروني
        pass: process.env.EMAIL_PASS, // كلمة مرور التطبيق
      },
    });

    const mailOptions = {
      from: `"cars" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", info.response);
  } catch (error) {
    console.error("Error sending email: ", error);
  }
};


module.exports = sendEmail;
