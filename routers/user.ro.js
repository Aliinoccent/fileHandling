const express=require("express");
const router=express.Router();
const {nodemailer}=require("../middleWare/nodemailer");
const {middelware}=require('../middleWare/auth')
const {OtpVerification}=require("../middleWare/otpVerification")
const mainController=require("../controller/index.controllers")
router.post("/auth",mainController.signUp)
router.post("/auth/login",mainController.signIn)
router.post("/auth/forgetPassword",middelware,nodemailer,mainController.forgetPassword);
router.post("/auth/otp",middelware,OtpVerification,mainController.isUserValid);
router.post ("/auth/otp/newPassword",middelware,mainController.newPassword)


module.exports =router