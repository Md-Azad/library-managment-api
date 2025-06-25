import mongoose from "mongoose";
import config from "./config";

async function server() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log("Server is connected with the database");
  } catch (error) {
    console.error(error);
  }
}
server();
