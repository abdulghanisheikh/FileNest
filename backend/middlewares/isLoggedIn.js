const jwt=require("jsonwebtoken");

async function isLoggedIn(req,res,next){
    try{
        const token=req.cookies.token;
        if(!token){
            return res.status(401).json({
                success:false,
                message:"No token, auth denied"
            });
        }
        const decode=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decode;
        return next();
    }
    catch{
        return res.status(401).json({
            success:false,
            message:"Invalid or expired token"
        });
    }
}

module.exports=isLoggedIn;