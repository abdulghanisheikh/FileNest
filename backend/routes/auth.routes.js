const express=require("express");
const router=express.Router();
const {body,validationResult}=require("express-validator");
const userModel=require("../models/user.model.js");

router.post("/create",body("fullname").trim().isLength({min:3}),body("email").trim().isEmail().normalizeEmail().custom(async(value)=>{
    let existingUser=await userModel.findOne({email:value});
    if(existingUser){
        throw new Error("User already exists.");
    }
    return true;
}),async(req,res)=>{
    try{
        const errors=validationResult(req);
        if(errors.isEmpty()){
            const {fullname,email}=req.body;
            let newUser=await userModel.create({fullName:fullname,email});
            return res.status(201).json({
                success:true,
                message:"User created",
                user:newUser
            });
        }
        else{
            return res.status(400).json({
                message:"Enter valid input",
                errors:errors.array()
            });
        }
    }
    catch(err){
        res.status(500).json({message:"Server error",error:err.message});
    }
});

router.post("/login",(req,res)=>{
    res.send("user loggedin");
});

module.exports=router;