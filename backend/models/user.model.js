const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
        minLength:[3,"full name must be atleast 3 characters long"]
    },
    email:{
        type:String,
        unique:true,
        required:true,
        minLength:[13,"email must be atleast 13 characters long"]
    },
    files:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"file"
    }]
});
const userModel=mongoose.model("user",userSchema);
module.exports=userModel;