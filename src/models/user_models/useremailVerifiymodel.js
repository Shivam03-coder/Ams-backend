import mongoose from "mongoose";

const useremailverifySchema = new mongoose.Schema({
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

const useremailVerifymodel = mongoose.model(
  "Emailverification",
  useremailverifySchema
);

export default useremailVerifymodel;
