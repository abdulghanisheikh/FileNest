const userModel=require("../models/user.model.js");
const fileModel=require("../models/file.model.js");
const supabase=require("../config/supabase.config.js");

const fileStorage=async(req,res)=>{
    try{
        let user=await userModel.findById(req.user.id).populate("files");
        if(!user){
            return res.status(400).json({
                success:false,
                message:"Invalid user"
            });
        }
        const totalSize=user.files.reduce((acc,item)=>{
            return acc+=item.fileSize;
        },0);
        res.status(200).json({
            success:true,
            totalSize
        });
    }
    catch{
        return res.status(500).json({
            success:false,
            message:"Server error"
        });
    }
}

const fetchDocs=async(req,res)=>{
    const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/plain",
        "application/json"
    ];
    try{
        let user=await userModel.findById(req.user.id).populate({
            path:"files",
            match:{
                fileType:{$in:allowedTypes}
            }
        });
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User invalid"
            });
        }
        const docs=user.files;
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
}

const deleteFile=async(req,res)=>{
    try{
        const {filepath}=req.body;
        if(!filepath||typeof filepath!=="string"){
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
                message:"Deletion failed",
                error:error.message
            });
        }
        const deletedFile=await fileModel.findOneAndDelete({path:filepath});
        if(!deletedFile){
            return res.status(400).json({
                success:false,
                message:"File not found in DB"
            });
        }
        let user=await userModel.findById(req.user.id); //it expects user files array of ObjectIds
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User not exists"
            });
        }
        user.files=user.files.filter((file)=>{ //user.files -> array of objectIds
            return file._id.toString()!==deletedFile._id.toString();
        });
        await user.save();
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
}

const getEachStorage=async(req,res)=>{
    try{
        let user=await userModel.findById(req.user.id).populate("files");
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User not found"
            });
        }
        let docStorage=0;
        let imageStorage=0;
        let mediaStorage=0;
        let otherStorage=0;
        user.files.forEach((file)=>{
            if(file.fileType==="application/msword"||file.fileType==="application/pdf"||file.fileType==="application/vnd.openxmlformats-officedocument.wordprocessingml.document"||file.fileType==="text/plain"){
                docStorage+=file.fileSize;
            }
            else if(file.fileType==="image/png"||file.fileType==="image/jpeg"||file.fileType==="image/gif"||file.fileType==="image/svg+xml"||fileType==="image/webp"){
                imageStorage+=file.fileSize;
            }
            else if(file.fileType==="audio/mpeg"||file.fileType==="video/mp4"){
                mediaStorage+=file.fileSize;
            }
            else{
                otherStorage+=file.fileSize;
            }
        });
        return res.status(200).json({
            success:true,
            message:"Storage fetched successfully",
            docStorage,
            imageStorage,
            mediaStorage,
            otherStorage
        });
    }
    catch(err){
        return res.status(500).json({
            success:true,
            message:"Server error",
            error:err.message
        });
    }
}

module.exports={fileStorage,fetchDocs,deleteFile,getEachStorage};