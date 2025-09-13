const express=require("express");
const router=express.Router();
const {body,validationResult}=require("express-validator");
const {signup,login}=require("../controllers/auth.js");
const userModel=require("../models/user.model.js");

const signupValidation=[
    body("fullname").trim().isLength({min:3}),
    body("email").trim().isEmail().normalizeEmail().custom(async(value)=>{
        let existingUser=await userModel.findOne({email:value});
        if(existingUser){
            throw new Error("User already exists.");
        }
        return true;
    }),
    body("password").trim().isLength({min:5})
]

const loginValidation=[body("email").trim().isEmail().normalizeEmail(),body("password").trim().isLength({min:5})]

router.post("/create",signupValidation,signup);
router.post("/login",loginValidation,login);

module.exports=router;