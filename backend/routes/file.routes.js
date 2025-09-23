const express=require("express");
const router=express.Router();
const fileModel=require("../models/file.model.js");
const isLoggedIn=require("../middlewares/isLoggedIn.js");

router.get("/get-docs",isLoggedIn,async(req,res)=>{
    try{
        const docs=await fileModel.find({
            fileType:{
                $in:["application/pdf","text/plain","application/msword","application/vnd.openxmlformats-officedocument.wordprocessingml.document"]
            }
        });
        return res.status(200).json({
            success:true,
            message:"Docs fetched successfully",
            files:docs
        });
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"Server error",
            error:err.message
        });
    }
});

module.exports=router;