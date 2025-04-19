const express=require("express");
const app=express.Router();
const User=require("./user.ro")
app.use("/users",User)
module.exports = app;