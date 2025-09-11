const express=require("express");
const app=express();
require("dotenv").config();
const connectDB=require("./config/db.config.js");
connectDB();
const cors=require("cors");
const authRouter=require("./routes/auth.routes.js");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({origin:"http://localhost:5173"}));
app.use("/auth",authRouter);
app.get("/",(req,res)=>{
    res.send("backend is running");
});

app.listen(process.env.PORT,()=>{
    console.log(`server is running at ${process.env.PORT}`);
});