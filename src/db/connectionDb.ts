import mongoose from "mongoose";

const connectionString = `mongodb://admin:admin123@localhost:27018/ICESI?authSource=admin`;

mongoose.connect(connectionString)
.then(()=>{
    console.log("Connected to mongoDB")
}).catch((error)=>{
    console.log("Database connection error:", error)
})
