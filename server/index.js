import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import userRouter from './routes/user.route.js'
dotenv.config();

mongoose.connect(process.env.MONGODB_URI).then(() =>{
    console.log('connected to mongodb');
})
.catch ((err)=>{
    console.log(err);
})

const app =express();

app.listen (3000,()=>{
    console.log('server is running on port 3000');
})

// Path: server/index.js
app.use("/api/user" ,userRouter)