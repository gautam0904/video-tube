import dotenv from "dotenv";
import express from "express";
import connectDB from "./db/index.js"

dotenv.config({path :'./env'})
const app = express();

connectDB()
.then(()=>{
    app.on('error',(err)=>{
        console.log(err);
    });
    app.listen(process.env.PORT ,()=>{
        console.log(`Server is running on port ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log(`mongoDB is failed!!`);
})










