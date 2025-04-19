

var nodemailer = require('nodemailer');
var random_number=require("random-number");
const {otpset,otpGet}=require("../lib/otpStore")

const  otp= function genrateOtp(){
  var options = {
    min:  11111
  , max:  99999
  , integer: true
  }
  var currentTime=new Date();
  console.log(currentTime.getMinutes());
 return ({  otp : random_number(options) , time:currentTime.getMinutes()})
}
exports.nodemailer=async(req,res,next)=>{
try {
     
var transporter = nodemailer.createTransport({
  service:"gmail",
  auth:{
    user:"aliinoccent786@gmail.com",
    pass:"hlwayjjuyptdzotj"
  }
});
var sentOtp=otp();
// otpset(sentOtp);
req.sentOtp=sentOtp


var mailOptions = {
  from: 'aliinoccent786@gmail.com',
  to: 'abdulrehman.cs.123@gmail.com',
  subject: "Otp recover password",
  text:`your password will be recover using from otp 5 digits code  =>  ${sentOtp}`
};

 const info= await transporter.sendMail(mailOptions)
 console.log("sent successflly");
  next();
  
  
} catch (error) {
   console.log(error);
}
 
}
