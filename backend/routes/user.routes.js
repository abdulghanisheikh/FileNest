const express=require("express");
const router=express.Router();
const fileModel=require("../models/file.model.js");
const upload=require("../config/multer.config.js");
const supabase=require("../config/supabase.config.js");
const userModel=require("../models/user.model.js");

router.post("/upload",upload.single("uploaded-file"),async(req,res)=>{
    try{
        let loggedInUser;
        try{
            loggedInUser=JSON.parse(req.body.user);
        }
        catch{
            return res.status(400).json({
                success:false,
                message:"Invalid user data"
            });
        }
        const file=req.file;
        if(!file){
            return res.status(400).json({
                success:false,
                message:"No file uploaded"
            });
        }
        const path=`${loggedInUser._id}/${Date.now()}-${file.originalname}`;
        const {error:uploadError,data:uploadData}=await supabase
        .storage
        .from("UserFiles")
        .upload(path,file.buffer,{
            contentType:file.mimetype
        });
        if(uploadError){
            return res.status(400).json({
                success:false,
                message:"Something went wrong",
                error:uploadError.message
            });
        }
        const {data}=supabase
        .storage
        .from("UserFiles")
        .getPublicUrl(uploadData.path);
        const publicUrl=data.publicUrl;
        const newFile=await fileModel.create({
            originalname:file.originalname,
            path,
            publicUrl,
            fileType:file.mimetype,
            fileSize:file.size,
            owner:loggedInUser._id
        });
        let user=await userModel.findById(loggedInUser._id);
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User does not exist."
            });
        }
        else{
            user.files.push(newFile._id);
            await user.save();
        }
        return res.status(200).json({
            success:true,
            message:"File successfully uploaded",
            newFile
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