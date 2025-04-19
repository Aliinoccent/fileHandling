const express=require("express");
const app=express.Router();

app.use("/users",User)
module.exports = app;