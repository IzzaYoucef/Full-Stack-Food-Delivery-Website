import "dotenv/config"
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { connectDb } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cardRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

// tell the developer right away if the .env file is missing or incomplete
const missingEnv = ["MONGODB_URI", "JWT_SECRET", "STRIPE_SECRET_KEY"].filter((k) => !process.env[k]);
if (missingEnv.length) {
    console.warn(`\n>>> Missing in backend/.env: ${missingEnv.join(", ")}  (copy backend/.env.example to backend/.env and fill it in)\n`);
}

// create an instance of the app
const app = express();

// middleware
app.use(express.json());
app.use(cors());

// routes that do not need the database
app.get("/", (req, res) => {
    res.send("API works")
})
app.get("/favicon.ico", (req, res) => res.status(204).end());

// Data Base Connection (cached, so it also works on serverless platforms like Vercel)
app.use(async (req, res, next) => {
    try {
        await connectDb();
        next();
    } catch (error) {
        res.status(500).json({ success: false, message: "Database connection failed: " + error.message });
    }
});

// food Routes
app.use("/api/food", foodRouter);
app.use("/images", express.static(path.join(path.dirname(fileURLToPath(import.meta.url)), "uploads")));

// User Routes
app.use("/api/user", userRouter);

// cart Routes
app.use("/api/cart", cardRouter);

// order Routes
app.use("/api/order", orderRouter);

// Local development only: Vercel imports the exported app and runs it itself
if (!process.env.VERCEL) {
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    })
}

export default app;
