require('dotenv').config();
const express = require('express');
const  mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

const app = express();

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("connected to mongoDB")
})
.catch((err)=>{
    console.log("error connected to mongoDB",err)
})

const schema = new mongoose.Schema({
    username:{type:String,required:true},
    password:{type:String,required:true}
})

const User = mongoose.model("User",schema)

app.get("/",(req,res)=>{
    res.json({message:"homepage"})
})

app.post("/register",async(req,res)=>{
    try{
    const {username,password} = req.query
    const user = new User({username , password})
    await user.save()

    res.json({message:"user created"})
    }
    catch(err){
        res.status(400).json({message:"error creating user"})
    }

})

const port=process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
