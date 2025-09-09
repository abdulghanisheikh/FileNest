const express=require("express");
const app=express();
require("dotenv").config();

app.get("/",(req,res)=>{
    res.json({
        success:true,
        message:"Hello, World"
    });
});

app.listen(process.env.PORT,()=>{
    console.log(`server is running at ${process.env.PORT}`);
});