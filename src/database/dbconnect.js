import mongoose from "mongoose";
import { appconfig } from "../config/appconfig.js";

const connectdb = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("Database connected successfully")
    );
    mongoose.connection.on("disconnected", () =>
      console.log("Oops! Databse disconnected")
    );
    await mongoose.connect(appconfig.URI);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export { connectdb };
