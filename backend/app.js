require("dotenv").config();
const express=require("express");
const app=express();
const connectDB=require("./config/db.config.js");
connectDB();
const cors=require("cors");
const authRouter=require("./routes/auth.routes.js");
const cookieParser=require("cookie-parser");

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use("/auth",authRouter);

app.listen(process.env.PORT,()=>{
    console.log(`server is running at ${process.env.PORT}`);
});