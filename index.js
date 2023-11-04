import express from "express";
import cors from "cors";
import connectMongoDB from "./connection.js";
import { urlRouter } from "./routes/url.js";
import { userRouter } from "./routes/user.js";
import cookieParser from "cookie-parser";

const app=express();

connectMongoDB().then(()=>console.log('DB connected')).catch((e)=>console.log('error occoured',e));

app.use(express.json());
app.use(cors({origin: '*',
credentials: true,}));
app.use(cookieParser());

app.use('/',urlRouter);
app.use('/user',userRouter);

app.listen(process.env.PORT,()=>console.log('app is running'));