import UserModel from "../../models/user_models/usermodel.js";
import bcrypt, { genSalt } from "bcrypt";

const userpasswordChangeController = async (req, res) => {
  try {
    const { password } = req.body;
    const salt = await genSalt(10);
    const newHashedpassword = await bcrypt.hash(password, salt);
    console.log(newHashedpassword)

    await UserModel.findByIdAndUpdate(req.user._id, {
      $set: { password: newHashedpassword },
    });

    res.status(200).json({
      status: "sucess",
      message: "Password cahnged succesfully",
    });
  } catch (error) {
    res.status(200).json({
      status: "failed",
      message: "Password cahnging failed",
    });
  }
};

export default userpasswordChangeController;
