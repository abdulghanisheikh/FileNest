const express=require("express");
const router=express.Router();
const isLoggedIn=require("../middlewares/isLoggedIn.js");
const {fetchDocs,deleteFile,getEachStorage}=require("../controllers/file.js");

router.get("/get-docs",isLoggedIn,fetchDocs);
router.delete("/delete",isLoggedIn,deleteFile);
router.get("/eachStorage",isLoggedIn,getEachStorage);

module.exports=router;