import UserModel from "../../models/user_models/usermodel.js";
import generateTokens from "../../utils/generateTokens.js";
import setTokenscookies from "../../utils/setTokenscookies.js";

const userloginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      res.status(404).json({
        status: "failed",
        message: `Invalid 123 email or password`,
      });
    }

    const isMatchpassword = await user.isPasswordcorrect(password);

    if (!isMatchpassword) {
      return res.status(401).json({
        status: "failed",
        message: `Invalid  user email and password`,
      });
    }

    // GENERATE TOKENS

    const { accessToken, refreshToken } = await generateTokens(user._id);

    // set isAuthenticated true

    user.isAuthenticated = true;
    await user.save();

    // Send cookies

    setTokenscookies(res, accessToken, refreshToken);

    // Response after user successfully login

    res.status(200).json({
      status: "success",
      user: {
        id: user._id,
        name: user.fullname,
        email: user.email,
      },
      isAuthenticated: user.isAuthenticated,
      roles: user.roles[0],
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: `Unable to login ! : ${error}`,
    });
  }
};

export default userloginController;
