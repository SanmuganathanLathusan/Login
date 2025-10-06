const express =require ('express');
/*const mongoose=require '(mongoose');*/
const bcrypt =require ('bcrypt');
const path = require ('path');
const collection=require("./config");
const { name } = require('ejs');


const app =express();

//convert data into json format
app.use(express.json());
app.use(express.urlencoded({extended:false}));
 
// use EJS as the viw engine
app.set("view engine","ejs");
// static file
app.use(express.static ('public'));

app.get('/',(req,res)=>{
    res.render("login")
});
app.get('/signup',(req,res)=>{
    res.render("signup")
});
app.post("/signup", async (req, res) => {
  const data = {
    name: req.body.username,
    password: req.body.password
  };

  // check if the user already exists in the database
  const existingUser = await collection.findOne({ name: data.name });
  if (existingUser) {
    return res.send("User already exists. Please choose a different username.");
  
 } 
 else{
    //hash the password using bcrypt
    const saltrounds =10;//number of salt rounds for bcrypt
    const hashedPassword=await bcrypt.hash(data.password,saltrounds);
    data.password=hashedPassword;//replace the hash password with original password 
    const userdata =await collection.insertMany(data);
    console.log(userdata);
 }

 }) ;

app.post("/login",async(req,res)=>{
    try{
        const check =await collection.findOne({name:req.body.username});
   if(!check){
    res.send ("user name cannot found");
   }

   const isPasswordmatch=await bcrypt.compare(req.body.password,check.password);
   if(isPasswordmatch){
    res.render("home");
   }else{
    register.send("wrong password")
   }
}catch{
    res.send("wrong details");

}
});



const port=5000;
app.listen(port, ()=>{
console.log(`server is runnig on port:${port}`);
});