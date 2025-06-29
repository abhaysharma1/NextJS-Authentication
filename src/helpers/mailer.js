import nodemailer from "nodemailer";
import User from "@/models/userModels";
import bcryptjs from "bcryptjs";
import crypto from "crypto";

export const sendEmail = async ({ email, emailType, userId }) => {
  try {
    // const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    const hashedToken = crypto.randomBytes(32).toString("hex");
    console.log(hashedToken);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordExpiry: Date.now() + 3600000,
      });
    }
    var transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.NODE_MAILER_ID,
        pass: process.env.NODE_MAILER_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.MY_EMAIL_ID,
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password",
      html: `<p> Click <a href="${
        process.env.DOMAIN
      }/${emailType === "VERIFY" ? "verifyemail" : "resetpassword"}?token=${hashedToken}">Here</a> to ${
        emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password"
      } </p>`,
    });

    return info;
  } catch (error) {
    throw new Error(error.message);
  }
};
