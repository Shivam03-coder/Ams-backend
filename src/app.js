import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import "./config/passportjwtconfig.js";
import { passport } from "./config/passportjwtconfig.js";
import { appconfig } from "./config/appconfig.js";

const app = express();

app.use(express.json());
app.use(passport.initialize());
app.use(cookieParser());
app.use(
  cors({
    origin: appconfig.APP_BASE_URL,
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

import { userRoutes } from "./routes/userRoute.js";

app.use("/api/v1/ams", userRoutes);

export { app };
