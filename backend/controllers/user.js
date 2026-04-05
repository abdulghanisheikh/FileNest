const userModel=require("../models/user.model.js");
const fileModel=require("../models/file.model.js");
const supabase=require("../config/supabase.config.js");
const { imagekit } = require("../config/imagekit.config.js");

const deleteFolder = async(folderName) => {
    try{
        const limit=1000;
        const offset=0;
        const {data:files,error}=await supabase
        .storage
        .from("UserFiles")
        .list(folderName,{limit,offset});
        if(error){
            return{
                success:false,
                message:"operation failed",
                error:error.message
            }
        }
        if(!files||files.length===0){
            return{
                success:true,
                message:"No files, nothing to delete."
            }
        }
        const filePaths=files.map(file=>`${folderName}/${file.name}`);
        const {error:deleteError}=await supabase
        .storage
        .from("UserFiles")
        .remove(filePaths);
        if(deleteError){
            return{
                success:false,
                message:"operation failed",
                error:deleteError.message
            }
        }
        return{
            success:true,
            message:"User account is deleted successfully"
        }
    }
    catch(err){
        return{
            success:false,
            message:"Server error",
            error:err.message
        }
    }
}

const deleteAccount = async(req, res) => {
    try{
        let userId=req.user.id;
        let deletedUser=await userModel.findByIdAndDelete(userId);
        if(!deletedUser){
            return res.status(400).json({
                success:false,
                message:"Deletion failed"
            });
        }
        await fileModel.deleteMany({owner:deletedUser._id});
        let result=await deleteFolder(deletedUser._id);
        if(result.success){
            result=await deleteFolder(`profile-pictures/${deletedUser._id}`);
            if(result.success){
                return res.status(200).json(result);
            }
            else{
                return res.status(400).json(result);
            }
        }
        else{
            return res.status(400).json(result);
        }
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"Server error",
            error:err.message
        });
    }
}

const getUserProfile = async(req, res) => {
    try {
        const user = await userModel.findOne({_id: req.user.id});

        res.status(200).json({
            success: true,
            message: "User profile fetched",
            profileUrl: user.profilePicture
        });
    } catch(err) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err.message
        });
    }
}

const removeUserProfile = async(req, res) => {
   try {
        const user = await userModel.findById(req.user.id);

        if(!user.profilePicture && !user.profileId) {
            return res.status(404).json({
                success: false,
                message: "Profile does not exist"
            });
        }

        await imagekit.files.delete(user.profileId);

        user.profilePicture = "";
        user.profileId = "";
        await user.save();

        res.status(200).json({
            success: true,
            message: "User profile removed"
        });
   } catch(err) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err.message
        });
   }
}

module.exports= { deleteAccount, removeUserProfile, getUserProfile };