const jwt=require("jsonwebtoken");

function isLoggedIn(req,res,next){
    try{
        const token=req.cookies.token;
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Not Authenticated"
            });
        }
        let decoded;
        try{
            decoded=jwt.verify(token,process.env.JWT_SECRET);
        }
        catch(err){
            return res.status(401).json({
                success:false,
                message:"Invalid or expired token"
            });
        }
        req.user=decoded;
        next();
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"Server error",
            error:err.message
        });
    }
}

module.exports=isLoggedIn;