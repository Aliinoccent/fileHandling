const express=require('express');
const app=express.Router();
const {middelware}=require("../middleWare/auth")

const mainController=require("../controller/index.controllers")
app.get("/",middelware,mainController.getAllHistory)
app.get("/:id",middelware,mainController.getHistoryById)
module.exports=app;