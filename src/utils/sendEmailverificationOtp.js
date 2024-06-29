import { appconfig } from "../config/appconfig.js";
import transporter from "../config/mailconfig.js";
import useremailVerifymodel from "../models/user_models/useremailVerifiymodel.js";

const sendEmailverificationOtp = async (newUser) => {
  try {
    const OTP = Math.floor(1000 + Math.random() * 9000);

    await useremailVerifymodel.create({ userId: newUser._id, otp: OTP });

    const otpVerificationLink = `${appconfig.APP_BASE_URL}/account/verify-email`;

    const mailoptions = {
      from: appconfig.EMAIL_FROM,
      to: newUser.email,
      subject: "OTP - Verify your account", // Subject line
      html: `<h2>Dear ${newUser.fullname},</h2>
             <p>Thank you for registering on AMS </p>
            <p>Use the following OTP to complete your verification process:${otpVerificationLink}</p>
            <h2>OTP : ${OTP}</h2>
            <p>This OTP is valid for 10 minutes.</p>`,
    };

    transporter.sendMail(mailoptions, (err) => {
      if (err) {
        return console.log(err);
      }
    });
    return OTP;
  } catch (error) {
    console.log(error);
  }
};

export default sendEmailverificationOtp;
