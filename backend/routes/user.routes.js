const express=require("express");
const router=express.Router();
const upload=require("../config/multer.config.js");
const uploadFile=require("../controllers/upload.js");
const isLoggedIn=require("../middlewares/isLoggedIn.js");
const {fileStorage}=require("../controllers/file.js");

router.post("/upload",isLoggedIn,upload.single("uploaded-file"),uploadFile);
router.get("/files-storage",isLoggedIn,fileStorage);

module.exports=router;