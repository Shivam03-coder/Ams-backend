import mongoose from "mongoose";

const usernumberVerifySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: "15m",
  },
});

const usernumberVerifymodel = mongoose.model(
  "Contactverification",
  usernumberVerifySchema
);

export default usernumberVerifymodel;
