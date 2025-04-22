const moment = require("moment");
const User=require("../models/User")

exports.OtpVerification = async (req, res, next) => {

    const date = new Date();
    const minuts = date.getMinutes()  ;
    const {email,otp}=req.body;
    try{
      const userData=await User.findOne({email});
      if(!userData){
        res.status(400).json({message:"email dosnt exist"});
        return
      }
      const otpObject=userData.otp;
      if(!otpObject){
        res.json({message:"otp expaire"})
      }
      const oldOtpTime= userData.otp.time;
      
      console.log("old time",oldOtpTime, "currentTime",minuts)
      
      const diffTime = minuts - oldOtpTime;
      console.log("diff time",diffTime);
      let bool=false;
      let otpBool=false;
      if (minuts >= oldOtpTime && diffTime<=2){
        
        if (userData.otp.otp===otp){  // otp match 
          
          bool=true;
        }
        otpBool=true
      }
      if(bool){
          req.email=userData.email;
          req.otp=userData.otp.otp;
          next();
      }
      else if (bool==false && otpBool==true){
         return res.status(400).json({messege:"otp is invalid "});
      }
      else{
        return res.status(400).json({message:"opt exapire"});
      }
  

    }catch(error){
      console.log(error)
      res.json(error)
    }
   
}
