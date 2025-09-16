const express=require("express");
const router=express.Router;
const fileModel=require("../models/file.model.js");
const upload=require("../config/multer.config.js");

router.post("/upload",upload.single("uploaded-file"),(req,res)=>{
    
});

module.exports=router;