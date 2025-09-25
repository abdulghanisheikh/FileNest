const express=require("express");
const router=express.Router();
const supabase=require("../config/supabase.config.js");
const fileModel=require("../models/file.model.js");
const isLoggedIn=require("../middlewares/isLoggedIn.js");
const {fetchFiles}=require("../controllers/file.js");

router.get("/get-docs",isLoggedIn,fetchFiles);
router.delete("/delete",isLoggedIn,async(req,res)=>{
    try{
        const {filepath}=req.body;
        if(!filepath){
            return res.status(400).json({
                success:false,
                message:"file path is required"
            });
        }
        const {data,error}=await supabase
        .storage
        .from("UserFiles")
        .remove([filepath]);
        if(error){
            return res.status(400).json({
                success:false,
                message:"Deletion failed"
            });
        }
        await fileModel.findOneAndDelete({path:filepath});
        return res.status(200).json({
            success:true,
            message:"File deleted successfully",
            data
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