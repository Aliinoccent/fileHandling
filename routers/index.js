const express=require("express");
const app=express.Router();
const User=require("./auth.ro");
const Users=require("./user.ro");
const task=require("./task.ro");
const history=require("./history.ro")

app.use("/auth",User);
app.use("/users",Users);
app.use("/task",task);
app.use("/history",history);
module.exports = app;