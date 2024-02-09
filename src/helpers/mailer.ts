import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";

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
    const hashedToken = await bcrypt.hash(userId.toString(), 10);

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
    const encodedLink = encodeURIComponent(
      `${process.env.DOMAIN}/verifyEmail?token=${hashedToken}`
    );

    const htmlStructure =
      emailType === "VERIFICATION"
        ? ` 
        <div>
          <h1>
            Click
            <a href="${encodedLink}"}>here</a>
            to Verify your email
          </h1>
        </div>`
        : `
        <div>
          <h1>
            Click
            <a href="${process.env.DOMAIN}/forgetPassword/changePassword?token=${hashedToken}"}>here</a>
            to Reset your password
          </h1>
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
