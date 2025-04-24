
const User = require("../models/User")
const { LoginToken } = require("../lib/jwt")
const { varifyPass, hashingPassword } = require("../lib/encryption")
exports.signUp = async (req, res) => {
    const { email, password, fullName } = req.body;
    try {
        const alreadyExist = await User.findOne({ email })
        console.log("alreadyExist", alreadyExist)


        if (alreadyExist && alreadyExist.signUpOtp === false) {
            await User.updateOne({email:alreadyExist.email},{$set:{otp: req.sentOtp}})
            return res.status(400).json({ messege: "email already exist ,please enter verify confirmation code" });

            
        }
        if (alreadyExist && alreadyExist.signUpOtp === true) {
            const sentOtp = req.sentOtp
            console.log("sentOtp", sentOtp);
            return res.status(300).json({ message: "user already exist" })

        }
        

        const createHashPassword = await hashingPassword(password)
        console.log("cratedHassPassword", createHashPassword);

        const existSuperAdmin=await User.findOne({role:'superAdmin'});
        const role = existSuperAdmin ?'user':'superAdmin'
        const UserData = await User.insertOne({ email, password: createHashPassword, fullName, signUpOtp: false, otp: req.sentOtp,role });
      return  res.status(200).json(UserData);

    } catch (error) {
        res.status(500).json({ message: error })
    }
}

exports.signIn = async (req, res) => {

    const { email, password } = req.body;
    try {
        console.log("sginin controller")
        console.log("signin run",email,password)
        const emailAlready = await User.findOne({ email });
        console.log(emailAlready);
        if (!emailAlready) {
            res.status(400).json({ message: "email not exist" });
            return
        }
        const hashPassword=emailAlready.password;
        const verifyPassword = await varifyPass(password, hashPassword)
        console.log(verifyPassword);
        if (verifyPassword) {
            const token = LoginToken({ email, userId: emailAlready._id });
            console.log(token);
           return res.status(200).json({ messege: "login successfully", token: token });
        }
    
          return  res.status(400).json({ message: "password is not match" });
           
    
    } catch (error) {
        res.json({error: error.message })
    }
}

exports.forgetPassword = async (req, res) => {
    // const data = req.user;
    // console.log("req.user",data);
    const sentOtp = req.sentOtp
    const { email } = req.body;

    try {
        const userExist = await User.findOne({ email });
        if (!userExist) {
            res.status(400).json({ message: "user dose not exist" })
            return
        }
        console.log(sentOtp, "this is sent  Otp")
        const otpAddInMonooge = await User.updateOne({ email }, { $set: { signUpOtp: true, otp: sentOtp } });
        return res.json(otpAddInMonooge);
    }
    catch (error) {
        res.status(500).json({ message: "error ha", error })
        console.log(error)
    }


}
exports.isUserValid = async (req, res) => {
    const email = req.email;// from otp varification
    const update = await User.updateOne({ email }, { $unset: { otp: "" } , $set: { signUpOtp: true } })

    res.status(200).json({ messege: "delete otp success fully", update });
}

exports.newPassword = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!password) {
            return res.status(401).json({ messege: "password required" });
        }
        if (!email) {

            return res.status(401).json({ messege: "email required" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ messege: "email is not exist" });
        }
        console.log(user);
        const hashpasword = await hashingPassword(password);
        console.log(hashpasword)
        const update = await User.updateOne({ email }, { $set: { password: hashpasword } });
        res.status(200).json({ messege: "update password successful", update });

    } catch (error) {
        res.status(500).json({ messege: "newPassowrd controller error : ", error })
    }

}