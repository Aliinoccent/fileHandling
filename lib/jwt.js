const jwt =require("jsonwebtoken");
require("dotenv").config();

exports.LoginToken=(payload)=>{
    const secretKey=process.env.Secretkey;
    const token=  jwt.sign(payload,secretKey,{ expiresIn: '1d' });
  
    
    return token;
}
