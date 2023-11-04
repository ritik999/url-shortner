import mongoose from "mongoose";
import { userModel } from "../models/user.js";
import { setUser } from "../service/auth.js";

const handlerLoginUser=async(req,res)=>{
    try {
        const {email,password}=req.body;

        if(!email || !password) res.status(400).json({msg:'email or password require'});

        const user=await userModel.findOne({email:email,password:password});

        console.log(user);
    
        if(!user) res.status(400).json({msg:'email or password is invalid'});

        const token=setUser({id:user['_id'],email:user['email']});

        console.log('fun run');
        console.log(token);
        res.cookie("uid",token,{httpOnly:true});
        console.log('cookie seted');

        return res.status(200).json({msg:'successfully logged in'})
    } catch (error) {
        res.status(400).json({message:error.message});
    } 
}

const handlerSignupUser=async(req,res)=>{
    try {
        const {email,password}=req.body;
        console.log('hi')

        if(!email || !password) res.status(400).json({msg:'email or password require'});

        await userModel.create({
            email:email,
            password:password
        })
        return res.status(200).json({msg:'user created'})
    } catch (error) {
        res.status(400).json({msg:error.message});
    }
}


const handlerAllUserData=async(req,res)=>{
    try {
        console.log('hi');
        const users=await userModel.findById('6545049c1bbc9f6983845a46');
        return res.status(200).json({users:users});
    } catch (error) {
        console.log('err');
        return res.status(404).json({msg:error.message});
    }
}


export {handlerLoginUser, handlerSignupUser, handlerAllUserData};