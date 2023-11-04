import { getUSer } from "../service/auth.js";

const restrictToLogginUserOnly=(req,res,next)=>{
    const uid=req.cookies?.uid;
    
    if(!uid) return res.redirect("/user/login");
    
    const user=getUSer(uid);

    if(!user) return res.redirect('/user/login');

    req.user=user;
    next();
}

export {restrictToLogginUserOnly};