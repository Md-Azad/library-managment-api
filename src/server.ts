import mongoose from "mongoose";
import config from "./config";
import app from "./app";

async function server() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log("Server is connected with the database");
    app.listen(config.port, () => {
      console.log("server is running.");
    });
  } catch (error) {
    console.error(error);
  }
}
server();
