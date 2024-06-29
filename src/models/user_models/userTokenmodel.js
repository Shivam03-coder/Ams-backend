import mongoose from "mongoose";
import JWT from "jsonwebtoken";
import { appconfig } from "../../config/appconfig.js";

const userTokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  refreshToken: {
    type: String,
    required: true,
  },
  blackListed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: "10d",
  },
});

userTokenSchema.methods.checkToken = function (oldrefreshtoken) {
  return JWT.verify(oldrefreshtoken, appconfig.REFRESH_TOKEN_KEY);
};

const userTokenmodel = mongoose.model("Usertokens", userTokenSchema);

export default userTokenmodel;
