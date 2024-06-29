import checkandSetToken from "../utils/checkandSetnewToken.js";
import checkexpiredToken from "../utils/checkexpiredToken.js";
import setTokenscookies from "../utils/setTokenscookies.js";

const getnewToken = async (req, res, next) => {
  try {
    const { refreshToken, accessToken } = req.cookies;

    if (accessToken || !checkexpiredToken(accessToken)) {
      req.headers["authorization"] = `Bearer ${accessToken}`;
    }
    if (!accessToken || checkexpiredToken(accessToken)) {
      if (!refreshToken) {
        throw new Error("Plase login again");
      }

      const { newaccessToken, newrefreshToken } = await checkandSetToken(
        res,
        refreshToken
      );

      req.headers["authorization"] = `Bearer ${newaccessToken}`;

      setTokenscookies(res, newaccessToken, newrefreshToken);
    }

    next();
  } catch (error) {
    console.log("ERROR ADDING ACESS TOKEN IN HEADER");
  }
};

export default getnewToken;
