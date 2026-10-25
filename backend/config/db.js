import mongoose from "mongoose";
import dns from 'dns';
import "dotenv/config";

// Local-only workaround for networks where SRV lookups (mongodb+srv://) fail
if (!process.env.VERCEL) {
    dns.setServers(['8.8.8.8', '1.1.1.1']);
}

// On Vercel the module stays in memory between requests: keep one connection promise and reuse it
let connectionPromise = null;

export const connectDb = async () => {
    if (mongoose.connection.readyState === 1) return;

    if (!connectionPromise) {
        connectionPromise = mongoose
            .connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 10000 })
            .then(() => console.log("Data base connected"))
            .catch((error) => {
                connectionPromise = null; // allow a retry on the next request
                console.log(error.message);
                throw error;
            });
    }
    return connectionPromise;
}
