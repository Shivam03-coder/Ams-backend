import { vonage } from "../config/vonageconfig.js";
import usernumberVerifymodel from "../models/user_models/usernumberVerifymodel.js";

const sendNumberverificationOtp = async (newUser) => {
  try {
    const OTP = Math.floor(1000 + Math.random() * 9000);

    await usernumberVerifymodel.create({ userId: newUser._id, otp: OTP });

    const from = "Vonage APIs";
    const to = `91${newUser.phonenumber}`;
    const text = `OTP : ${OTP} for AMS verification`;

    async function sendSMS() {
      await vonage.sms
        .send({ to, from, text })
        .then((resp) => {
          console.log("OTP sent successfully");
          console.log(resp);
        })
        .catch((err) => {
          console.log("There was an error sending the OTP.");
          console.error(err);
        });
    }

    sendSMS();

    return OTP;
  } catch (error) {
    console.log(error);
  }
};

export default sendNumberverificationOtp;
