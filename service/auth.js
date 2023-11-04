import  jwt  from "jsonwebtoken";


const setUser=(payload)=>{
    return jwt.sign(payload,process.env.SECRET_KEY);
}

const getUSer=(token)=>{
    if(!token) return null;
    try {
        return jwt.verify(token,secretKey);
    } catch (error) {
        return null;
    }
}


export { getUSer, setUser};