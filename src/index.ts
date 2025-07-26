import express from "express";
import router from "./routes/api";
import bodyParser from "body-parser";
import { PORT } from "./utils/env";
import cors from "cors";
import connectDB from "./utils/database";

async function init() {
    try {
        const app = express();
        const port = PORT;
        
        app.use(cors());
        app.use(bodyParser.json());
        app.use("/api", router);
        
        // Try to connect to database
        try {
            const resultDb = await connectDB();
            console.log("Database status:", resultDb);
        } catch (dbError) {
            console.log("⚠️  Server starting without database connection");
            console.log("Database error:", dbError);
        }
        
        // Try to setup docs if available
        try {
            const docs = await import("./docs/route");
            docs.default(app);
            console.log("📖 API Documentation available at /docs");
        } catch (docsError) {
            console.log("⚠️  API Documentation not available - run 'npm run docs' first");
        }
        
        app.listen(port, () => {
            console.log(`🚀 Server is running on port ${port}`);
        });
        
        app.use("/", (req, res) => {
            res.send("Hello World - Event Sale API");
        });
    } catch (error) {
        console.error("❌ Server startup failed:", error);
    }
}

init();