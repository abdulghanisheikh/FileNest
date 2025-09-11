const mongoose=require("mongoose");
const connection=()=>{
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("database connected");
    })
    .catch(()=>{
        console.log("connection failed");
    });
}
module.exports=connection;