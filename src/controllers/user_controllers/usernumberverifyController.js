import UserModel from "../../models/user_models/usermodel.js";
import usernumberVerifymodel from "../../models/user_models/usernumberVerifymodel.js";
import sendNumberverificationOtp from "../../utils/sendNumberverificationOtp.js";

const usernumberverifyController = async (req, res) => {
  try {
    const { phonenumber, otp } = req.body;

    const existingUser = await UserModel.findOne({ phonenumber });

    if (!existingUser) {
      return res.status(405).json({
        status: "failed",
        message: "Phone number is not registered !",
      });
    }

    if (existingUser.isphoneNoVerified) {
      return res.status(405).json({
        status: "failed",
        message: "Phone number is already verified !",
      });
    }

    const contactVerification = await usernumberVerifymodel.find({
      userId: existingUser._id,
      otp,
    });

    if (!contactVerification) {
      await sendNumberverificationOtp(existingUser);
      return res.status(400).json({
        status: "failed",
        message: `Invalid otp! New otp sent to your number `,
      });
    }

    const currentTime = new Date();
    const expireTime = new Date(
      contactVerification.createdAt?.getTime() + 15 * 60 * 1000
    );

    if (currentTime > expireTime) {
      await sendNumberverificationOtp(existingUser);
      return res.status(400).json({
        status: "failed",
        message: `Otp expired! New otp sent to your number `,
      });
    }

    existingUser.isphoneNoVerified = true;
    await existingUser.save();

    // Delete conatct verification docs

    await usernumberVerifymodel.deleteMany({ userId: existingUser._id, otp });

    return res.status(200).json({
      status: "success",
      message: "Phone number verification successfull !",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failed",
      message: `Unable to verify your Phone number ! Plaese try again later : ${error}`,
    });
  }
};

export default usernumberverifyController;
