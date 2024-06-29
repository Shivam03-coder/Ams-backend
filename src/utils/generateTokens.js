import userTokenmodel from "../models/user_models/userTokenmodel.js";
import UserModel from "../models/user_models/usermodel.js";

const generateTokens = async (userid) => {
  try {
    const user = await UserModel.findById(userid);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();


  
    const userefreshToken = await userTokenmodel.findById(user._id);
    
    // Delete older refreshToken
    
    if (userefreshToken) {
      await userefreshToken.findOneAndDelete({ userId: user._id });
    }

    // Save new Refresh Token

    await userTokenmodel.create({
      userId: user._id,
      refreshToken,
    });

    return { accessToken, refreshToken };
  } catch (error) {
    console.log(error);
  }
};

export default generateTokens;
