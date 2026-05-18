import jwt from "jsonwebtoken";

const  authMiddleware = async (req,res,next)=>{
        
    const {token} = req.headers;
    if(!token){
        return res.status(401).json({success:false, message:"connexion non autorisée ressayez  à nouveau"})
    }
    try{
        const tokenDecode = jwt.verify(token,process.env.JWT_SECRET);
        req.userId = tokenDecode.id;
        next();

    }
    catch(error){
        return res.status(401).json({success:false, message: "Token invalide" ,error:error.message})

    }
}
export default authMiddleware;
