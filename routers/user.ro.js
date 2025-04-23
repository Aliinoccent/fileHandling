
const express=require("express");
const router=express.Router();
const mainController=require("../controller/index.controllers")

router.get('/allUsers',mainController.getAllUsers);

module.exports=router;
