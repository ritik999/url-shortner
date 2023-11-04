import express from "express";
import mongoose from "mongoose";
import { handlerAllUserData, handlerLoginUser, handlerSignupUser } from "../controllers/user.js";

const router=express.Router();

router.get('/allusers',handlerAllUserData);
router.post('/login',handlerLoginUser);
router.post('/signup',handlerSignupUser);

export {router as userRouter}; 