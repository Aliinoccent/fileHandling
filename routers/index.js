const express=require("express");
const app=express.Router();
const User=require("./auth.ro");//your wish that u want name
const Users=require("./user.ro");
const task=require("./task.ro")

app.use("/auth",User);
app.use("/users",Users);
app.use("/task",task);

module.exports = app;