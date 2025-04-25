const jwt=require("jsonwebtoken");
require("dotenv").config();
const User=require("../models/User")
exports.middelware=async(req,res,next)=>{
    try {
        const headers=req.headers['authorization']
        const token=headers&& headers.split(' ')[1]
        
        if(!token){
            res.status(403).json({messege:"token denied"});
        }
        const verifyUser=jwt.verify(token,process.env.Secretkey);
        console.log("verifyUser" , verifyUser);
        const user=await User.findOne({_id:verifyUser.userId});
        console.log("verify useer is ",user)
        if(user.token!==token){
            
            return res.status(400).json({messege:"token expire"})
        }
       req.user=verifyUser;
            next();

       
        
    } catch (error) {
        res.status(500).json({error})
    }
   
}
