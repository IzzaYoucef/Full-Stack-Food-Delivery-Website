import mongoose from "mongoose"; 
import dns from 'dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);
export const connectDb = async () => {
    const url = "mongodb+srv://youc77536_db_user:@cluster0.tenqkze.mongodb.net/?appName=Cluster0"
    try {
        await  mongoose.connect(url).then(()=>console.log("Data base connected")) ; 
    } catch (error) {
        console.log(error.message)
    }
}