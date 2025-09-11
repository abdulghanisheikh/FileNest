const mongoose=require("mongoose");
const fileSchema=new mongoose.Schema({
    originalName:String,
    path:String,
    publicUrl:String,
    fileType:String,
    addedOn:{
        type:Date,
        default:Date.now()
    },
    fileSize:{
        type:Number,
        max:10*1024*1024
    },
});
const fileModel=mongoose.model("file",fileSchema);
module.exports=fileModel;