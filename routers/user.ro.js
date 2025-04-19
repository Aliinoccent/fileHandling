const express=require("express");
const router=express.Router();
const {nodemailer}=require("../middleWare/nodemailer");
const {middelware}=require('../middleWare/auth')
const {OtpVerification}=require("../middleWare/otpVerification")
const {signUp,signIn,forgetPassword,isUserValid,newPassword}=require("../controller/user.con")

router.post("/auth",signUp)
router.post("/auth/login",signIn)
router.post("/auth/forgetPassword",middelware,nodemailer,forgetPassword);
router.post("/auth/otp",middelware,OtpVerification,isUserValid);
router.post ("/auth/otp/newPassword",middelware,newPassword)


module.exports =router