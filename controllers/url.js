import mongoose from "mongoose";
import { nanoid } from "nanoid";
import { urlModel } from "../models/url.js";

const handlerGenerateShortId = async (req, res) => {
  try {
    const { url } = req.body;
    const user=req.user;

    if (!url) res.status(400).json({ message: "url required" });

    const id = nanoid(8);
    await urlModel.create({
      shortId: id,
      redirectUrl: url,
      visitedHistory: [],
      createdBy:user.id
    });

    return res.status(200).json({ id: id });
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};

const handlerGetShortUrl = async (req, res) => {
  try {
    const { id } = req.params;

    if(!id) res.status(400).json({message:"shortId requires"});

    const url = await urlModel.findOneAndUpdate({ shortId: id },{
        $push:{
            visitedHistory:{
                timestamp:Date.now()
            }
        }
    });

    return res.status(200).json({success:url.redirectUrl})
  } catch (error) {
    return res.status(400).json({err:error.message});
  }
};

const handlerVisitHistoryAnalysis=async(req,res)=>{
    try {
        const {id}=req.params;

        if(!id) res.status(400).json({msg:'shortId required'});
        
        const data=await urlModel.findOne({shortId:id});

        res.status(200).json({visitCount:data.visitedHistory.length,visitedHistoryDetails:data.visitedHistory});
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}

const handlerLoggedUserShortUrl=async(req,res)=>{
  try {
      const user=req.user;
      console.log(user);
      const shortUrls=await urlModel.find({createdBy:user.id});
      res.status(200).json({urls:shortUrls});
  } catch (error) {
    res.status(400).json({msg:error.message});
  }
}

export { handlerGenerateShortId, handlerGetShortUrl, handlerVisitHistoryAnalysis, handlerLoggedUserShortUrl };
