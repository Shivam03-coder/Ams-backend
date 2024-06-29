import userTokenmodel from "../models/user_models/userTokenmodel.js";
import generateTokens from "./generateTokens.js";

const checkandSetnewToken = async (res, oldrefreshToken) => {
  try {
    const Authenticateduser = await userTokenmodel.findOne({
      refreshToken: oldrefreshToken,
    });

    if (!Authenticateduser) {
      return res.status(409).json({
        status: "failed",
        message: "Unauthorized user!",
      });
    }

    const Tokendetails = await Authenticateduser.checkToken(oldrefreshToken);

    if (!Tokendetails) {
      return res.status(409).json({
        status: "failed",
        message: "Invalid Token Plase login again!",
      });
    }

    const { accessToken, refreshToken } = await generateTokens(
      Tokendetails._id
    );

    const newTokens = {
      newaccessToken: accessToken,
      newrefreshToken: refreshToken,
    };

    const { newaccessToken, newrefreshToken } = newTokens;

    return { newaccessToken, newrefreshToken };
  } catch (error) {
    console.log(error);
  }
};

export default checkandSetnewToken;
