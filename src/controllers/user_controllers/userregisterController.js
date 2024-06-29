import UserModel from "../../models/user_models/usermodel.js";
import sendEmailverificationOtp from "../../utils/sendEmailverificationOtp.js";

const userregisterController = async (req, res) => {
  try {
    const { fullname, phonenumber, email, password } = req.body;

    // CHECKING EXISTING USER

    const existingUser = await UserModel.findOne({
      $or: [{ phonenumber }, { email }],
    });

    if (existingUser) {
      return res.status(409).json({
        status: "failed",
        message: "Email alreday registered !",
      });
    }

    const createdUser = await UserModel.create({
      fullname,
      phonenumber,
      email,
      password,
    });

    sendEmailverificationOtp(createdUser);

    const newUser = await UserModel.findById(createdUser._id).select(
      "-password -createdAt -updatedAt -__v"
    );

    return res.status(200).json({
      status: "success",
      message: "Registeration successfull !",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: `Unable to register ! : ${error}`,
    });
  }
};

export default userregisterController;
