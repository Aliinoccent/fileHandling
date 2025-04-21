const express=require("express");
const app=express.Router();
const User=require("./auth.ro")
app.use("/users",User)

module.exports = app;