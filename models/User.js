const mongodb=require("mongoose");
const UserSchema=new mongodb.Schema({
    fullName:{
      type:String,
      required:true,  
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    otp:{
        type:Object,
        require :false
    }
},{ timestamps: true })
const User=mongodb.model("User",UserSchema)
module.exports=User;