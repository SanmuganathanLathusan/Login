const mongoose=require("mongoose");
const connect=mongoose.connect("mongodb://localhost:27017/Login");

connect.then(()=>{
    console.log("Database connected successfuly")
})
.catch(()=>{
    console.log("Database cannot be connected")
    
})
// create schema
const loginSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
         type:String,
        required:true
    }
}); 
//collection parg+t
const collection=new mongoose.model("users",loginSchema);


module.exports=collection;