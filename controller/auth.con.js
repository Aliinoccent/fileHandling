
const User = require("../models/User")
const { LoginToken } = require("../lib/jwt")
const { varifyPass, hashingPassword } = require("../lib/encryption")
const {authloger}=require("../config/witson");
exports.signUp = async (req, res) => {
    const { email, password, fullName } = req.body;
    
    try {
        const alreadyExist = await User.findOne({ email })
        authloger.error("already exist");
        console.log("alreadyExist", alreadyExist)


        if (alreadyExist && alreadyExist.signUpOtp === false) {
            await User.updateOne({ email: alreadyExist.email }, { $set: { otp: req.sentOtp } })
            authloger.error("email already exist ,please enter verify confirmation code")
            return res.status(400).json({ messege: "email already exist ,please enter verify confirmation code" });
        }
        if (alreadyExist && alreadyExist.signUpOtp === true) {
            const sentOtp = req.sentOtp
            console.log("sentOtp", sentOtp);
            return res.status(300).json({ message: "user already exist" })
        }
        const createHashPassword = await hashingPassword(password)
        console.log("cratedHassPassword", createHashPassword);

        const existSuperAdmin = await User.findOne({ role: 'superAdmin' });
        const role = existSuperAdmin ? 'user' : 'superAdmin'
        const UserData = await User.insertOne({ email, password: createHashPassword, fullName, signUpOtp: false, otp: req.sentOtp, role });
        authloger.info("user created succcssfully");
        return res.status(200).json(UserData);

    } catch (error) {
        authloger.error("Server error",error);
        res.status(500).json({ message: error })
    }
}

exports.signIn = async (req, res) => {

    const { email, password } = req.body;
    try {
        console.log("sginin controller")
        console.log("signin run", email, password)
        const emailAlready = await User.findOne({ email });
        if (!emailAlready) {
            authloger.error("email not exist");
            return res.status(400).json({ message: "email not exist" });
        }
        // const hashPassword=emailAlready.password;

        const verifyPassword = await varifyPass(password, emailAlready.password)
        console.log(verifyPassword);
        if (verifyPassword) {
            //user is enable or active statusc
            


            if(emailAlready.signUpOtp===false){
                authloger("user otp verify required")
                return res.status(404).json({messege:"user otp verify required"});
            }
           else if (emailAlready.active ===false) {
                authloger.warn('user disable now');
                return res.status(401).json({ messege: "user disable now" })
            }
            else {
                const token = LoginToken({ email, userId: emailAlready._id });
                await User.updateOne({email}, {$set:{token}})
                console.log(token);
                authloger.info("user signin succcssfully");
                return res.status(200).json({ messege: "login successfully", token: token });
            }

        }
        authloger.error("password is not metch");
        return res.status(400).json({ message: "password is not match" });


    } catch (error) {
        authloger.error("Server error",error);
        res.json({ error: error.message })
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
            authloger("user dose not exist line 101")
            res.status(400).json({ message: "user dose not exist" })
            return
        }
        
        const otpAddInMonooge = await User.updateOne({ email }, { $set: { signUpOtp: true, otp: sentOtp } });
        authloger(` sent otp  successfully ${sentOtp}`)
        return res.json(otpAddInMonooge);
    }
    catch (error) {
        authloger("errror in internal side of forgetPassword")
        res.status(500).json({ message: "error ha", error })
        console.log(error)
    }


}
exports.isUserValid = async (req, res) => {
    const email = req.email;// from otp varification
    const update = await User.updateOne({ email }, { $unset: { otp: "" }, $set: { signUpOtp: true } })
    authloger.error(`delte otp successfully  ${update}`)
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
exports.logout=async(req,res)=>{
    const {email,userId}=req.user;
    try {
        const user=await User.findOne({email});
        if(!user){
            authloger.error("user not found in logout()")
            res.status(401).json({message:"user not found"});
        }
        const token=LoginToken({email});
        console.log("logoutToken",token);
        await User.updateOne({_id:userId},{$set:{token}});
        authloger.info("logout succesfully")
        res.status(200).json({messege:'logout Successfully'})
    } catch (error) {
        return res.status(200).json({messege:error})
    }
}