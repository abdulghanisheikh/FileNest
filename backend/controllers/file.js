const userModel=require("../models/user.model.js");
const fileModel=require("../models/file.model.js");

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

const fetchFiles=async(req,res)=>{
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
}
module.exports={fileStorage,fetchFiles};