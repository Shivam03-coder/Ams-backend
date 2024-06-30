import nodemailer  from "nodemailer";
import { appconfig } from "./appconfig.js";

const transporter = nodemailer.createTransport({
  host: appconfig.EMAIL_HOST,
  port: appconfig.EMAIL_PORT,
  secure: false,
  auth: {
    user: appconfig.EMAIL_USER,
    pass: appconfig.EMAIL_PASS,
  },
});

export default transporter;
