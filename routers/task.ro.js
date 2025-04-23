
const express = require ("express")
const router=express.Router();
const maincontroller=require("../controller/index.controllers")
router.post("/createTask/:id",maincontroller.createTask)
router.get("/:id",maincontroller.getTaskByUserId)
module.exports=router