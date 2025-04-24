
const express = require ("express");
const {middelware}=require("../middleWare/auth");
const router=express.Router();
const maincontroller=require("../controller/index.controllers")
router.post("/createTask/:id",maincontroller.createTask)
router.get("/userId/:id",maincontroller.getTaskByUserId);
router.put("/updateStatus/:taskid",middelware,maincontroller.updatetaskStatus)
module.exports=router