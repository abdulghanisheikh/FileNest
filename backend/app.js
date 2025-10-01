require("dotenv").config();
const express=require("express");
const app=express();
const cookieParser=require("cookie-parser");
const connectDB=require("./config/db.config.js");
connectDB();
const cors=require("cors");
const authRouter=require("./routes/auth.routes.js");
const userRouter=require("./routes/user.routes.js");
const fileRouter=require("./routes/file.routes.js");
//Middlewares
app.use(cors({
    origin:process.env.FRONTEND,
    credentials:true
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
//Routes
app.use("/auth",authRouter);
app.use("/user",userRouter);
app.use("/file",fileRouter);

app.listen(process.env.PORT,()=>{
    console.log(`server is running at ${process.env.PORT}`);
});