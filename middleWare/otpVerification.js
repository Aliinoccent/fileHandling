const moment = require("moment");
const User=require("../models/User")

exports.OtpVerification = async (req, res, next) => {

    const date = new Date();
    const minuts = date.getMinutes()
    const data=req.user
    const userData=await User.findOne({email:data.email});
    const oldOtpTime= userData.otp.time;
    
    const diffTime = minuts - oldOtpTime;
    console.log("diff time",diffTime);
    let bool=false;
    if (minuts >= oldOtpTime && diffTime<=2){
      bool=true;

    }
    if(bool){
        req.email=userData.email;
        next();
    }
    else{
       return res.status(400).json({messege:"otp is expaire"});
    }


}