import { appconfig } from "../../config/appconfig.js";
import transporter from "../../config/mailconfig.js";
import UserModel from "../../models/user_models/usermodel.js";
import jsonwebtoken from "jsonwebtoken";

const userResetpasswordController = async (req, res) => {
  try {
    const { email } = req.body;
    const RegisteredUser = await UserModel.findOne({ email });
    if (!RegisteredUser) {
      return res.status(500).json({
        status: "failed",
        message: `User is not registered`,
      });
    }

    // Generate Token for password Reset

    const SecretKey = appconfig.REFRESH_TOKEN_KEY + RegisteredUser._id;

    const token = jsonwebtoken.sign({ userId: RegisteredUser._id }, SecretKey, {
      expiresIn: "10m",
    });

    // Generating Link

    const passwordresetLink = `${appconfig.APP_BASE_URL}/account/reset-password/${RegisteredUser._id}/${token}`;

    // Sending Mail
    const mailoptions = {
      from: appconfig.EMAIL_FROM,
      to: email,
      subject: "Reset password", // Subject line
      html: `<html>
                  <body>
                      <h1>Dear ${RegisteredUser.fullname},</h1>
                      <p>This is your password reset link:
                      <a href="${passwordresetLink}"> <h1>CLICK HERE</h1> </a>
                      Link valid for 10 minutes.</p>
                  </body>
               </html>`,
    };

    transporter.sendMail(mailoptions, (err) => {
      if (err) {
        console.error("Error occurred while sending email:", err);
        return;
      }
    });

    res.status(200).json({
      status: "success",
      message: `Eamil sent succesfully`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failed",
      message: `Failed to reset password`,
    });
  }
};

export default userResetpasswordController;
