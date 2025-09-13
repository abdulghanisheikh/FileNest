const userModel=require("../models/user.model.js");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const {validationResult}=require("express-validator");

const signup=(req,res)=>{
    try{
        const errors=validationResult(req);
        if(errors.isEmpty()){
            const {fullname,email,password}=req.body;
            bcrypt.hash(password,10,async(err,hash)=>{
                let newUser=await userModel.create({
                    fullname,
                    email,
                    password:hash
                });
                return res.status(201).json({
                    message:"User created",
                    user:newUser
                });
            });
        }
        else{
            return res.status(400).json({
                message:"Validation failed",
                error:errors.array()
            });
        }
    }
    catch(err){
        res.status(500).json({
            message:"Server error",
            error:err.message
        });
    }
}

const login=async(req,res)=>{
    try{
        const errors=validationResult(req);
        if(errors.isEmpty()){
            const {email,password}=req.body;
            let user=await userModel.findOne({email});
            if(!user){
                return res.status(400).json({message:"password or email is incorrect",success:false});
            }
            else{
                const result=await bcrypt.compare(password,user.password);
                if(result){
                    const token=jwt.sign(
                        {email:user.email,id:user._id},
                        process.env.JWT_SECRET,
                        {expiresIn:"24h"}
                    );
                    res.cookie("token",token);
                    return res.status(200).json({
                        message:"Login successfull",
                        success:true,
                        jwtToken:token,
                        email,
                        name:user.fullname
                    });
                }
                else{
                    return res.status(400).json({message:"password or email is incorrect",success:false});
                }
            }
        }
        return res.status(400).json({
            message:"password or email is incorrect",
            error:errors.array()
        });
    }
    catch(err){
        res.status(500).json({
            message:"Server error",
            error:err.message
        });
    }
}
module.exports={signup,login};