
const User = require("../models/User")
const {LoginToken}=require("../lib/jwt")

exports.signUp = async (req, res) => {
    const { email, password, fullName } = req.body;

    const alreadyExist = await User.findOne({ email }, { fullName: 1 })

    console.log("already exist ", alreadyExist);
    if (alreadyExist) {
        res.status(400).json({ messege: "email already exist" });
        return;
    }
    const UserData = await User.insertOne({ email, password, fullName });
    res.status(200).json(UserData);
}

exports.signIn = async (req, res) => {
    const { email, password } = req.body;
    const emailAlready = await User.findOne({ email });
    if (!emailAlready) {
        res.status(400).json({ message: "email not exist" });
        return
    }
    const passwordCheck = await User.findOne({ password });
    if (!passwordCheck) {
        res.status(400).json({ message: "password is not match" });
        return
    }
    const token=LoginToken({email});
    res.status(200).json({ messege: "login successfully",token:token });
}

exports.forgetPassword=async(req,res)=>{
    const data=req.user;
    // console.log("req.user",data);
    const sentOtp= req.sentOtp
    const {email}=req.body;
    try{
       
        const userExist=await User.findOne({email});
        if(!userExist){
            res.status(400).json({message:"user dose not exist"})
            return
        }
       const otpAddInMonooge= await User.updateOne({email}, {$set:{otp:sentOtp}});
     return res.json({data:"otp send successfully",otpAddInMonooge});
    }
    catch(error){
        res.status(500).json({error})
        console.log(error)
    }
   

}
exports.isUserValid=async(req,res)=>{
 const email=req.email;
 const update=await User.updateOne({email},{$unset:{otp:""}})

  res.status(200).json({messege:"delete otp success fully",update});
}

exports.newPassword=async(req,res)=>{
    const {password}=req.body;
    const obj=req.user;
    try {
        if(!password){
            return res.status(401).json({messege:"password required"});
         }
         const update=await User.updateOne({email:obj.email},{$set:{password}});
         res.status(200).json({messege:"update password successful",update});
        
    } catch (error) {
        res.status(500).json({messege: "newPassowrd controller error : ",error})
    }
    
}