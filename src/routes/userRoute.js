import { Router } from "express";
import passport from "passport";
import getnewToken from "../middlewares/getnewToken.js";
import {
  useremailverifyController,
  userregisterController,
  usernumberverifyController,
  userloginController,
  userprofileController,
  userlogoutController,
  userpasswordChangeController,
  userResetpasswordController,
} from "../controllers/root.js";

const userRoutes = Router();

// Public Routes

userRoutes.route("/register").post(userregisterController);
userRoutes.route("/email-verify").post(useremailverifyController);
userRoutes.route("/number-verify").post(usernumberverifyController);
userRoutes.route("/user-login").post(userloginController);
userRoutes.route("/user-logout").post(userlogoutController);
userRoutes.route("/user-passwordreset/:id/:token").post(userResetpasswordController);

// Protected Routes
userRoutes
  .route("/user-profile")
  .post(
    getnewToken,
    passport.authenticate("jwt", { session: false }),
    userprofileController
  );
userRoutes
  .route("/user-passwordChange")
  .post(
    getnewToken,
    passport.authenticate("jwt", { session: false }),
    userpasswordChangeController
  );
export { userRoutes };
