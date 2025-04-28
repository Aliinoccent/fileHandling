const express=require("express");
const router=express.Router();
const {nodemailer}=require("../middleWare/nodemailer");
const {middelware}=require('../middleWare/auth')
const {OtpVerification}=require("../middleWare/otpVerification")
const mainController=require("../controller/index.controllers")
const {HistoryTrack}=require("../middleWare/historyTracking")
const userValidation =require("../middleWare/joiValidation")
console.log("user router")
router.post("/",userValidation,nodemailer,mainController.signUp);
router.post ("/admin",nodemailer,middelware,mainController.adminSginUpUser)
router.post("/signUpOtp",OtpVerification,mainController.isUserValid)


router.post("/login",mainController.signIn)
router.post("/forgetPassword",nodemailer,mainController.forgetPassword);
router.post("/otp",OtpVerification,mainController.isUserValid);
router.post ("/otp/newPassword",mainController.newPassword)
router.get('/logout',middelware,HistoryTrack,mainController.logout)







module.exports =router