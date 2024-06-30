import { appconfig } from "../config/appconfig.js";
import transporter from "../config/mailconfig.js";
import useremailVerifymodel from "../models/user_models/useremailVerifiymodel.js";

const sendEmailverificationOtp = async (newUser) => {
  try {
    const OTP = Math.floor(1000 + Math.random() * 9000);

    await useremailVerifymodel.create({ userId: newUser._id, otp: OTP });

    console.log(newUser);

    const mailoptions = {
      from: appconfig.EMAIL_FROM,
      to: newUser.email,
      subject: "OTP - Verify your account", // Subject line
      html: `<h2>Dear ${newUser.fullname},</h2>
             <p>Thank you for registering on AMS </p>
            <h1>OTP : ${OTP}</h1>
            <p>This OTP is valid for 10 minutes.</p>`,
    };

    transporter.sendMail(mailoptions, (err, info) => {
      if (err) {
        console.error("Error occurred while sending email:", err);
        return;
      }
      console.log("Email sent successfully:", info);
    });

    return OTP;
  } catch (error) {
    console.log(error);
  }
};

export default sendEmailverificationOtp;
