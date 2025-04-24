
const express=require("express");
const router=express.Router();
const {middelware}=require('../middleWare/auth')
const mainController=require("../controller/index.controllers")

router.get('/allUsers',mainController.getAllUsers);
router.put('/roleChange/:id',middelware,mainController.roleChange);

module.exports=router;
