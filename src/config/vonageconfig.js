import { Vonage } from "@vonage/server-sdk";
import { appconfig } from "./appconfig.js";

const vonage = new Vonage({
  apiKey: appconfig.VONAGE_API_KEY,
  apiSecret: appconfig.VONAGE_API_SECRET,
});

export { vonage };
