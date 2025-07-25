import express from "express";
import router from "./routes/api.ts";
import bodyParser from "body-parser";
import { PORT } from "./utils/env.ts";

import connectDB from "./utils/database.ts";

async function init() {
    try {
       const resultDb = await connectDB();
       console.log("Database status", resultDb);
        const app = express();
        const port = PORT;
        
        app.use(bodyParser.json());
        app.use("/api", router);
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.log(error);
    }
}



init();