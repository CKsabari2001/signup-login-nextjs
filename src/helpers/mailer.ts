import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

interface SendEmail {
  email: string;
  emailType: string;
  userId: string;
}
export default async function sendEMail({
  email,
  emailType,
  userId,
}: SendEmail) {
  try {
    // Creating a Hash of the user ID
    const salt = await bcryptjs.genSalt(10);
    const hashedToken = await bcryptjs.hash(userId.toString(), salt);

    if (emailType === "VERIFICATION") {
      await User.findByIdAndUpdate(userId, {
        verificationToken: hashedToken,
        verificationExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "PASSWORD_RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordExpiry: Date.now() + 3600000,
      });
    }

    // Creating a Transporter for sending emails
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USERNAME,
        pass: process.env.MAILTRAP_PASSWORD,
      },
    });

    // Html Structure for the email based on emailType
    const htmlStructure =
      emailType === "VERIFICATION"
        ? ` 
        <div>
          <h1>
            Click
            <a href="${process.env.DOMAIN}/verifyEmail?token=${hashedToken}"}>here</a>
            to Verify your email
          </h1>
          <br />
          <br />
          <h2>Copy your Link Here</h2>
          <h3>${process.env.DOMAIN}/verifyEmail?token=${hashedToken}</h3>
        </div>`
        : `
        <div>
          <h1>
            Click
            <a href="${process.env.DOMAIN}/forgetPassword/changePassword?token=${hashedToken}"}>here</a>
            to Reset your password
          </h1>
          <br />
          <br />
          <h2>Copy your Link Here</h2>
          <h3>${process.env.DOMAIN}/forgetPassword/changePassword?token=${hashedToken}</h3>
        </div>
        `;

    const mailOptions = {
      from: "testemail@gmail.com",
      to: email,
      subject:
        emailType === "VERIFICATION"
          ? "Verify your email"
          : "Reset your password",
      html: htmlStructure,
    };

    // Sending an Email
    const mailResponse = await transport.sendMail(mailOptions);

    console.log("Message sent: %s", mailResponse.messageId);

    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
