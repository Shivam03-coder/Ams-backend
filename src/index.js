import { app } from "./app.js";
import { appconfig } from "./config/appconfig.js";
import { connectdb } from "./database/dbconnect.js";

(async () => {
  try {
    await connectdb();

    app.get("/", (_, res) => {
      res.status(200).json({
        status: "success",
      });
    });

    app.listen(appconfig.PORT, () => {
      console.log(
        `Server started at http://localhost:${appconfig.PORT || 3030}/`
      );
    });
  } catch (error) {
    console.log(error);
  }
})();
