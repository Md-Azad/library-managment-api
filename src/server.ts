import mongoose  from "mongoose";
import app from "./app"
import config from "./config";

async function server() {
    try {
        await mongoose.connect(config.database_url as string)
        console.log("Server is connected with the database");
        app.listen(config.port, ()=>{
            console.log(`library management server is running on ${config.port}`);
        })
    } catch (error) {
        console.error(error)
    }
}
server();


