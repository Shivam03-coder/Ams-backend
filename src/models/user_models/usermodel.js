import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import { appconfig } from "../../config/appconfig.js";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      lowercase: true,
    },
    phonenumber: {
      type: Number,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    isemailVerified: {
      type: Boolean,
      default: false,
    },
    isphoneNoVerified: {
      type: Boolean,
      default: false,
    },
    isAuthenticated: {
      type: Boolean,
      default: false,
    },
    roles: {
      type: [String],
      enum: ["user", "admin"],
      default: ["user"],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.isPasswordcorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = async function () {
  return Jwt.sign(
    {
      _id: this._id,
      emial: this.email,
      roles: this.roles,
    },
    appconfig.ACCESS_TOKEN_KEY,
    {
      expiresIn: appconfig.ACCESS_TOKEN_EXP,
    }
  );
};
userSchema.methods.generateRefreshToken = async function () {
  return Jwt.sign(
    {
      _id: this._id,
      roles: this.roles,
    },
    appconfig.REFRESH_TOKEN_KEY,
    {
      expiresIn: appconfig.REFRESH_TOKEN_EXP,
    }
  );
};

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
