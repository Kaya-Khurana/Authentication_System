import nodemailer from "nodemailer";
import User from "@/models/userModels";
import crypto from "crypto"; // Add this import

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // Generate a random token instead of using bcrypt
    const token = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: new Date(Date.now() + 3600000), // 1 hour
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: new Date(Date.now() + 3600000), // 1 hour
      });
    }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "bcc9c8fc83b7db",
        pass: "3a224554c13191",
      },
    });

    const mailOptions = {
      from: "Kaya@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${process.env.DOMAIN}/${
        emailType === "VERIFY" ? "verifyemail" : "resetpassword"
      }?token=${token}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }.<br/>Or copy and paste this link: ${process.env.DOMAIN}/${
        emailType === "VERIFY" ? "verifyemail" : "resetpassword"
      }?token=${token}</p>`,
    };

    const mailresponse = await transport.sendMail(mailOptions);
    return mailresponse;
  } catch (error: any) {
    console.error("Mailer Error:", error);
    throw new Error(error.message);
  }
};
