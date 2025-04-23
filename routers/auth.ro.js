const express=require("express");
const router=express.Router();
const {nodemailer}=require("../middleWare/nodemailer");
// const {middelware}=require('../middleWare/auth')
const {OtpVerification}=require("../middleWare/otpVerification")
const mainController=require("../controller/index.controllers")
console.log("user router")
router.post("/auth",nodemailer,mainController.signUp);
router.post("/auth/signUpOtp",OtpVerification,mainController.isUserValid)

router.post("/auth/login",mainController.signIn)
router.post("/auth/forgetPassword",nodemailer,mainController.forgetPassword);
router.post("/auth/otp",OtpVerification,mainController.isUserValid);
router.post ("/auth/otp/newPassword",mainController.newPassword)







module.exports =router