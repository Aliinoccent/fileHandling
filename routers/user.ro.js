
const express=require("express");
const router=express.Router();
const {middelware}=require('../middleWare/auth')
const mainController=require("../controller/index.controllers")
const {HistoryTrack}=require("../middleWare/historyTracking")

router.get('/allUsers',middelware,HistoryTrack,mainController.getAllUsers);
router.put('/roleChange/:id',middelware,HistoryTrack,mainController.roleChange);
router.put("/active/:id",middelware,HistoryTrack,mainController.activeUserBehaviour)

module.exports=router;
