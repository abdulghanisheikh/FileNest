const jwt=require("jsonwebtoken");

async function isLoggedIn(req,res,next){
    try{
        const header=req.headers.authorization;
        if(!authHeader){
            return res.status(401).json({
                success:false,
                message:"No token, auth denied"
            });
        }
        const token=header.split(" ")[1];
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        return next();
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"Something went wrong",
            error:err.message
        });
    }
}

module.exports=isLoggedIn;