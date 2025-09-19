const express=require("express");
const router=express.Router();
const upload=require("../config/multer.config.js");
const uploadFile=require("../controllers/upload.js");
const isLoggedIn=require("../middlewares/isLoggedIn.js");
const userModel=require("../models/user.model.js");

router.post("/upload",isLoggedIn,upload.single("uploaded-file"),uploadFile);
router.get("/files-storage",isLoggedIn,async(req,res)=>{
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
});

module.exports=router;