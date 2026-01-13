const express=require("express");
const router=express.Router();
const isLoggedIn=require("../middlewares/isLoggedIn.js");
const getSummary=require("../controllers/summary.js");

router.get("/summarize",getSummary);

module.exports=router;