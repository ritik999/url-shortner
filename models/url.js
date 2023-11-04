import mongoose from "mongoose";

const urlSchema=new mongoose.Schema({
    shortId:{type:String,required:true},
    redirectUrl:{type:String,required:true},
    visitedHistory:[{timestamp:{type:Number}}],
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    }
},
{
    timestamps:true
})

export const urlModel=mongoose.model('url',urlSchema);