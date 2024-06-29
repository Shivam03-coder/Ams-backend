import useremailVerifymodel from "../../models/user_models/useremailVerifiymodel.js";
import sendEmailverificationOtp from "../../utils/sendEmailverificationOtp.js";
import sendNumberverificationOtp from "../../utils/sendNumberverificationOtp.js";

const useremailverifyController = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const userexisting = await UserModel.findOne({ email });

    if (!userexisting) {
      return res.status(405).json({
        status: "failed",
        message: "Email is not registered !",
      });
    }

    if (userexisting.isemailVerified) {
      return res.status(405).json({
        status: "failed",
        message: "Email is already verified !",
      });
    }

    const emailverifiaction = await useremailVerifymodel.findOne({
      userId: userexisting._id,
      otp,
    });

    if (!emailverifiaction) {
      await sendEmailverificationOtp(userexisting);
      return res.status(400).json({
        status: "failed",
        message: `Invalid otp! New otp sent to your mail `,
      });
    }

    const currentTime = new Date();
    const expireTime = new Date(
      emailverifiaction.createdAt.getTime() + 15 * 60 * 1000
    );

    if (currentTime > expireTime) {
      await sendEmailverificationOtp(userexisting);
      return res.status(400).json({
        status: "failed",
        message: `Otp expired! New otp sent to your mail `,
      });
    }

    // OTP IS CORRECT

    userexisting.isemailVerified = true;
    await userexisting.save();

    // Delete mail verification docs

    await useremailVerifymodel.deleteMany({ userId: userexisting._id, otp });

    // SEND OTP FOR NUMBER VERIFICATION AFTER EMAIL VERIFIED SUCCESSFULLY

    if (userexisting.isemailVerified) {
      sendNumberverificationOtp(userexisting);
    }

    return res.status(200).json({
      status: "success",
      message: "Email verification successfull !",
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: `Unable to verify your email ! Plaese try again later : ${error}`,
    });
  }
};

export default useremailverifyController;
